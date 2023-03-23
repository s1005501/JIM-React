// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// 引入
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBtXgcZIQsZXM2Mvw8LqZcyRa5o6rzoBi8',
  authDomain: 'jim-d4fd3.firebaseapp.com',
  projectId: 'jim-d4fd3',
  storageBucket: 'jim-d4fd3.appspot.com',
  messagingSenderId: '414655457412',
  appId: '1:414655457412:web:6893f24f4a05769011bad1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// 匯出
export const googleAuth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
