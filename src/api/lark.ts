import { generateSignature } from "../utils/signature-util"

export async function sendMessage(balance: number, env: Env) {
  const larkBotId = env.LARK_BOT_ID
  const larkSignKey = env.LARK_SIGN_KEY

  if (!larkBotId) {
    throw new Error("LARK_BOT_ID not set.")
  }

  const url = `https://open.larksuite.com/open-apis/bot/v2/hook/${larkBotId}`

  const timestamp = Math.floor(Date.now() / 1000)
  console.log(`timestamp = ${timestamp}`)
  const signature = await generateSignature(timestamp, larkSignKey)

  const data = {
    msg_type: "text",
    content: {
      text: `Your UniAPI balance: US$ ${balance}`,
    },
    timestamp: timestamp,
    sign: signature,
  }

  console.log(data)

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed: ${response.status} ${response.statusText}, ${text}`);
  }

  const result = await response.json();
  console.log("Lark message send response:", result);
}
