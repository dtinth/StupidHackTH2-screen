<template>
  <div @click="clicked($event)">
    <FirebaseData path="display" subject="screen data">
      <template slot-scope="{ data: screen }">
        <Layout :currentView="screen.currentView" :showFloating="screen.showFloating">
          <template slot="mini-screen">
            <span>{{currentTime}}</span>
          </template>
          <template slot="floating">
            <span v-if="!screen.votingMode" v-html="screen.floating"></span>
            <span v-if="screen.votingMode">
              <FirebaseData path="currentProject" subject="presentation state">
                <template slot-scope="{ data: currentProject }">
                  <div class="inactive" v-if="!currentProject">No active project...</div>
                  <div v-if="currentProject">
                    <FirebaseData :path="'projects/' + currentProject" subject="project information">
                      <template slot-scope="{ data: project }">
                        <div class="vote-title">
                          Now presenting: <b>{{project.title}}</b><br />
                          &rarr; bit.ly/stupid-reaction
                        </div>
                      </template>
                    </FirebaseData>
                  </div>
                </template>
              </FirebaseData>
            </span>
          </template>
          <template slot="curtain">
            <div class="screen-container" style="text-shadow: 0 4px 16px rgba(0, 0, 0, 0.5)">
              <div class="screen-data" v-html="screen.curtain"></div>
            </div>
          </template>
          <template slot="screen">
            <div class="screen-container" style="color: #555">
              <div v-if="!screen.votingMode" class="screen-data" v-html="screen.screen"></div>
              <div v-if="screen.votingMode" class="screen-data">
                <FirebaseData path="currentProject" subject="presentation state">
                  <template slot-scope="{ data: currentProject }">
                    <div class="inactive" v-if="!currentProject">No active project...</div>
                    <div v-if="currentProject">
                      <FirebaseData :path="'votes/' + currentProject" subject="reactions">
                        <template slot-scope="{ data: votes }">
                          Please send your reaction!<br />
                          <strong>{{countReactions(votes)}} received.</strong>
                          <div style="border: 2px solid #666; padding: 2px; width: 320px; margin: 48px auto 0">
                            <div
                              style="height: 24px; background: #666; transform-origin: left; transition: 0.3s transform;"
                              :style="{
                                transform: 'scaleX(' + (countReactions(votes) / screen.reactionTarget) + ')'
                              }"
                            >
                            </div>
                          </div>
                          <br /><br /><br />
                        </template>
                      </FirebaseData>
                    </div>
                  </template>
                </FirebaseData>
              </div>
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
    },
    countReactions(votes) {
      const count = Object.keys(votes || {}).length
      return count
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

