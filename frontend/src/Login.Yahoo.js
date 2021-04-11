import React from "react";

import { useHistory } from "react-router-dom";
import { auth, firebase } from "./firebase";

export default function LoginYahoo() {
  const history = useHistory();
  function yahooLogin() {
    //1 - init Yahoo Auth Provider
    const provider = new firebase.auth.OAuthProvider('yahoo.com');
    provider.setCustomParameters({
      // Prompt user to re-authenticate to Yahoo.
      prompt: 'login'
    });
    //2 - create the popup signIn
    auth.signInWithPopup(provider)
      .then(async (result) => {
        // IdP data available in result.additionalUserInfo.profile
        // ...
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
      })
      .catch((error) => {
        // Handle error.
        console.log(error);
      });
  }
  return (
    <div>
      <h3>Login with Yahoo</h3>
      <button onClick={yahooLogin} className="login-button btn-yahoo">
        Yahoo
      </button>
    </div>
  );
}

