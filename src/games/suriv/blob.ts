import { ColorScheme, schemeColor, Color } from '@/assets/design-tokens/palette'
import { Component } from '@/assets/emerald/core/component'
import { Graphics, type Rectangle } from 'pixi.js'

export class Blob extends Component {
  _g = new Graphics()

  init(): void {
    super.init()
    this.addChild(this._g)
  }

  draw(rect: Rectangle): void {
    const g = this._g
    g.circle(0, 0, 20)
    g.fill(schemeColor(ColorScheme.Dark, Color.Blue))
  }
}
