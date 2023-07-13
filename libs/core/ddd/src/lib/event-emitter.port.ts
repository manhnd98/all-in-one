export interface EventEmitterPort {
  emit<T>(event: T): void;

  emitAsync<T>(event: T): Promise<void>;
}
