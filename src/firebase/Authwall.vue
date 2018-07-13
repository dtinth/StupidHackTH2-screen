<template>
  <div>
    <p v-if="state === 'checking'">[Checking auth state]</p>
    <p v-if="state === 'unauthenticated'">
      <a href="javascript://" @click="signIn()">Sign In with Facebook</a>
    </p>
    <div v-if="state === 'authenticated'">
      <slot :user='user' />
    </div>
  </div>
</template>

<script>
import firebase from './instance'

export default {
  data() {
    return {
      state: 'checking',
      user: null
    }
  },
  methods: {
    async signIn () {
      var provider = new firebase.auth.FacebookAuthProvider()
      try {
        await firebase.auth().signInWithPopup(provider)
      } catch (e) {
        window.alert('Cannot sign in: ' + e.message)
      }
    }
  },
  mounted() {
    this.unsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.state = 'authenticated'
        this.user = user
      } else {
        this.state = 'unauthenticated'
      }
    })
  },
  destroyed() {
    if (this.unsub) this.unsub()
  }
}
</script>

<style scoped>
p {
  padding: 1em;
  margin: 0;
}
</style>
