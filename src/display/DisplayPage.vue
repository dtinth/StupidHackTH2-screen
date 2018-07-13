<template>
  <div @click="clicked($event)">
    <FirebaseData path="display" subject="screen data">
      <template slot-scope="{ data: screen }">
        <Layout :currentView="screen.currentView" :showFloating="screen.showFloating">
          <template slot="mini-screen">
            <span>{{currentTime}}</span>
          </template>
          <template slot="floating">
            <span v-html="screen.floating"></span>
          </template>
          <template slot="curtain">
            <div class="screen-container" style="text-shadow: 0 4px 16px rgba(0, 0, 0, 0.5)">
              <div class="screen-data" v-html="screen.curtain"></div>
            </div>
          </template>
          <template slot="screen">
            <div class="screen-container" style="color: #555">
              <div class="screen-data" v-html="screen.screen"></div>
            </div>
          </template>
        </Layout>
      </template>
    </FirebaseData>
  </div>
</template>

<script>
import Layout from './Layout'
import { FirebaseData } from '../firebase'

export default {
  data() {
    return { currentTime: this.getCurrentTime() }
  },
  methods: {
    getCurrentTime() {
      const n = new Date()
      return n.getHours() + ':' + n.getMinutes().toString(10).padStart(2, '0')
    }
  },
  created() {
    setInterval(() => {
      this.currentTime = this.getCurrentTime()
    }, 5000)
  },
  components: {
    Layout,
    FirebaseData
  }
}
</script>

<style scoped>
.screen-container {
  width: 1920px;
  height: 1080px;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 96px;
}
</style>

