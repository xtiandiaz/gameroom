import { Assets, Graphics, Texture } from 'pixi.js'
import {
  Collider,
  ColliderShape,
  CollisionSystem,
  DragGestureTracker,
  GestureKey,
  GestureSystem,
  GestureTarget,
  Scene,
  World,
} from '@/assets/emerald'
import { CollectablesSystem, PlayerControlSystem, PlayerSkinning, Resizing } from './systems'
import { GridSkin, PlayerSkin } from './components'
import { CollisionLayer } from './types'

export class DemoScene extends Scene {
  systems = [
    new GestureSystem(),
    new CollisionSystem(
      new Map([[CollisionLayer.Player, CollisionLayer.Collectable | CollisionLayer.Enemy]]),
    ),
    new PlayerSkinning(),
    new PlayerControlSystem(),
    new CollectablesSystem(),
    new Resizing(),
  ]
  private draggingTracker = new DragGestureTracker()

  constructor() {
    super('demo')
  }

  async load(): Promise<void> {
    Assets.addBundle('all', [{ alias: 'grid', src: '/suriv/textures/grid.png' }])

    await Assets.loadBundle('all')
  }

  build(world: World): void {
    world.createEntity('grid').addContainerChildComponent(new GridSkin())

    world
      .createEntity('player')
      .addContainerChildComponent(new PlayerSkin(20))
      .addComponent(new Collider(ColliderShape.circle(0, 0, 24), CollisionLayer.Player))
      .addComponent(new GestureTarget([GestureKey.Drag]))
  }

  deinit(): void {
    super.deinit()

    this.draggingTracker.deinit()
  }
}
