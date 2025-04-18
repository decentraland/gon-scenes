import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  Material} from '@dcl/sdk/ecs'
import { Cube, Spinner } from './components'
import { Color4 } from '@dcl/sdk/math'
import { getRandomHexColor } from './utils'


// Cube factory
export function createCube(x: number, y: number, z: number, syncEnumId?: number): Entity {
  const entity = engine.addEntity()

  // Used to track the cubes
  Cube.create(entity)

  Transform.create(entity, { position: { x, y, z } })
  // set how the cube looks and collides
  MeshRenderer.setBox(entity)
  MeshCollider.setBox(entity)
  Material.setPbrMaterial(entity, { albedoColor: Color4.fromHexString(getRandomHexColor()) })

  // Make the cube spin, with the circularSystem
  Spinner.create(entity, { speed: 100 * Math.random() })

  return entity
}
