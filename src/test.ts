import { EasingFunction, engine, Entity, InputAction, MeshCollider, MeshRenderer, pointerEventsSystem, Transform, Tween, tweenSystem } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { syncEntity, parentEntity } from '@dcl/sdk/network'


const positions = [
  Vector3.create(0, 2, 1),
  Vector3.create(1, 2, 0),
  Vector3.create(0, 2, -1),
  Vector3.create(-1, 2, 0),
]
let index = 0

export function test() {

  console.log('hello world!!!')

  const parent = engine.addEntity()
  Transform.create(parent, {
    position: { x: 8, y: 1, z: 8 },
  })
  MeshRenderer.setBox(parent)
  MeshCollider.setBox(parent)


  const child = engine.addEntity()
  Transform.create(child, {
    parent: 0 as Entity,
    position: { x: 0, y: 1, z: 0 },
  })
  MeshRenderer.setBox(child)
  MeshCollider.setBox(child)

  syncEntity(parent, [])
  syncEntity(child, [])
  parentEntity(child, parent)
  let log = false
  pointerEventsSystem.onPointerDown(
    {
      entity: child,
      opts: {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Click me!',
      }
    },
    () => {
      log = true
      console.log(`Clicked on the cube!`)
      const to = positions[index % 4]
      index++
      const from = Transform.get(child).position
      console.log('from', from.x, from.y, from.z)
      console.log('to', to.x, to.y, to.z)
      Tween.createOrReplace(child, {
        mode: Tween.Mode.Move({
          start: from,
          end: to,
        }),
        duration: 150,
        easingFunction: EasingFunction.EF_EASEBACK
      })
    }
  )

  engine.addSystem(() => {
    if (log) {
      console.log('position change', Transform.get(child).parent, Transform.get(child).position.x, Transform.get(child).position.y, Transform.get(child).position.z)
    }
    if (tweenSystem.tweenCompleted(child)) {
      log = false
      console.log('Tween completed', Transform.get(child).parent, Transform.get(child).position.x, Transform.get(child).position.y, Transform.get(child).position.z)
    }
  })

}