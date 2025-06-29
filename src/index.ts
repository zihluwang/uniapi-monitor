import { getBalance } from "./api/uniapi"
import { sendMessage } from "./api/lark"

async function scheduleController(env: Env) {
  // fetch balance from `UniAPI`
  const balance = await getBalance(env)
  console.log(`balance = ${balance}`)

  // send message
  await sendMessage(balance, env)
  console.log("Message has sent.")
}

export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    await scheduleController(env)
  },
} satisfies ExportedHandler<Env>
