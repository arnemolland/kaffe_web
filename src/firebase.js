import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
	apiKey: "AIzaSyCim4nFEQd3izENhB9BDdKYCmP2Oz_W6B0",
	authDomain: "kaffe-io.firebaseapp.com",
	databaseURL: "https://kaffe-io.firebaseio.com",
	projectId: "kaffe-io",
	storageBucket: "kaffe-io.appspot.com",
	messagingSenderId: "703638593723"
};
firebase.initializeApp(config);

export default firebase;
