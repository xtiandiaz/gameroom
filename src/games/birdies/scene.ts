import { Scene } from '@/assets/emerald/core/scene'
import { Card } from './card'
import { Assets, Point, Rectangle, Texture, type ApplicationOptions } from 'pixi.js'
import { Tweener, Ease } from '@/assets/emerald/core/tweener'
import { Color, ColorScheme, schemeColor } from '@/assets/design-tokens/palette'
import { CardGrid } from './card-grid'

export interface Options {
  speed: number
}

export class BirdiesScene extends Scene {
  _imgPaths: string[] = [
    '/img/hummingbird.jpg',
    '/img/blue-jay.jpg',
    '/img/cardenal.jpg',
    '/img/sparrow.jpg',
  ]
  _cards: Card[] = []
  _grid = new CardGrid({
    cardSize: 200,
    spacing: 32,
  })

  async init(options?: Partial<ApplicationOptions>): Promise<void> {
    await super.init({
      background: schemeColor(ColorScheme.Light, Color.Orange),
      ...options,
    })

    await Assets.load(this._imgPaths)

    this._grid.init()
    this.addEntity(this._grid)

    for (const texturePath of this._imgPaths) {
      const texture = Texture.from(texturePath)
      const card = new Card('')
      card.initWithTexture(texture, 200)

      this.addEntity(card)
      this._cards.push(card)
    }
  }

  draw(): void {
    const margin = 32
    const gridDim = Math.min(this.screen.width, this.screen.height) - margin * 2

    this._grid.draw(new Rectangle(0, 0, gridDim, gridDim))
  }

  async animateCards(): Promise<void> {
    for await (const card of this._cards) {
      await Tweener.shared.tween(card, 'rotation', card.rotation + Math.PI, 2, Ease.BackOut(1))
      this.destroyEntity(card.id)
    }
  }

  onResize(): void {
    this._grid.position.set(
      (this.screen.width - this._grid.width) / 2,
      (this.screen.height - this._grid.height) / 2,
    )
    this._placeCards()
  }

  private _placeCards(): void {
    for (let i = 0; i < this._cards.length; i++) {
      const card = this._cards[i]!
      card.position = this.stage.toLocal(
        this._grid.getGlobalCellPosition(i % this._grid.cols, Math.floor(i / this._grid.rows)),
      )
    }
  }
}
