import { SyncEvent, SyncEventType } from '../types';

const SYNC_QUEUE_KEY = 'learnflow_offline_sync_queue';
const PROCESSED_LEDGER_KEY = 'learnflow_processed_event_ledger';

/**
 * Retrieves all locally queued offline events
 */
export function getOfflineQueue(): SyncEvent[] {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read offline sync queue', err);
    return [];
  }
}

/**
 * Saves the offline queue
 */
export function saveOfflineQueue(queue: SyncEvent[]): void {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('Failed to write offline sync queue', err);
  }
}

/**
 * Enqueues a new offline event
 */
export function enqueueOfflineEvent(
  userId: string,
  eventType: SyncEventType,
  entityId: string,
  payload: any
): SyncEvent {
  const queue = getOfflineQueue();

  const newEvent: SyncEvent = {
    eventId: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userId,
    eventType,
    entityId,
    timestamp: new Date().toISOString(),
    payload,
    clientVersion: '2.4.0-offline',
    syncStatus: 'PENDING',
    retryCount: 0,
  };

  queue.push(newEvent);
  saveOfflineQueue(queue);
  return newEvent;
}

/**
 * Clears synced events or resets queue
 */
export function clearSyncedEvents(): void {
  const queue = getOfflineQueue();
  const pendingOnly = queue.filter((e) => e.syncStatus === 'PENDING' || e.syncStatus === 'FAILED');
  saveOfflineQueue(pendingOnly);
}

/**
 * Retrieves the list of processed event IDs from ledger
 */
export function getProcessedLedger(): string[] {
  try {
    const raw = localStorage.getItem(PROCESSED_LEDGER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Checks if an eventId was already reconciled by the server ledger
 * (Idempotency guarantee)
 */
export function isEventProcessed(eventId: string): boolean {
  try {
    const raw = localStorage.getItem(PROCESSED_LEDGER_KEY);
    const ledger: string[] = raw ? JSON.parse(raw) : [];
    return ledger.includes(eventId);
  } catch {
    return false;
  }
}

/**
 * Marks an eventId as recorded in server ledger
 */
export function markEventAsProcessed(eventId: string): void {
  try {
    const raw = localStorage.getItem(PROCESSED_LEDGER_KEY);
    const ledger: string[] = raw ? JSON.parse(raw) : [];
    if (!ledger.includes(eventId)) {
      ledger.push(eventId);
      localStorage.setItem(PROCESSED_LEDGER_KEY, JSON.stringify(ledger.slice(-500))); // Cap ledger size
    }
  } catch (err) {
    console.error('Failed to append event to ledger', err);
  }
}

export interface SyncBatchResult {
  totalProcessed: number;
  successCount: number;
  conflictResolvedCount: number;
  failedCount: number;
  syncedEvents: SyncEvent[];
  errors: string[];
}

/**
 * Processes and synchronizes pending events with the local or server state.
 * Applies conflict resolution rules:
 * 1. Deduplication check via server ledger
 * 2. Monotonic progress union (CRDT G-Set principle)
 * 3. Latest valid timestamp wins for text/notes
 */
export function processSyncQueue(
  applyEventToServerState: (event: SyncEvent) => { success: boolean; conflictResolved?: boolean; error?: string }
): SyncBatchResult {
  const queue = getOfflineQueue();
  const result: SyncBatchResult = {
    totalProcessed: 0,
    successCount: 0,
    conflictResolvedCount: 0,
    failedCount: 0,
    syncedEvents: [],
    errors: [],
  };

  const updatedQueue = queue.map((event) => {
    if (event.syncStatus === 'SYNCED') {
      return event;
    }

    result.totalProcessed += 1;

    // 1. Idempotency verification
    if (isEventProcessed(event.eventId)) {
      event.syncStatus = 'SYNCED';
      result.successCount += 1;
      result.syncedEvents.push(event);
      return event;
    }

    // 2. Execute reconciliation callback
    try {
      const outcome = applyEventToServerState(event);
      if (outcome.success) {
        event.syncStatus = outcome.conflictResolved ? 'CONFLICT_RESOLVED' : 'SYNCED';
        if (outcome.conflictResolved) {
          result.conflictResolvedCount += 1;
        } else {
          result.successCount += 1;
        }
        markEventAsProcessed(event.eventId);
        result.syncedEvents.push(event);
      } else {
        event.retryCount += 1;
        event.syncStatus = 'FAILED';
        event.errorMessage = outcome.error || 'Server validation failed';
        result.failedCount += 1;
        result.errors.push(`Event ${event.eventId} failed: ${event.errorMessage}`);
      }
    } catch (err: any) {
      event.retryCount += 1;
      event.syncStatus = 'FAILED';
      event.errorMessage = err?.message || 'Network exception during sync';
      result.failedCount += 1;
      result.errors.push(`Event ${event.eventId} exception: ${event.errorMessage}`);
    }

    return event;
  });

  saveOfflineQueue(updatedQueue);
  return result;
}
