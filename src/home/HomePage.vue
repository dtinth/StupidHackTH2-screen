<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> -->
    <Authwall>
      Oh hi!
    </Authwall>
  </div>
</template>

<script>
import Authwall from '../firebase/Authwall'
export default {
  data() {
    return {
      status: 'meow'
    }
  },
  components: {
    Authwall
  }
}
</script>
