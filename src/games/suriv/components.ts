import { Component, Vector } from '@/assets/emerald/core'

export enum PlayerControlMode {
  Free,
  Bounded,
}

export class PlayerComponent extends Component {
  constructor(
    public move: Vector = new Vector(),
    public controlMode: PlayerControlMode = PlayerControlMode.Free,
  ) {
    super()
  }
}
