import { Blob } from './blob'
import { PlayerControls } from '../components/controls'
import { Point, type Rectangle } from 'pixi.js'

export class Player extends Blob {
  constructor() {
    super(0xffffff)
  }

  init(): void {
    super.init()

    this.addComponent(PlayerControls)
  }

  draw(bounds: Rectangle): void {
    super.draw(bounds)

    this.position = new Point(bounds.width / 2, bounds.height / 2)
  }
}
