import { engine, Entity, InputAction, Material, pointerEventsSystem, RealmInfo, Schemas, SyncedClock } from '@dcl/sdk/ecs'
import { createCube } from './factory'
import { syncEntity } from '@dcl/sdk/network'
import { setupUi } from './ui'


export async function main() {
  setupUi()
  engine.addSystem(() => {
    for (const [entity, value] of engine.getEntitiesWith(SyncedClock)) {
      console.log(`Entity=${entity}. SyncedClock: ${value.syncedTimestamp}. Status: ${value.status}`)
    }
  })


  clickEntity = createCube(4, 1, 2)
  Click.create(clickEntity, { count: 0 })
  syncEntity(clickEntity, [Click.componentId, Material.componentId], 888)

  pointerEventsSystem.onPointerDown({ entity: clickEntity, opts: { hoverText: 'add counter', button: InputAction.IA_PRIMARY }}, () => {
    Click.getMutable(clickEntity).count += 1
    const userCube = createCube(Math.random() * 8, 1, Math.random() * 8)
    syncEntity(userCube, [Material.componentId])
  })

}

export const Click = engine.defineComponent('click', { count: Schemas.Number })
export let clickEntity: Entity

