<template>
  <div class="screen">
    <div class="aux-rotator" :class="{ 'is-active': showAux }">
      <div class="aux-transformer" :class="{ 'is-active': showAux }">
        <div
          class="logo"
          :class="{
            'show-logomark': showLogomark,
            'show-logotype': showLogotype
          }"
        >
          <div class="logo-mark">
            <img class="logo-bg" style="left: 373px; top: 13px;" src="../assets/BG.png" />
            <div class="logo-mark-fg">
              <img class="logo-man" style="left: 662px; top: 151px;" src="../assets/MAN.png" />
              <img class="logo-beam" style="left: 31px; top: 159px;" src="../assets/BEAM.png" />
            </div>
          </div>
          <img class="logo-hackathon" style="left: 309px; top: 675px;" src="../assets/HACKATHON.png" />
          <img class="logo-stupid" style="left: 463px; top: 514px;" src="../assets/STUPID.png" />
        </div>
      </div>
    </div>
    <div class="aux-rotator" :class="{ 'is-active': showAux }">
      <div
        class="aux-screen"
        :class="{
          'is-showing': showAux
        }"
      >
        <slot name="screen">
          <div class="default-screen-data" style="background: green">
            This is an auxiliary screen, useful for show some announcement stuff...
          </div>
        </slot>
      </div>
    </div>
    <div
      class="mini-screen"
      :class="{
        'is-showing': !showAux && showLogomark
      }"
    >
      <slot name="mini-screen"></slot>
    </div>
    <div class="curtain" :class="{ 'is-down': curtainDown }">
      <slot name="curtain">
        <div class="default-screen-data">The curtain can display some stuff</div>
      </slot>
    </div>
    <div class="sponsors" :class="{ 'is-showing': showSponsors }">
      <img src="../sponsors/SCBAbacus.png" />
      <img src="../sponsors/Sellsuki.png" />
      <img src="../sponsors/ThoughtWorks.png" />
      <img src="../sponsors/Nextzy.png" />
      <img src="../sponsors/AppMan.png" />
      <img src="../sponsors/LINE.png" />
      <img src="../sponsors/LINK.png" />
    </div>
    <div class="floating" :class="{ 'is-showing': showFloating }">
      <slot name="floating">Some floating information can be displayed.</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // home | curtain | screen | blank
    currentView: String,
    showFloating: Boolean
  },
  data() {
    return {
      ready: false,
    }
  },
  created() {
    setTimeout(() => {
      this.ready = true
    }, 240)
  },
  computed: {
    curtainDown() { return this.currentView === 'curtain' },
    showLogomark() { return this.ready && (this.currentView === 'screen' || this.currentView === 'curtain' || this.currentView === 'home') },
    showLogotype() { return this.ready && this.currentView === 'home' && !this.showFloating },
    showSponsors() { return this.ready && this.currentView === 'home' },
    showAux() { return this.currentView === 'screen' },
  }
}
</script>

<style scoped>
.screen {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: #010729;
  overflow: hidden;
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
  left: 32px;
  right: 32px;
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
  transition-delay: 0s;
}
.aux-transformer.is-active {
  transform: scale(10) translateY(261px) translateZ(0);
  transition-delay: 0.4s;
}

.aux-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: 0.8s transform cubic-bezier(1, 0, 0.33, 1), 0.75s opacity;
  transition-delay: 0.4s;
  transform: rotate(180deg);
}
.aux-screen:not(.is-showing) {
  transform: translateY(-261px) scale(0.1) translateZ(0) rotate(180deg);
  opacity: 0;
  transition-delay: 0s;
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
  transition-delay: 0.4s;
}

.default-screen-data {
  display: flex;
  width: 1920px;
  height: 1080px;
  font-size: 128px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 72px;
  box-sizing: border-box;
}

.floating {
  position: absolute;
  top: 88px;
  left: 240px;
  padding: 48px;
  font-size: 64px;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #5f5;
  box-shadow: 0 0 20px #5f5;
  border-radius: 24px;
  transition: 0.8s transform cubic-bezier(1, 0, 0.33, 1), 0.75s opacity;
  transform: translateX(720px) translateX(-50%) translateY(720px)
    translateY(-90%) translateZ(0);
}
.floating:not(.is-showing) {
  transform: translateX(1920px) rotate(90deg) translateX(50%) translateZ(0);
}

.mini-screen {
  position: absolute;
  width: 192px;
  height: 108px;
  top: 224px;
  left: 864px;
  color: #888;
  font-size: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: 0.3s opacity;
  opacity: 1;
  transition-delay: 2s;
}
.mini-screen:not(.is-showing) {
  opacity: 0;
  transition-delay: 0s;
}
</style>
