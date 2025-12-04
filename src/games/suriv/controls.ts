// import { Screen } from '@/assets/emerald/core'
// import { Point, Point as Vector2, Rectangle } from 'pixi.js'
// import 'pixi.js/math-extras'
// import { Body } from 'matter-js'
// import '@/assets/emerald/extensions/pixi.extensions'

// interface State {
//   startTouchPos: Point
//   startPlayerPos: Point
//   nextPos: Point
//   shouldMove: boolean
//   bounds: Rectangle
// }

// export class PlayerControls {
//   state: State = {
//     startTouchPos: new Point(),
//     startPlayerPos: new Point(),
//     nextPos: new Point(),
//     shouldMove: false,
//     bounds: new Rectangle(),
//   }
//   private dragSpan = new Vector2(100)

//   get nextPos(): Point {
//     return this.state.nextPos
//   }

//   init(): void {
//     this.dragSpan = Screen.size.divideScalar(3)
//     console.log(this.entity.body!.position)
//     this.state.nextPos.copyFrom(this.entity.body!.position)
//     this.state.startPlayerPos.copyFrom(this.entity.body!.position)
//   }

//   onTouchStarted(startPos: Point) {
//     this.state.startPlayerPos.copyFrom(this.entity.position)
//     this.state.startTouchPos = startPos
//     this.state.shouldMove = true
//   }

//   onTouchMoved(pos: Point) {
//     if (!this.state.shouldMove) {
//       return
//     }
//     const normDispl = pos.subtract(this.state.startTouchPos).divide(this.dragSpan)
//     const displ = normDispl.multiply(this.state.bounds.size())
//     // console.log(normDispl, displ)
//     this.state.nextPos = this.state.startPlayerPos.add(displ)
//   }

//   onTouchEnded() {
//     this.state.shouldMove = false
//   }

//   update(deltaTime: number): void {
//     let bodyPos = new Point().copyFrom(this.entity.body!.position)
//     bodyPos = bodyPos.add(
//       this.state.nextPos.subtract(this.entity.body!.position).multiplyScalar(1 / 7),
//     )
//     Body.setPosition(this.entity.body!, bodyPos)
//   }
// }
