export interface StorageAdapter {
  load<T = unknown>(key: string): Promise<T | null>;
  save(key: string, value: string): void;
  remove(key: string): void;
}