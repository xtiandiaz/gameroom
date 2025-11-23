import { Blob } from './blob'
import { PlayerControls } from '../components/controls'
import { Point, Rectangle } from 'pixi.js'
import { Bodies, Body, Vector } from 'matter-js'

export class Player extends Blob {
  private viewport = new Rectangle()

  constructor() {
    super(0xffffff)
  }

  init() {
    this.addComponent(PlayerControls)
    this.addBody(Bodies.rectangle(0, 0, 20, 20))
  }

  draw(rect: Rectangle): void {
    super.draw(rect)

    this.viewport = rect
  }

  start(): void {
    Body.setPosition(this.body!, this.viewport.center())
  }

  update(deltaTime: number): void {}
}
