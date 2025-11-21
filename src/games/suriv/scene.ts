import { Scene } from '@/assets/emerald/core/scene'
import { Player } from './entities/player'
import grid from './entities/grid'
import { PlayerControls } from './components/controls'

const scene = new Scene()

const player = new Player()

scene.onInit = (s) => {
  player.init()

  s.addEntity(grid)
  s.addEntity(player)
}

scene.onStart = (s) => {
  s.stage.interactive = true

  const controls = player.getComponent(PlayerControls)!
  s.stage.on('pointerdown', (e) => {
    controls.onTouchStarted(e.getLocalPosition(s.stage))
  })
  s.stage.on('pointermove', (e) => {
    controls.onTouchMoved(e.getLocalPosition(s.stage))
  })
  s.stage.on('pointerup', () => {
    controls.onTouchEnded()
  })

  // s.stage.on('click', () => {
  //   Tweener.main.to(player, { scaleX: 2, scaleY: 2 }, 'ease.out', 1).vars.onComplete = () => {
  //     console.log('done')
  //   }
  // })
}

export default scene
