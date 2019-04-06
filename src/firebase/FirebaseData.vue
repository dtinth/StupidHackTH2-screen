<template>
  <div>
    <p v-if="state === 'loading'">[Loading {{subject || 'data'}}...]</p>
    <p v-if="state === 'error'" class="error">
      {{error.message}}
    </p>
    <div v-if="state === 'completed'">
      <slot :data='data' />
    </div>
  </div>
</template>

<script>
import firebase from './instance'

export default {
  props: {
    subject: String,
    path: String
  },
  data() {
    return {
      state: 'loading',
      error: null,
      data: null
    }
  },
  methods: {
    listen(path) {
      if (this.firebaseRef) this.firebaseRef.off('value', this.listener)
      this.state = 'loading'
      this.listener = d => {
        this.data = d.val()
        this.state = 'completed'
      }
      this.firebaseRef = firebase.database().ref(path)
      this.firebaseRef.on('value', this.listener, (e) => {
        this.error = e
        this.state = 'error'
      })
    }
  },
  watch: {
    path(newPath) {
      this.listen(newPath)
    }
  },
  mounted() {
    this.listen(this.path)
  },
  destroyed() {
    if (this.firebaseRef) this.firebaseRef.off('value', this.listener)
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
p.error {
  color: #fbb;
}
</style>
