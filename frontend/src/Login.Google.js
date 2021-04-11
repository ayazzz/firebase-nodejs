import React from "react";

import { useHistory } from "react-router-dom";
import { auth, firebase } from "./firebase";

export default function LoginGoogle() {
  const history = useHistory();
  function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    //2 - create the popup signIn
    auth.signInWithPopup(provider)
      .then(async (result) => {
        console.log(result);

        /** @type {firebase.auth.OAuthCredential} */
        //const credential = result.credential;

        const token = await auth?.currentUser?.getIdToken(true);
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@token", token);
          //6 - navigate user to the book list
          history.push("/book-list");
        }
      }).catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        console.log(error);
      });
  }
  return (
    <div>
      <h3>Login with Google</h3>
      <button onClick={googleLogin} className="login-button btn-google">
        GOOGLE
      </button>
    </div>
  );
}

