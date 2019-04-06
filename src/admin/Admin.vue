<template>
<div>
  <button @click="refresh">Refresh</button>
  <button @click="bye">Bye</button>
  <table>
    <tbody>
      <tr v-for="(project, key) in projects" :key="key">
        <th>{{key}}</th>
        <td nowrap :style="{background: key === next ? color : ''}">{{project.title}}</td>
        <td nowrap>
          <button @click="upNext(key, project.title)">Upnext</button>
          <button @click="present(key)">Start present</button>
          <button @click="vote(key)">Start vote</button>
          <button @click="win(key, project.title)">You win!</button>
        </td>
        <template v-for="(catData, catId) in categories">
          <td nowrap :key="catId + 'a'">{{catData.symbol}}</td>
          <td align="right" :key="catId + 'b'">{{votesFor(key, catId)}}</td>
          <td align="right" :key="catId + 'c'" class="pcntg">{{votesForPct(key, catId)}}%</td>
        </template>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { firebase } from '../firebase'
export default {
  data() {
    return { projects: {}, next: '', color: 'green', votes: {}, categories: {} }
  },
  methods: {
    async loadStuff() {
      const projects = (await firebase.database().ref('/projects').once('value')).val()
      this.projects = projects
      const categories = (await firebase.database().ref('/categories').once('value')).val()
      this.categories = categories
      const votes = (await firebase.database().ref('/votes').once('value')).val()
      this.votes = votes
    },
    votesFor(projectId, catId) {
      const votes = this.votes[projectId] || {}
      return Object.keys(votes).filter(k => votes[k] === catId).length
    },
    votesForPct(projectId, catId) {
      const votes = this.votes[projectId] || {}
      return (Object.keys(votes).filter(k => votes[k] === catId).length / Object.keys(votes).length * 100).toFixed(2)
    },
    refresh() {
      this.loadStuff()
    },
    present(p) {
      firebase.database().ref(`/currentProject`).set(p)
      firebase.database().ref(`/display/currentView`).set('home')
      firebase.database().ref(`/display/votingMode`).set(true)
      this.color = 'green'
      this.next = p
    },
    vote(p) {
      firebase.database().ref(`/currentProject`).set(p)
      firebase.database().ref(`/display/currentView`).set('screen')
      firebase.database().ref(`/display/votingMode`).set(true)
      this.color = 'red'
      this.next = p
    },
    upNext(p, pn) {
      firebase.database().ref(`/display/floating`).set(`Up next:<br /><strong style="font-size:2em">${pn}</strong><br /><br />&rarr; bit.ly/stupid-reaction`)
      firebase.database().ref(`/display/currentView`).set('curtain')
      firebase.database().ref(`/display/votingMode`).set(false)
      this.color = 'blue'
      this.next = p
    },
    win(p, pn) {
      firebase.database().ref(`/display/floating`).set(`You win!!<br /><strong style="font-size:2em">${pn}</strong>`)
      firebase.database().ref(`/display/currentView`).set('home')
      firebase.database().ref(`/display/votingMode`).set(false)
      this.color = 'blue'
      this.next = p
    },
    bye() {
      firebase.database().ref(`/currentProject`).set(null)
      firebase.database().ref(`/display/currentView`).set('home')
      this.next = p
    }
  },
  async created() {
    this.loadStuff()
  }
}
</script>

<style>
.pcntg::before {
  content: '(';
}
.pcntg::after {
  content: ')';
}
</style>
