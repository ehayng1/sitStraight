import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
import {
  getFirestore,
  doc,
  getDoc,
  serverTimestamp,
  getDocs,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  updateDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyC5zzgEpNakWPXNGb0BHMUtrVEMsSUxzeY",
  authDomain: "myposture-5466a.firebaseapp.com",
  projectId: "myposture-5466a",
  storageBucket: "myposture-5466a.appspot.com",
  messagingSenderId: "145725455668",
  appId: "1:145725455668:web:e9e2f4832d62ec73adf961",
};
const app = initializeApp(firebaseConfig);
// const storage = getStorage();
const db = getFirestore();

export async function upload(data) {
  // console.log(data);
  // let currDate = new Date().toDateString();
  // const docRef = doc(db, "data", currDate);
  // const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // data for today exists.
    // console.log("Document data:", docSnap.data());
    // data.map(({ key, val }) => ({ [key]: val + docSnap.data().key }));
    let tempData = { ...docSnap.data() };
    for (let key in tempData) {
      if (key !== "timeStamp") {
        tempData[key] = tempData[key] + data[key];
      }
    }
    // console.log("temp: ", tempData);
    await setDoc(doc(db, "data", new Date().toDateString()), tempData);
  } else {
    // data for today does not exist. -> set a new doc.
    await setDoc(doc(db, "data", new Date().toDateString()), data);
  }
}
// document.querySelector("#upload").addEventListener("click", upload);

// load data here
let currDate = new Date().toDateString();
const docRef = doc(db, "data", currDate);
let docSnap;
async function getUserInfo() {
  docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // 60000
    document.getElementById("useTime").innerText =
      (docSnap.data().useTime / 60000).toFixed(2) + " min";
    document.getElementById("break").innerText =
      (docSnap.data().breakTime / 60000).toFixed(2) + " min";
    document.getElementById("bad").innerText =
      (docSnap.data().badPosture / 60000).toFixed(2) + " min";
    document.getElementById("good").innerText =
      (docSnap.data().goodPosture / 60000).toFixed(2) + " min";
  }
}
getUserInfo();
