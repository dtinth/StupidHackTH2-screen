<template>
  <div>
    <Authwall>
      <template slot-scope="{ user }">
        <div class="greeting">
          Welcome, <b>{{ user.displayName }}</b>!
          <a @click="signOut()" href="javascript://">[Sign out]</a>
        </div>
        <FirebaseData path="currentProject" subject="presentation state">
          <template slot-scope="{ data: currentProject }">
            <div class="inactive" v-if="!currentProject">No active project...</div>
            <div v-if="currentProject">
              <FirebaseData :path="'projects/' + currentProject" subject="project information">
                <template slot-scope="{ data: project }">
                  <div class="vote-title">
                    Please give your reaction to <b>{{project.title}}</b>
                  </div>
                </template>
              </FirebaseData>
              <FirebaseData path="categories" subject="reaction list">
                <template slot-scope="{ data: categories }">
                  <FirebaseData :path="'votes/' + currentProject + '/' + user.uid" subject="reaction data">
                    <template slot-scope="{ data: reaction }">
                      <ul class="reaction-list">
                        <li v-for="(category, categoryId) in categories" :key="categoryId">
                          <button :class="{ active: reaction === categoryId }" @click="give(user.uid, currentProject, categoryId)">
                            <img :src="category.icon" :alt="category.symbol" />
                          </button>
                        </li>
                      </ul>
                    </template>
                  </FirebaseData>
                </template>
              </FirebaseData>
            </div>
          </template>
        </FirebaseData>
      </template>
    </Authwall>
  </div>
</template>

<script>
import { firebase, Authwall, FirebaseData } from '../firebase'
export default {
  methods: {
    signOut() {
      firebase.auth().signOut()
    },
    async give(uid, project, reaction) {
      try {
        await firebase.database().ref(`/votes/${project}/${uid}`).set(reaction)
      } catch (e) {
        window.alert(`Cannot save: ${e.message}`)
      }
    }
  },
  components: {
    Authwall,
    FirebaseData
  }
}
</script>

<style scoped>
.inactive {
  text-align: center;
  padding: 1em;
}
.greeting {
  text-shadow: 0 1px 5px black;
  background-image: linear-gradient(-90deg, #ffab47 0%, #f053d5 100%);
  padding: 0.5em;
}
.vote-title {
  text-align: center;
  padding: 1em;
}
.vote-title b {
  display: block;
}
.reaction-list {
  display: block;
  list-style: none;
  text-align: center;
  padding: 0;
}
.reaction-list li {
  display: inline-block;
}
.reaction-list button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1em;
  padding: 1em;
  margin: 0.5em;
}
.reaction-list button.active {
  background-image: linear-gradient(135deg, #ffab47 0%, #f053d5 100%);
}
.reaction-list img {
  width: 7em;
  height: 7em;
}
</style>
