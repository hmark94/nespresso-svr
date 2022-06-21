import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoQQnMzSx3fAnfwXpMgofy3kWvYisKmcA",
  authDomain: "nespresso-svr.firebaseapp.com",
  projectId: "nespresso-svr",
  storageBucket: "nespresso-svr.appspot.com",
  messagingSenderId: "1084958561072",
  appId: "1:1084958561072:web:1159511351319d2388eef5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
