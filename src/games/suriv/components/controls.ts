import BaseComponent from '@/assets/emerald/components/Component'
import { Point, Point as Vector2, Rectangle } from 'pixi.js'
import 'pixi.js/math-extras'
import '@/assets/emerald/extensions/pixi.extensions'

interface State {
  startTouchPos: Point
  startPlayerPos: Point
  nextPos: Point
  shouldMove: boolean
  bounds: Rectangle
}

export class PlayerControls extends BaseComponent {
  state: State = {
    startTouchPos: new Point(),
    startPlayerPos: new Point(),
    nextPos: new Point(),
    shouldMove: false,
    bounds: new Rectangle(),
  }
  private dragSpan = new Vector2(100)

  draw(bounds: Rectangle): void {
    this.state.bounds = bounds
    this.dragSpan = bounds.size().divideScalar(3)
  }

  start(): void {
    this.state.nextPos.copyFrom(this.container.position)
    this.state.startPlayerPos.copyFrom(this.container.position)
  }

  onTouchStarted(startPos: Point) {
    this.state.startPlayerPos.copyFrom(this.container.position)
    this.state.startTouchPos = startPos
    this.state.shouldMove = true
  }

  onTouchMoved(pos: Point) {
    if (!this.state.shouldMove) {
      return
    }
    const normDispl = pos.subtract(this.state.startTouchPos).divide(this.dragSpan)
    const displ = normDispl.multiply(this.state.bounds.size())
    // console.log(normDispl, displ)
    this.state.nextPos = this.state.startPlayerPos.add(displ)
  }

  onTouchEnded() {
    this.state.shouldMove = false
  }

  // update(_: number): void {
  //   this.container.position = this.container.position.add(
  //     this.state.nextPos.subtract(this.container.position).multiplyScalar(1 / 7),
  //   )
  // }
}
