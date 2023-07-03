
export interface HTTPOption {
  body?: string,
  method: string,
}

export interface HTTPResponse {
  code: number,
  data?: object,
  status: string,
  message: string
}