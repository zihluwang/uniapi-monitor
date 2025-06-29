import { UniApiBalanceResponse } from "../types/uniapi-balance-response"

export async function getBalance(env: Env): Promise<number> {
  const response = await fetch("https://api.uniapi.io/v1/billing/usage?unit=usd", {
    headers: {
      Authorization: `Bearer ${env.UNIAPI_TOKEN}`,
    },
  })

  if (!response.ok) {
    console.error(`Request failed, response status: ${response.status}`)
    throw Error(`Request failed, response status: ${response.status}`)
  }

  const result = await response.json<UniApiBalanceResponse>()
  const balance = result?.data?.balance

  if (balance === undefined) {
    console.error("No field balance.")
    throw Error("No field balance.")
  }

  return balance
}
