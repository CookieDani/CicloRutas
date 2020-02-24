import firebase from 'firebase'
import 'firebase/firestore'

import firbaseConfig from './firebaseConfig'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()