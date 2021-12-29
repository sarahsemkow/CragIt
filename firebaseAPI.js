// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYrhJ88tgGzL7p0EY7Iz8d-48vtpsL3vI",
  authDomain: "cragit-125cb.firebaseapp.com",
  projectId: "cragit-125cb",
  storageBucket: "cragit-125cb.appspot.com",
  messagingSenderId: "700639582665",
  appId: "1:700639582665:web:bf48083f3338fce246b018",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// const analytics = getAnalytics(app);
const auth = firebase.auth();
