import { engine, Entity, InputAction, Material, pointerEventsSystem, RealmInfo, Schemas } from '@dcl/sdk/ecs'
import { createCube } from './factory'
import { changeColorSystem } from './systems'

import { syncEntity } from '@dcl/sdk/network'
import { setupUi } from './ui'

export const Click = engine.defineComponent('click', { count: Schemas.Number })
export let clickEntity: Entity

export async function main() {
  const userCube = createCube(Math.random() * 8, 1, Math.random() * 8)
  syncEntity(userCube, [Click.componentId, Material.componentId])
  changeColorSystem()
  // setupUi()
  if (false) {
    // console.log('__DEV__', __DEV__)
    //Enable local PLAY button
     engine.addSystem(() => {
         const realmInfo = RealmInfo.getOrNull(engine.RootEntity)
         console.log('room: ', realmInfo?.room)
         if (!realmInfo) return
         if (!realmInfo.isConnectedSceneRoom) {

            //  realmInfo.isConnectedSceneRoom = true
         }
     })
  }


  clickEntity = createCube(4, 1, 2)
  Click.create(clickEntity, { count: 0 })
  syncEntity(clickEntity, [Click.componentId, Material.componentId], 888)

  pointerEventsSystem.onPointerDown({ entity: clickEntity, opts: { hoverText: 'add counter', button: InputAction.IA_PRIMARY }}, () => {
    Click.getMutable(clickEntity).count += 1
  })

  // Click.onChange(clickEntity, (val) => {
  //   console.log('Click changed', JSON.stringify(val))
  // })

  // setupUi()
}
