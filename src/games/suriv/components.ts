import { Graphics, Texture, TilingSprite, type PointData } from 'pixi.js'
import { Color } from './types'
import {
  ContainerChildComponent,
  Screen,
  BEZIER_CIRCLE_CP_LENGTH as CP_LEN,
  type BezierCurve,
} from '@/assets/emerald'

export class GridSkin extends ContainerChildComponent<TilingSprite> {
  body: TilingSprite

  constructor() {
    super()

    this.body = TilingSprite.from('grid')
    this.body.tint = Color.Energy
    this.body.alpha = 0.25
  }

  scale() {
    const s = 0.2
    this.body.tileScale = { x: (s * Screen.height) / Screen.width, y: s }
    const tileSize = Math.round(s * Screen.height)
    this.body.tilePosition = {
      x: (-(Screen.width % tileSize) * this.body.tileScale.x) / 2,
      y: 0,
    }
  }
}

export class PlayerSkin extends ContainerChildComponent<Graphics> {
  body = new Graphics()
  curves: BezierCurve[]
  startPoint: PointData

  constructor(private radius: number) {
    super()

    this.startPoint = { x: 0, y: -radius }
    this.curves = [
      {
        c0: { x: radius * CP_LEN, y: -radius },
        p: { x: radius, y: 0 },
        c1: { x: radius, y: -radius * CP_LEN },
      },
      {
        c0: { x: radius, y: radius * CP_LEN },
        p: { x: 0, y: radius },
        c1: { x: radius * CP_LEN, y: radius },
      },
      {
        c0: { x: -radius * CP_LEN, y: radius },
        p: { x: -radius, y: 0 },
        c1: { x: -radius, y: radius * CP_LEN },
      },
      {
        c0: { x: -radius, y: -radius * CP_LEN },
        p: this.startPoint,
        c1: { x: -radius * CP_LEN, y: -radius },
      },
    ]
  }

  redraw(factor: number): void {
    const g = this.body
    g.clear()

    this.curves[2]!.p.x = this.curves[2]!.c1.x = this.curves[3]!.c0.x = -this.radius * factor
    this.curves[2]!.c1.y = (this.radius * CP_LEN) / factor
    this.curves[3]!.c0.y = (-this.radius * CP_LEN) / factor

    g.moveTo(this.startPoint.x, this.startPoint.y)

    for (const c of this.curves) {
      g.bezierCurveTo(c.c0.x, c.c0.y, c.c1.x, c.c1.y, c.p.x, c.p.y)
    }
    g.stroke({ width: 5, color: Color.Energy })
  }
}
