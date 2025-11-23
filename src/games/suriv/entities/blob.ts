import { Entity } from '@/assets/emerald/entity'
import { Graphics, type Rectangle } from 'pixi.js'

export class Blob extends Entity {
  private color: number
  private graphics = new Graphics()

  constructor(color: number) {
    super()

    this.color = color
    this.addChild(this.graphics)
  }

  draw(_: Rectangle): void {
    const g = this.graphics
    g.circle(0, 0, 20)
    g.fill(this.color)
  }
}
