import { Scene, Screen, System, World, type SignalBus } from '@/assets/emerald/core'
import { GestureSystem, PhysicsSystem } from '@/assets/emerald/systems'
import { createBoundaries, createPlayer } from './entities'
import { CollisionSystem, MovementSystem, PlayerControlSystem } from './systems'

export class DemoScene extends Scene {
  systems = [
    new PhysicsSystem(),
    // new CollisionSystem(),
    // new MovementSystem(),
    new PlayerControlSystem(),
  ]

  constructor() {
    super('demo')
  }

  build(world: World): void {
    createBoundaries().forEach((b) => world.addEntity(b))

    world.addEntity(createPlayer())
  }
}
