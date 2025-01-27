import type { IRequestStrict } from 'itty-router';

export interface Env {
  RELEASE: string;
  EVER_ACCESS_KEY: string;
  EVER_ACCESS_SECRET: string;
  LENS_IPFS_AUTH_KEY: string;
}

export type WorkerRequest = {
  req: Request;
  env: Env;
  ctx: ExecutionContext;
} & IRequestStrict;
