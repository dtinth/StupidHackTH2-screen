<template>
  <div
    class="screen"
  >
    <div class="aux-rotator" :class="{ 'is-active': showAux }">
      <div class="aux-transformer" :class="{ 'is-active': showAux }">
        <div
          class="logo"
          :class="{
            'show-logomark': showLogomark,
            'show-logotype': showLogomark && showLogotype && !showAux && !curtainDown
          }"
        >
          <!-- <img class="logo-full" style="opacity: 0.5;" src="./assets/full-logo.png" /> -->
          <div class="logo-mark">
            <img class="logo-bg" style="left: 373px; top: 13px;" src="./assets/BG.png" />
            <div class="logo-mark-fg">
              <img class="logo-man" style="left: 662px; top: 151px;" src="./assets/MAN.png" />
              <img class="logo-beam" style="left: 31px; top: 159px;" src="./assets/BEAM.png" />
            </div>
          </div>
          <img class="logo-hackathon" style="left: 309px; top: 675px;" src="./assets/HACKATHON.png" />
          <img class="logo-stupid" style="left: 463px; top: 514px;" src="./assets/STUPID.png" />
        </div>
      </div>
    </div>
    <div class="curtain" :class="{ 'is-down': curtainDown }">
      meow
    </div>
    <div class="aux-rotator" :class="{ 'is-active': showAux }">
      <div
        class="aux-screen"
        :class="{
          'is-showing': showAux
        }"
      >
        This is an auxiliary screen, useful for show some announcement stuff...
      </div>
    </div>
    <div
      class="sponsors"
      :class="{
        'is-showing': showSponsors && !showAux && !curtainDown
      }"
    >
      <img src="./assets/sponsors/SCBAbacus.png" />
      <img src="./assets/sponsors/Sellsuki.png" />
      <img src="./assets/sponsors/ThoughtWorks.png" />
      <img src="./assets/sponsors/Nextzy.png" />
      <img src="./assets/sponsors/AppMan.png" />
      <img src="./assets/sponsors/LINK.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      curtainDown: false,
      showLogomark: false,
      showLogotype: false,
      showSponsors: false,
      showAux: false,
    }
  },
  created() {
    setTimeout(() => {
      this.showLogomark = true
      this.showLogotype = true
      this.showSponsors = true
    }, 640)
  },
  components: {
  }
}
</script>

<style scoped>
.screen {
  width: 1920px;
  height: 1080px;
  background: #010729;
}
.curtain {
  background-image: linear-gradient(-90deg, #ffab47 0%, #f053d5 100%);
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%) translateY(24px) translateZ(0);
  transition: 0.75s transform cubic-bezier(1, 0, 0.33, 1);
}
.curtain.is-down {
  transform: translateY(0) translateY(0) translateZ(0);
}

.sponsors {
  position: absolute;
  bottom: 48px;
  left: 64px;
  right: 64px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: 1.4s transform ease-in-out;
}
.sponsors:not(.is-showing) {
  transform: translateY(400px);
}
.sponsors img {
  display: block;
}

.logo {
  position: absolute;
  top: 64px;
  left: 180px;
  width: 1560px;
  height: 1026px;
}
.logo img {
  position: absolute;
  display: block;
  transform: translateZ(0);
}
.logo-mark,
.logo-mark-fg {
  position: absolute;
  width: 1560px;
  height: 1026px;
  top: 0;
  left: 0;
  transform: translateZ(0);
}
.logo-bg {
  transition: 0.4s transform cubic-bezier(0.44, 0, 0.36, 1.25),
    0.4s opacity linear;
  transform: scale(1) translateZ(0);
  opacity: 1;
}
.logo:not(.show-logomark) .logo-bg {
  transform: scale(0.01) translateZ(0);
  opacity: 0;
}
.logo-mark-fg {
  transition: 0.5s transform ease-out;
  transition-delay: 0.2s;
  transform: translateY(0%) translateZ(0);
}
.logo:not(.show-logomark) .logo-mark-fg {
  transform: translateY(100%) translateZ(0);
}
.logo-beam {
  transition: 0.2s transform ease-out;
  transition-delay: 0.5s;
  transform: scaleX(1) translateZ(0);
}
.logo:not(.show-logomark) .logo-beam {
  transform: scaleX(0.01) translateZ(0);
}
.logo-stupid {
  transition: 0.75s transform cubic-bezier(1, 0, 0.33, 1);
  transition-delay: 0.3s;
  transform: translateY(0) translateZ(0);
}
.logo:not(.show-logotype) .logo-stupid {
  transform: translateY(500px) translateZ(0);
  transition-delay: 0s;
}
.logo-hackathon {
  transition: 0.75s transform cubic-bezier(1, 0, 0.33, 1);
  transition-delay: 0.4s;
  transform: translateY(0) translateZ(0);
}
.logo:not(.show-logotype) .logo-hackathon {
  transform: translateY(500px) translateZ(0);
  transition-delay: 0.1s;
}

.aux-transformer {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  transform: translateY(0);
  transition: 0.8s transform cubic-bezier(1, 0, 0.33, 1), 0.75s opacity;
}
.aux-transformer.is-active {
  transform: scale(10) translateY(261px) translateZ(0);
}

.aux-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: lime;
  opacity: 1;
  transition: 0.8s transform cubic-bezier(1, 0, 0.33, 1), 0.75s opacity;
  transform: rotate(180deg);
}
.aux-screen:not(.is-showing) {
  transform: translateY(-261px) scale(0.1) translateZ(0) rotate(180deg);
  opacity: 0;
}

.aux-rotator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: rotate(0deg);
  transition: 0.8s transform cubic-bezier(1, 0, 0.33, 1), 0.75s opacity;
}
.aux-rotator.is-active {
  transform: rotate(180deg);
}
</style>
