interface ResponseData {
  balance: number
  used: number
  cache_used: number
}

export interface UniApiBalanceResponse {
  data: ResponseData
  success: boolean
}
