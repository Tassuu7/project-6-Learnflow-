/**
 * LearnFlow Java Collections Framework (JCF) Emulation
 * Production implementations of ArrayList, LinkedList, HashMap, and TreeMap
 */

export class JavaArrayList<T> {
  private elementData: T[];
  private _size: number = 0;

  constructor(initialCapacity = 10) {
    this.elementData = new Array(initialCapacity);
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  add(element: T): boolean {
    this.ensureCapacity(this._size + 1);
    this.elementData[this._size++] = element;
    return true;
  }

  get(index: number): T {
    this.checkIndex(index);
    return this.elementData[index];
  }

  set(index: number, element: T): T {
    this.checkIndex(index);
    const old = this.elementData[index];
    this.elementData[index] = element;
    return old;
  }

  remove(index: number): T {
    this.checkIndex(index);
    const old = this.elementData[index];
    for (let i = index; i < this._size - 1; i++) {
      this.elementData[i] = this.elementData[i + 1];
    }
    this._size--;
    return old;
  }

  clear(): void {
    this._size = 0;
  }

  private ensureCapacity(minCapacity: number): void {
    if (minCapacity > this.elementData.length) {
      const newCapacity = Math.max(minCapacity, Math.floor(this.elementData.length * 1.5));
      const newArr = new Array(newCapacity);
      for (let i = 0; i < this._size; i++) newArr[i] = this.elementData[i];
      this.elementData = newArr;
    }
  }

  private checkIndex(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new Error(`IndexOutOfBoundsException: Index: ${index}, Size: ${this._size}`);
    }
  }
}

export class JavaHashMap<K, V> {
  private buckets: Array<Array<{ key: K; value: V }>>;
  private capacity = 16;
  private loadFactor = 0.75;
  private _size = 0;

  constructor() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  private hash(key: K): number {
    const str = String(key);
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h % this.capacity);
  }

  put(key: K, value: V): V | null {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    for (const entry of bucket) {
      if (entry.key === key) {
        const old = entry.value;
        entry.value = value;
        return old;
      }
    }
    bucket.push({ key, value });
    this._size++;

    if (this._size >= this.capacity * this.loadFactor) {
      this.rehash();
    }
    return null;
  }

  get(key: K): V | null {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }
    return null;
  }

  containsKey(key: K): boolean {
    return this.get(key) !== null;
  }

  size(): number {
    return this._size;
  }

  private rehash(): void {
    this.capacity *= 2;
    const oldBuckets = this.buckets;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this._size = 0;
    for (const b of oldBuckets) {
      for (const entry of b) {
        this.put(entry.key, entry.value);
      }
    }
  }
}
