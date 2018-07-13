import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCRRP6g0vMhR194iGM9pzDQ-C17cSGPOjo',
  authDomain: 'the-stupid-hackathon-thailand.firebaseapp.com',
  databaseURL: 'https://the-stupid-hackathon-thailand.firebaseio.com',
  projectId: 'the-stupid-hackathon-thailand',
  storageBucket: 'the-stupid-hackathon-thailand.appspot.com',
  messagingSenderId: '973484319476'
}
firebase.initializeApp(config)

Object.assign(window, {
  firebase,
  signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }
})

export default firebase
