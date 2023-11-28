import { useState, useRef, useContext } from "react";
import { authentication, storage, provider } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TweetsAddContext } from "../context/contextAdd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PictureLogin from "../components/PictureLogin";

function Authetication() {
  const [registerName, setRegisterName] = useState(null);
  const [registerPass, setRegisterPass] = useState(null);
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [image, setImage] = useState(null);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const { photoURL, setPhotoURL } = useContext(TweetsAddContext);
  const { userLog, setUserLog } = useContext(TweetsAddContext);
  const navigate = useNavigate();
  const inputAuthRef = useRef(null);
  const inputAuthPassRef = useRef(null);
  const inputSignRef = useRef(null);
  const inputSignPassRef = useRef(null);

  onAuthStateChanged(authentication, (user) => {
    setUserLog(user);
  });

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        authentication,
        registerName,
        registerPass
      );
      inputSignRef.current.value = "";
      inputSignPassRef.current.value = "";
      navigate("/home");
    } catch (error) {
      console.log("error in register function ", error);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(authentication, loginName, loginPass);

      inputAuthRef.current.value = "";
      inputAuthPassRef.current.value = "";
      navigate("/home");
    } catch (error) {
      alert("Invalid UserName or Password");
      console.log("error in login function", error);
      inputAuthRef.current.value = "";
      inputAuthPassRef.current.value = "";
    }
  };

  const logout = async () => {
    await signOut(authentication);
  };

  const signInGoogle = () => {
    signInWithPopup(authentication, provider)
      .then(() => {
        navigate("/home");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploadPhoto(!uploadPhoto);
    upload();
  };

  const upload = async () => {
    const imageRef = ref(storage, `images/${image.name}`);
    const snapShot = await uploadBytes(imageRef, image);
    const photoURL = await getDownloadURL(imageRef);

    updateProfile(userLog, { photoURL });
    setPhotoURL(photoURL);
  };

  useEffect(() => {
    if (userLog?.photoURL) {
      setPhotoURL(userLog.photoURL);
    } else {
      setPhotoURL(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      );
    }
  }, [userLog]);

  return (
    <>
      <h3 className="h3-auth">LogIn</h3>
      <label className="label-auth" htmlFor="auth">
        User Name
      </label>
      <label className="label-authPass" htmlFor="authPass">
        Password
      </label>
      <input
        className="AuthInputAuth"
        id="auth"
        ref={inputAuthRef}
        onChange={(e) => {
          setLoginName(e.target.value);
        }}
      />
      <input
        className="AuthInputPass"
        id="authPass"
        type={"password"}
        ref={inputAuthPassRef}
        onChange={(e) => {
          setLoginPass(e.target.value);
        }}
      />

      <h3 className="h3-signUp">SignUp</h3>
      <label className="label-sign" htmlFor="sign">
        User Name
      </label>
      <label className="label-signPass" htmlFor="signPass">
        Password
      </label>
      <input
        className="SignInputName"
        id="sign"
        ref={inputSignRef}
        onChange={(e) => {
          setRegisterName(e.target.value);
        }}
      />
      <input
        className="SignInputPass"
        id="signPass"
        type={"password"}
        ref={inputSignPassRef}
        onChange={(e) => {
          setRegisterPass(e.target.value);
        }}
      />

      <button className="buttonLogin" onClick={login}>
        Login
      </button>
      <button className="buttonSign" onClick={register}>
        SignUp
      </button>
      <button className="buttonGoogle" onClick={signInGoogle}>
        {" "}
        Login with Google
      </button>
      <button
        className="buttonLogout"
        style={{ opacity: !userLog && "0.5" }}
        disabled={!userLog}
        onClick={logout}
      >
        Logout
      </button>

      {userLog ? (
        <h3 className="h3-welcomeLogged">
          Welcome {userLog.displayName ? userLog.displayName : userLog.email}{" "}
        </h3>
      ) : (
        <h3 className="h3-welcomeUnLogged">Please LogIn to acess the APP</h3>
      )}

      {userLog && <img className="pictureLogin" src={photoURL}></img>}

      {userLog && (
        <PictureLogin
          functionChange={handleImageChange}
          functionUpload={handleUpload}
        />
      )}
    </>
  );
}

export default Authetication;
