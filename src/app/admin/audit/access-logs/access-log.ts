import { Log } from '@common/interfaces/types';

export type AccessLog = Log<AccessLogMetaData, AccessLogData>;

export interface AccessLogMetaData {
  method: string;
  host: string;
  path: string;
  ip: string;
  user_id: string;
}

export interface AccessLogData {
  user_agent: string;
  header: string;
  query: string;
  body: string;
  cost: number;
  status: number;
}
