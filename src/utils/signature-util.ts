export async function generateSignature(timestamp: number, signKey: string): Promise<string> {
  const stringToSign = `${timestamp}\n${signKey}`

  const encoder = new TextEncoder()

  const keyData = encoder.encode(stringToSign)
  const messageData = new Uint8Array(0)

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  )

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, messageData)

  return bufferToBase64(signatureBuffer)
}

function bufferToBase64(buffer: ArrayBuffer): string {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary)
}
