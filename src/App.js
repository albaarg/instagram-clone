import React, { useState, useEffect } from "react";
import "./App.css";
import { Post } from "./Components/Posts/Posts";
import { db, auth } from "./Components/firebase/firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import { ImageUpload } from "./Components/ImageUpload/ImageUpload.";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  // const [user, setUser] = useState()

  const [user] = useAuthState(auth);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        let uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user is not logged");
      }
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ post: doc.data(), id: doc.id }))
        );
      });
  }, []);

  const signUp = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        user.updateProfile({
          displayName: username,
        });
        console.log(user);
        console.log(user.displayName);
        setOpen(false);
        // ...
      })
      .catch((error) => {
        // ..
      });

    setUsername("");
    setPassword("");
    setEmail("");
  };

  const signIn = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setOpenSignIn(false);
      })
      .catch((error) => {});
    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signUp">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="signUp">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <div>
            <Button
              className="upload-btn"
              variant="outlined"
              onClick={() => setShow(!show)}
            >
              Upload Photo{" "}
            </Button>
            <Button onClick={() => auth.signOut()}>Log Out</Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      {show && (
        <ImageUpload
          show={show}
          setShow={setShow}
          username={user.displayName}
        />
      )}

      <div className="app-posts ">
        <div className="app-postsRight">
          {posts.map(({ post, id }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
