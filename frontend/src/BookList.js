import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";


function LoggedIn(props) {
  const books = props.books;

  return (
    <div className="container">
      <h1>BookList</h1>
      {/* map the book list to show book name and image */}
      {books.map((book) => (
        <div key={book.id} className="booklist">
          <img className="image" alt={book} src={book.image} />
          <h3>{book.name}</h3>
        </div>
      ))}
    </div>
  );
}

function NotLoggedIn(props) {
  const errorMessage = props.message
  return (
    <div>
      <label>You cannot access this page: {errorMessage}</label>
    </div>
  );
}

export default function BookList() {
  const history = useHistory();
  //create state to store our book list
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      //fetch the book list

      const request = await fetch("http://localhost:4000/books", {
        //use the authorization
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@token"),
        },
      });

      setStatus(request.status)
      const json = await request.json()
      if (request.status !== 200) {
        setMessage(json.message)
      } else {
        //set the book list on state
        setBooks(json.books);
      }
    }
    //invoke the function
    loadBooks();
  }, []);

  auth.onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then((idToken) => {
        if (localStorage.getItem("@token") !== idToken) {
          console.log('update auth token');
          localStorage.setItem("@token", idToken);
        }
      }).catch((err) => {
        console.log(err);
        localStorage.removeItem("@token");
        history.push("/login");
      });
    } else {
      localStorage.removeItem("@token");
      history.push("/login");
    }
  });

  if (status === 200) {
    return <LoggedIn books={books} />
  } else {
    return <NotLoggedIn message={message} />
  }
}
