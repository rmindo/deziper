import {
  Server as HTTPServer,
  Context,
  HttpRequest,
  HttpResponse,
}
from '@vindo/core'


export * from '@app/types/user'


export type Server = HTTPServer

/**
 * Dynamic key defination for active users
 */
export type ActiveUsers = {
  [key:string]: {
    socket: WebSocket,
    active: boolean
  }
}

/**
 * Parsed authentication
 */
export type ParsedAuth = {
  type: string;
  uid?: String | undefined;
  username?: string | undefined;
  password?: string | undefined;
  token?: string;
  signature?: string;
  payload?: any
}

/**
 * Request Interface
 */
export interface Request extends HttpRequest {
  method: any,
  authenticated: any
}

/**
 * Response Interface
 */
export interface Response extends HttpResponse {
  render(data: any): void;
  result(data: object, code?: number): void;
}

/**
 * Interface of Database
 */
export interface DatabaseInterface {
  col(name:string): any;
  read(name:string, query:object, options?:any, bulk?:boolean): Promise<any>;
  create(name:string, data:any): Promise<any>;
  delete(name:string, query:any, bulk?:boolean): Promise<any>;
  update(name:string, query:object, data:object, options?:object): Promise<any>;
  count(name:string, query?:object, options?:object): Promise<number> | undefined;
  aggregate(name:string, query:object, options?:any): Promise<any>;
}

/**
 * Extended context interface
 */
export interface ExtendedContext extends Context {
  [key:string]: any;
  crud: {
    [key: string]: any;
  };
  auth: {
    str(data:any): string;
    hash(data:string): string;
    encode(data:string | null): string;
    decode(data:string | null): string;
    parse(data:string | undefined): ParsedAuth;
    sign(key:string, payload:any): string;
    random(length?:number, char?:boolean): string;
    verify(key:string | undefined, payload:any, signature:string | undefined): boolean;
    expiration(exp: {days: number, timezone: string}): number;
    createtoken(payload:{[key: string]: string | object}, key:string): string;
  };
  db: DatabaseInterface;
}