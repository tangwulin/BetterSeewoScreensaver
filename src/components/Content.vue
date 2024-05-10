<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
import { getData } from '../DataSource'
import EventBus from 'js-event-bus'

const eventBus = new EventBus()

const time = ref('19:19')
const date = ref('2024/5/1')
const day = ref('星期八')

const data = getData()

let timer: NodeJS.Timeout

const map = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}

const articleIndex = ref(0)
eventBus.on('backgroundChanged', () => {
  articleIndex.value = (articleIndex.value + 1) % data.textList.length
})

const updateTime = () => {
  time.value = dayjs().format('HH:mm')
  date.value = dayjs().format('YYYY/MM/DD')
  day.value = map[dayjs().day()]
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="screensaverContent">
    <div class="screensaverTime">
      <p>{{ time }}</p>
      <p>
        <span>{{ date }}</span>
        {{ day }}
      </p>
    </div>
    <div class="screensaverArticle" v-if="data.textList.length!==0">
      <span class="screensaverLine screensaverTop"></span>
      <p class="screensaverWord">{{ data.textList[articleIndex]?.content }}</p>
      <p class="screensaverOrigin">-&nbsp;{{ data.textList[articleIndex]?.provenance }}&nbsp;-</p>
      <span class="screensaverLine screensaverBottom"></span>
    </div>
    <div class="screensaverFrom"><p>{{ data.materialSource }}</p></div>
  </div>
</template>

<style scoped>
.screensaverContent {
  font-family: 'Arial', 'Microsoft YaHei', '\9ED1\4F53', '\5B8B\4F53', sans-serif;
}

.screensaverContent {
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  z-index: 10000;
  text-align: center;
  padding-bottom: 56px;
}

.screensaverContent .screensaverTime {
  margin-bottom: 42px;
}

.screensaverContent .screensaverTime p:first-child {
  font-size: 78px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 78px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.screensaverContent .screensaverTime p:last-child {
  margin-top: 16px;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 24px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.screensaverContent .screensaverTime span {
  margin-right: 12px;
}

.screensaverContent .screensaverArticle {
  margin: 0 auto;
  width: 1000px;
}

.screensaverContent .screensaverArticle .screensaverLine {
  display: block;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
}

.screensaverContent .screensaverArticle .screensaverLine.screensaverTop {
  margin-bottom: 24px;
}

.screensaverContent .screensaverArticle .screensaverLine.screensaverBottom {
  margin-top: 24px;
}

.screensaverContent .screensaverArticle .screensaverWord {
  font-size: 32px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 48px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.screensaverContent .screensaverArticle .screensaverOrigin {
  margin-top: 12px;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 24px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.screensaverContent .screensaverFrom {
  position: absolute;
  right: 24px;
  bottom: 24px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0;
  text-align: center;
  line-height: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  display: inline-block;
}

* {
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-user-drag: none;
  outline-color: transparent;
}
</style>