<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';
import { SurivScene } from './scene';
import { Color, ColorScheme, schemeColor } from '@/assets/design-tokens/palette';

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const scene = new SurivScene()

onMounted(async () => {
  await scene.init({
    background: schemeColor(ColorScheme.Dark, Color.Background),
    canvas: canvas.value!,
    resizeTo: window
  })
  
  scene.start()
})
</script>

<template>
  <canvas ref="canvas" />
</template>
