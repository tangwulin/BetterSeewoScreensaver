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
})

const emits = defineEmits(['loaded', 'error'])

const playerConfig = {
  ...props.spinePlayerConfig,
  success: (widget: SpinePlayer) => {
    emits('loaded', widget)
  },
  error: (widget: SpinePlayer) => {
    emits('error', widget)
  },
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
  <div id="spine-wrapper">
  </div>
</template>

<style scoped>
#spine-wrapper {
  position: absolute;
  width: 180vw;
  height: 180vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background: #000;
}
</style>