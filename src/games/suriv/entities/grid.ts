import { Entity } from '@/assets/emerald/core/entity'
import { Graphics } from 'pixi.js'

const grid = new Entity()
const g = new Graphics()

grid.onInit = (c) => {
  c.addChild(g)
}

grid.onDraw = (_, r) => {
  g.rect(r.x, r.y, r.width, r.height)
  g.fill('0x272c4f')
}

export default grid
