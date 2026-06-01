import {
  engine,
  SyncedClock,
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
  const syncTime = SyncedClock.getOrNull(engine.RootEntity)?.syncedTimestamp ?? null
  return (
    <UiEntity
      uiTransform={{
        width: 370 * scaleFactor,
        height: 230 * scaleFactor,
        margin: { left: 400 * scaleFactor, top: 50 * scaleFactor },
        padding: 4 * scaleFactor
      }}
      uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
      <Label
        value={`Synced Clock: \n ${formatTimestamp(syncTime)}`}
        fontSize={18 * scaleFactor}
      />

    </UiEntity>
  )}

function formatTimestamp(timestamp: number | null): string {
  if (timestamp === null) return '-';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

