/**
 * LearnFlow B+ Tree Indexing Engine
 * High-performance disk-simulated B+ Tree indexing supporting point queries and range scans
 */

export interface BTreeNode<K, V> {
  isLeaf: boolean;
  keys: K[];
  values?: V[];
  children?: BTreeNode<K, V>[];
  next?: BTreeNode<K, V>;
}

export class BPlusTree<K, V> {
  private root: BTreeNode<K, V>;
  private t: number; // Minimum degree

  constructor(degree = 3) {
    this.t = degree;
    this.root = {
      isLeaf: true,
      keys: [],
      values: [],
    };
  }

  search(key: K): V | null {
    let curr = this.root;
    while (!curr.isLeaf) {
      let i = 0;
      while (i < curr.keys.length && key >= curr.keys[i]) i++;
      curr = curr.children![i];
    }
    for (let i = 0; i < curr.keys.length; i++) {
      if (curr.keys[i] === key) return curr.values![i];
    }
    return null;
  }

  rangeScan(startKey: K, endKey: K): V[] {
    const results: V[] = [];
    let curr = this.root;
    while (!curr.isLeaf) {
      let i = 0;
      while (i < curr.keys.length && startKey >= curr.keys[i]) i++;
      curr = curr.children![i];
    }

    let node: BTreeNode<K, V> | undefined = curr;
    while (node) {
      for (let i = 0; i < node.keys.length; i++) {
        if (node.keys[i] >= startKey && node.keys[i] <= endKey) {
          results.push(node.values![i]);
        }
        if (node.keys[i] > endKey) return results;
      }
      node = node.next;
    }
    return results;
  }

  insert(key: K, value: V): void {
    const r = this.root;
    if (r.keys.length === 2 * this.t - 1) {
      const s: BTreeNode<K, V> = {
        isLeaf: false,
        keys: [],
        children: [r],
      };
      this.root = s;
      this.splitChild(s, 0, r);
      this.insertNonFull(s, key, value);
    } else {
      this.insertNonFull(r, key, value);
    }
  }

  private splitChild(parent: BTreeNode<K, V>, index: number, child: BTreeNode<K, V>): void {
    const z: BTreeNode<K, V> = {
      isLeaf: child.isLeaf,
      keys: child.keys.splice(this.t),
      values: child.isLeaf ? child.values!.splice(this.t) : undefined,
      children: !child.isLeaf ? child.children!.splice(this.t) : undefined,
    };

    if (child.isLeaf) {
      z.next = child.next;
      child.next = z;
    }

    const midKey = child.keys.pop()!;
    parent.keys.splice(index, 0, midKey);
    parent.children!.splice(index + 1, 0, z);
  }

  private insertNonFull(node: BTreeNode<K, V>, key: K, value: V): void {
    let i = node.keys.length - 1;
    if (node.isLeaf) {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
      node.values!.splice(i + 1, 0, value);
    } else {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children![i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i, node.children![i]);
        if (key > node.keys[i]) {
          i++;
        }
      }
      this.insertNonFull(node.children![i], key, value);
    }
  }
}
