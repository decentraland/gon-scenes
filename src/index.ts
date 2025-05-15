import { engine, Entity, InputAction, Material, pointerEventsSystem, RealmInfo, Schemas, SyncComponents, Transform } from '@dcl/sdk/ecs'
import { createCube } from './factory'
import { syncEntity } from '@dcl/sdk/network'


export async function main() {
  // setupUi()
  // syncEntity(userCube, [Click.componentId, Material.componentId])

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
    const userCube = createCube(Math.random() * 8, 1, Math.random() * 8)
    syncEntity(userCube, [Material.componentId])
  })

  // Click.onChange(clickEntity, (val) => {
  //   console.log('Click changed', JSON.stringify(val))
  // })

  // setupUi()
}

export const Click = engine.defineComponent('click', { count: Schemas.Number })
export let clickEntity: Entity



= engine.addEntity()
      // // Add door capabilities.

      // // open/close the door on click
      // pointerEventsSystem.onPointerDown(doorEntity, () => {
      //   const doorState = DoorState.getMutable(doorEntity)
      //   doorState.open = !doorState.open
      // })

      // if (isServer()) {
      //   // Validate the received message
      //   DoorState.onChangeValidation(doorEntity, (newValue, currentValue, address) => {
      //     if (address === serverAddress) return true
      //     if (!ALLOWED_LIST.includes(address)) return false

      //     if (hasEnoughMana(address) && hasCoinInHand(address)) {
      //       return true
      //     }

      //     return false
      //   })

      //   // Apply some logic when the door opens/close.
      //   DoorState.onChange(doorEntity, () => {
      //     Transform.getMutable(doorEntity).rotation = Vector3.create(12, 1, 12)
      //     Material.getMutable(doorEntity).material
      //   })
      // }
// function isServer() {
//   return true
// }

// const GameState = Schemas.Array(Schemas.Map({
//   address: Schemas.String,
//   color: Schemas.Color4,
//   score: Schemas.Number
// }))


//   function hasEnoughMana(address: string) {
//     myProfile.userId
//     return true
//   }



//       // const doorEntity


