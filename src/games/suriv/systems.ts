import { World, System, Vector, type SignalBus, type SignalEmitter } from '@/assets/emerald/core'
import { PhysicsComponent } from '@/assets/emerald/components'
import { CollisionSignal, DragGestureSignal, SwipeGestureSignal } from '@/assets/emerald/signals'
import { Body } from 'matter-js'
import { PlayerComponent } from './components'
import { directionVector } from '@/assets/emerald/utils'

export class CollisionSystem extends System {
  init(world: World, sbe: SignalBus & SignalEmitter): void {
    sbe.connect(CollisionSignal, (s) => {
      const pc = world.getEntity(s.colliderId)?.getComponent(PhysicsComponent)
      if (pc) {
        Body.setVelocity(pc.body, { x: (Math.random() < 0.5 ? -1 : 1) * 5, y: -12 })
      }
    })
  }
}

export class PlayerControlSystem extends System {
  init(world: World, sbe: SignalBus & SignalEmitter): void {
    this.disconnectables.push(
      sbe.connect(SwipeGestureSignal, (s) => {
        // c.move = pe.position.add(directionVector(s.direction).multiplyScalar(100))
        const [e, c] = world.getEntitiesWithComponent(PlayerComponent)[0]!
        const pc = e.getComponent(PhysicsComponent)!
        Body.setVelocity(
          pc.body,
          directionVector(s.direction).multiplyScalar(10).add(pc.body.velocity),
        )
      }),
    )
  }
}

export class MovementSystem extends System {
  update(world: World, se: SignalEmitter, dt: number): void {
    const [pe, pc] = world.getEntitiesWithComponent(PlayerComponent)[0]!
    pe.position.x += (pc.move.x - pe.position.x) / 10
    pe.position.y += (pc.move.y - pe.position.y) / 10

    // pc.move = pc.move.subtract(pe.position)
  }
}
