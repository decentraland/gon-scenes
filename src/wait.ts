import { engine } from "@dcl/sdk/ecs"

export async function wait(ms: number) {
    return new Promise<void>((resolve) => {
      let timer = 0
      function timerFn(dt: number) {
        timer += dt
        if (timer * 1000 >= ms) {
          resolve()
          engine.removeSystem(timerFn)
        }
      }
      engine.addSystem(timerFn)
    })
  }
