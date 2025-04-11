import {
  engine,
  Transform,
  UiCanvasInformation,
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Dropdown, Label, ReactEcsRenderer, UiEntity } from '@dcl/react-ecs'
import { createCube } from './factory'
import { Click, clickEntity } from '.'

function getScaleUIFactor() {
  const uiCanvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity)

  if (!uiCanvasInfo) return 1

  const scaleFactor = Math.min(uiCanvasInfo.width / 1920, uiCanvasInfo.height / 1080)

  return scaleFactor
}

let scaleFactor: number = 1

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(() => {
    scaleFactor = getScaleUIFactor()
    return uiComponent()
  })
}
const uiComponent = () => {
  return (<UiEntity
    uiTransform={{
      width: 700 * scaleFactor,
      height: 430 * scaleFactor,
      margin: { left: 400 * scaleFactor },
      padding: 4 * scaleFactor
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString('#70ac76ff') }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 50 * scaleFactor,
          margin: '8px 0'
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'assets/PeopleFilled.png'
          }
        }}
        uiText={{ value: 'SDK7', fontSize: 18 }}
      />
      <Asd />
      <Label
        onMouseDown={() => {
          console.log('Player Position clicked !')
        }}
        value={`BOEDO PLAYER: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 }}
      />
      <Label
        onMouseDown={() => {
          console.log('Player Position clicked !')
        }}
        value={`Clicks: ${Click.getOrNull(clickEntity)?.count ?? '-'}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 }}
      />
      <Button
        uiTransform={{ height: 40, margin: 8, padding: 10 }}
        value="Spawn cube"
        variant="primary"
        fontSize={14}
        onMouseDown={() => {
          console.log('on mouse sdown')
          // messageBus.emit('pravus', { cubes: [...engine.getEntitiesWith(Cube)].length, pravus: true })
          createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8)
        }}
      />
    </UiEntity>
  </UiEntity>
)}

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}


function Asd() {
  const [asd, setAsd] = ReactEcs.useState<boolean>(false)
  return (
    <UiEntity uiTransform={{ flexDirection: 'column' }}>
      {asd && <Dropdown
        acceptEmpty
        emptyLabel="Select Smart Item"
        options={['a', 'b', 'c', 'd', 'e']}
        selectedIndex={1}
        textAlign="middle-left"
        fontSize={14 * scaleFactor}
        uiTransform={{
          height: 40 * scaleFactor,
          width: '100%'
        }}
        uiBackground={{ color: Color4.White() }}
        color={Color4.Black()}
      />}
      <Dropdown
        acceptEmpty
        emptyLabel="Select Smart Item"
        options={['1', '2', '3', '4', '%e']}
        textAlign="middle-left"
        fontSize={14 * scaleFactor}
        uiTransform={{
          height: 40 * scaleFactor,
          width: '100%'
        }}
        uiBackground={{ color: Color4.White() }}
        color={Color4.Black()}
      />
      <Dropdown
        acceptEmpty
        emptyLabel="asd"
        options={['1as', '2dsa', '3asd', '4dsa', '%e']}
        textAlign="middle-left"
        fontSize={14 * scaleFactor}
        uiTransform={{
          height: 40 * scaleFactor,
          width: '100%'
        }}
        uiBackground={{ color: Color4.White() }}
        color={Color4.Black()}
      />
      <Label value='Show / Hide' onMouseDown={() => setAsd(!asd)} />
    </UiEntity>
  )
}