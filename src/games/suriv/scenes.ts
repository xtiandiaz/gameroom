import { createBoundaries, createCollectable, createEnemy, createPlayer } from './entities'
import { CollectingSystem, PlayerControlSystem } from './systems'
import { ItemCollected } from './signals'
import {
  CollisionSystem,
  DragGestureTracker,
  GestureSystem,
  PhysicsSystem,
  Scene,
  World,
  type SignalBus,
} from '@/assets/emerald'

export class DemoScene extends Scene {
  systems = [
    new PhysicsSystem(),
    new CollisionSystem(),
    new GestureSystem(),
    new PlayerControlSystem(),
    new CollectingSystem(),
  ]
  private draggingTracker = new DragGestureTracker()

  constructor() {
    super('demo')
  }

  build(world: World): void {
    world.addEntity(...createBoundaries(), createPlayer(), createCollectable(), createEnemy())
  }

  async init(world: World, sb: SignalBus): Promise<void> {
    await super.init(world, sb)

    this.connections.push(sb.connect(ItemCollected, (_) => world.addEntity(createCollectable())))
  }

  deinit(): void {
    super.deinit()

    this.draggingTracker.deinit()
  }
}
