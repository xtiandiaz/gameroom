import { GameApp, type GameState } from '@/assets/emerald/game'
import { DemoScene } from './scenes'

class Suriv extends GameApp {
  protected systems = []
}

const state: GameState = {
  isPaused: false,
}

export default new Suriv(state, [new DemoScene()])
