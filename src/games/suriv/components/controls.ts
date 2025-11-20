import { Component } from '@/assets/emerald/core/component'
import { Point } from 'pixi.js'
import 'pixi.js/math-extras'

export class PlayerControls extends Component {
  private pos = new Point()

  start(): void {
    this.pos = this.container.position
  }

  onTouchStarted(startPos: Point) {}

  onTouchMoved(pos: Point) {
    this.pos = pos
  }

  update(_: number): void {
    this.container.position = this.container.position.add(
      this.pos.subtract(this.container.position).multiplyScalar(1 / 7),
    )
  }
}
