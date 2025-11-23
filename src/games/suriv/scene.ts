import { Scene } from '@/assets/emerald/scene'
import { Player } from './entities/player'
import { PlayerControls } from './components/controls'
import type { ApplicationOptions } from 'pixi.js'

export default class SurivScene extends Scene {
  private player = new Player()

  async init(options?: Partial<ApplicationOptions>): Promise<void> {
    await super.init(options)

    this.addEntity(this.player)
  }

  start(): void {
    super.start()

    this.stage.eventMode = 'static'
    this.stage.hitArea = this.viewport

    // const controls = this.player.getComponent(PlayerControls)!
    // this.stage.on('pointerdown', (e) => {
    //   controls.onTouchStarted(e.getLocalPosition(this.stage))
    // })
    // this.stage.on('pointermove', (e) => {
    //   controls.onTouchMoved(e.getLocalPosition(this.stage))
    // })
    // this.stage.on('pointerup', () => {
    //   controls.onTouchEnded()
    // })
  }
}

// s.stage.on('click', () => {
//   Tweener.main.to(player, { scaleX: 2, scaleY: 2 }, 'ease.out', 1).vars.onComplete = () => {
//     console.log('done')
//   }
// })
