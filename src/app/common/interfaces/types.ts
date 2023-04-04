export interface Log<M, T> {
  metadata: M;
  data: T;
  timestamp: Date;
}
