<script setup lang="ts">
import '../assets/spine-player.css'
import { spine } from '../lib/spine-player'
import { onMounted, onUnmounted, PropType } from 'vue'
import SpinePlayerConfig = spine.SpinePlayerConfig
import SpinePlayer = spine.SpinePlayer

const props = defineProps({
  spinePlayerConfig: {
    type: Object as PropType<SpinePlayerConfig>,
    required: true,
  },
  scale: {
    type: Number,
    default: 1.95,
  },
  offsetX: {
    type: Number,
    default: -0.53,
  },
  offsetY: {
    type: Number,
    default: -0.5,
  },
})

const emits = defineEmits(['loaded', 'error'])

const playerConfig = {
  ...props.spinePlayerConfig,
  success: (widget: SpinePlayer) => {
    emits('loaded', widget)
  },
  error: (widget: SpinePlayer) => {
    console.error('SpinePlayer error:', widget)
    emits('error', widget)
  },
}

const playerStyle = {
  '--scale': props.scale,
  '--offset-x': props.offsetX * 100 + '%',
  '--offset-y': props.offsetY * 100 + '%',
}

let player: SpinePlayer

onMounted(() => {
  player = new spine.SpinePlayer('spine-wrapper', playerConfig)
})

onUnmounted(() => {
  player.stopRendering()
})

</script>

<template>
  <div id="spine-wrapper" :style="playerStyle">
  </div>
</template>

<style scoped>
#spine-wrapper {
  position: absolute;
  width: calc(100% * var(--scale));
  height: calc(100% * var(--scale));
  top: 50%;
  left: 50%;
  transform: translate(var(--offset-x), var(--offset-y));
  overflow: hidden;
  background: #000;
}
</style>