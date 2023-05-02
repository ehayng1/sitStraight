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
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

let close = 0;
let upDown = 0;
let turn = 0;
let lean = 0;
const docRef = collection(db, "data");
const q = query(docRef, orderBy("timeStamp"), limit(7));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  let data = doc.data();
  // console.log(doc.id, " => ", data);
  close = close + data.countDistance;
  upDown = upDown + data.countHeadUporDown;
  turn = turn + data.countHeadTurned;
  lean = lean + data.countHeadTowardShoulder;
});
// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [
      "Too close to screen",
      "Head too up or down",
      "Head turned too much",
      "Head leaned to shoulder",
    ],
    datasets: [
      {
        // data: [55, 30, 23, 42],
        data: [close, upDown, turn, lean],
        // backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e"],

        backgroundColor: ["#f6c23e", "#e74a3b", "#3498db", "#8e44ad"],
        // backgroundColor: ["#e74a3b", "#FFA500", "#FFFF00", "#5a5c69"],
        hoverBackgroundColor: ["#e0ac1c", "#c42720", "#2c6dad", "#6b3080"],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: "#dddfeb",
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: true,
      caretPadding: 10,
    },
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  },
});
