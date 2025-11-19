import { type Component } from '@/assets/emerald/core/component'
import type { Container } from 'pixi.js'
import { Point } from 'pixi.js'
import 'pixi.js/math-extras'

export class Movement implements Component {
  destination = new Point()

  init() {}

  update(container: Container, _: number): void {
    container.position = container.position.add(
      this.destination.subtract(container.position).multiplyScalar(1 / 7),
    )
  }
}
