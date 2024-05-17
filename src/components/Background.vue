<script setup lang="ts">
import { getData } from '../DataSource.ts'
import { onMounted, ref } from 'vue'
import EventBus from 'js-event-bus'
import { Background } from '../type/background.ts'
import SpinePlayer from './SpinePlayer.vue'

const eventBus = new EventBus()

const data = getData()

let backgroundList: Background[]
let videoList: string[] = []

if (data.extraPayload) {
  backgroundList = data.extraPayload.screensaverContent
  data.extraPayload.screensaverContent
      .map((item) => {
        if (item.type === 'video') {
          videoList.push(item.path)
        }
      })

} else {
  backgroundList = data.imageList.map((item) => {
    return {
      path: item,
      type: 'image',
      fit: ['contain', 'cover'][data.pictureSizeType] as 'contain' | 'cover',
      duration: 0,
    }
  })
}

const backgroundIndex = ref(999)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const backgroundUpdater = async () => {
  const currentDuration = backgroundList[backgroundIndex.value].duration
  await delay(currentDuration > 0 ? currentDuration : data.extraPayload?.screensaverSwitchInterval ?? data.switchInterval * 1000)

  backgroundIndex.value = (backgroundIndex.value + 1) % backgroundList.length
  eventBus.emit('backgroundChanged')
  await backgroundUpdater()
}

onMounted(() => {
  backgroundIndex.value = 0
  eventBus.emit('backgroundReady')
  backgroundUpdater()
})
</script>

<template>
  <video v-for="item in videoList" :key="item" :src="item" preload="auto" style="display: none"/>
  <div style="height: 100vh;width: 100vw;background: #000;">
    <transition v-for="(item,index) in backgroundList" :key="index" name="fade">
      <img
          v-if="index===backgroundIndex && item.type==='image'"
          :src="item.path"
          alt="background"
          :style="{width: '100%',height: '100%',objectFit: item.fit,position: 'absolute',top: 0,left: 0}"
      />
      <video
          v-else-if="index===backgroundIndex && item.type==='video'"
          autoplay
          muted
          :src="item.path"
          :style="{width: '100%',height: '100%',objectFit: item.fit,position: 'absolute',top: 0,left: 0}"
      />
      <SpinePlayer
          v-else-if="index===backgroundIndex && item.type==='spine'"
          :spine-player-config="item.spinePlayerConfig"
          :scale="item.scale"
          :offsetX="item.offsetX"
          :offsetY="item.offsetY"
      />
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>