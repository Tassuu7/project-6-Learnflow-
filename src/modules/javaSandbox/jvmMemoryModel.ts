/**
 * LearnFlow JVM Architecture & Garbage Collection Simulator
 * Simulates JVM memory regions, Young/Old generation GC, and Stack Frames
 */

export interface StackFrame {
  methodName: string;
  className: string;
  localVariables: Map<number, any>;
  operandStack: any[];
  returnAddress: number;
}

export interface HeapObject {
  id: string;
  className: string;
  fields: Map<string, any>;
  sizeBytes: number;
  generation: 'EDEN' | 'SURVIVOR_0' | 'SURVIVOR_1' | 'TENURED';
  age: number;
  isMarked: boolean;
}

export class JVMHeapManager {
  private edenSpace = new Map<string, HeapObject>();
  private survivor0 = new Map<string, HeapObject>();
  private survivor1 = new Map<string, HeapObject>();
  private tenuredSpace = new Map<string, HeapObject>();
  
  private totalAllocatedBytes = 0;
  private maxHeapBytes = 512 * 1024 * 1024; // 512 MB
  private tenuringThreshold = 15;

  allocate(className: string, fields: Record<string, any>, sizeBytes = 64): HeapObject {
    if (this.totalAllocatedBytes + sizeBytes > this.maxHeapBytes) {
      this.performFullGC();
      if (this.totalAllocatedBytes + sizeBytes > this.maxHeapBytes) {
        throw new Error('OutOfMemoryError: Java heap space');
      }
    }

    const obj: HeapObject = {
      id: `obj_${Math.random().toString(36).substring(2, 9)}`,
      className,
      fields: new Map(Object.entries(fields)),
      sizeBytes,
      generation: 'EDEN',
      age: 0,
      isMarked: false,
    };

    this.edenSpace.set(obj.id, obj);
    this.totalAllocatedBytes += sizeBytes;
    return obj;
  }

  performMinorGC(rootReferences: Set<string>): void {
    // 1. Mark phase in Eden and active Survivor space
    for (const [id, obj] of this.edenSpace.entries()) {
      if (rootReferences.has(id)) {
        obj.isMarked = true;
      }
    }

    // 2. Evacuate marked objects to next survivor space or tenured
    for (const [id, obj] of this.edenSpace.entries()) {
      if (obj.isMarked) {
        obj.age++;
        obj.isMarked = false;
        if (obj.age >= this.tenuringThreshold) {
          obj.generation = 'TENURED';
          this.tenuredSpace.set(id, obj);
        } else {
          obj.generation = 'SURVIVOR_0';
          this.survivor0.set(id, obj);
        }
      } else {
        this.totalAllocatedBytes -= obj.sizeBytes;
      }
    }
    this.edenSpace.clear();
  }

  performFullGC(): void {
    // Major Mark-Sweep-Compact across all generations
    for (const space of [this.edenSpace, this.survivor0, this.survivor1, this.tenuredSpace]) {
      for (const [id, obj] of space.entries()) {
        if (!obj.isMarked) {
          this.totalAllocatedBytes -= obj.sizeBytes;
          space.delete(id);
        } else {
          obj.isMarked = false;
        }
      }
    }
  }

  getMemoryMetrics() {
    return {
      edenObjects: this.edenSpace.size,
      survivorObjects: this.survivor0.size + this.survivor1.size,
      tenuredObjects: this.tenuredSpace.size,
      totalHeapUsedMb: (this.totalAllocatedBytes / (1024 * 1024)).toFixed(2),
      maxHeapMb: (this.maxHeapBytes / (1024 * 1024)).toFixed(2),
    };
  }
}
