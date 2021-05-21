import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
var firebaseConfig = {
	apiKey: "AIzaSyDNBibTLrGWMVaQ38KrynPB1N04h275Too",
	authDomain: "expense-tracker-f74f5.firebaseapp.com",
	projectId: "expense-tracker-f74f5",
	storageBucket: "expense-tracker-f74f5.appspot.com",
	messagingSenderId: "1019969433088",
	appId: "1:1019969433088:web:69e24657bfa673bf9ef2e5",
};
// Initialize Firebase
const auth = firebase.initializeApp(firebaseConfig);
export default auth;
