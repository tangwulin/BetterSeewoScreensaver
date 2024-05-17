<script setup lang="ts">
import Background from './components/Background.vue'
import Content from './components/Content.vue'

const clickHandler = () => {
  if (import.meta.env.PROD) {
    window.ipcRenderer.send('windowMessage', {
      windowName: 'screensaver_0',
      eventName: 'closeScreenSaver',
      data: null,
      crossWindowName: null,
    })
  } else {
    alert('这不是生产环境，无法关闭屏保')
  }
}
</script>

<template>
  <div style="height: 100%;width: 100%;" @click="clickHandler">
    <Content/>
    <Background/>
  </div>
</template>

<style scoped>

</style>
