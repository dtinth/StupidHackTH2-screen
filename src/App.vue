<template>
  <div @click="clicked($event)">
    <Layout :currentView="currentView" :showFloating="showFloating">
      <template slot="mini-screen">
        <span>ngah</span>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './Layout'

export default {
  data() {
    return {
      // home | curtain | screen | blank
      currentView: 'home',
      showFloating: false,
    }
  },
  methods: {
    clicked(e) {
      const targetView = e.shiftKey ? (!e.ctrlKey ? 'curtain' : 'blank') : e.ctrlKey ? 'screen' : 'home'
      if (this.currentView === targetView) {
        this.showFloating = !this.showFloating
      } else {
        this.currentView = targetView
      }
    }
  },
  components: {
    Layout
  }
}
</script>
