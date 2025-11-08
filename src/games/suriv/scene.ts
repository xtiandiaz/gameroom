import { Scene } from '@/assets/emerald/core/scene'
import type { ApplicationOptions } from 'pixi.js'
import { Blob } from './blob'

export class SurivScene extends Scene {
  private player = new Blob()

  async init(options?: Partial<ApplicationOptions>): Promise<void> {
    await super.init(options)

    this.addEntity(this.player)
  }

  start(): void {
    super.start()

    this.player.position.set(this.screen.width / 2, this.screen.height / 2)

    this.stage.interactive = true

    this.stage.on('globalpointermove', (e) => {
      this.player.position.set(e.x, e.y)
    })
  }
}
