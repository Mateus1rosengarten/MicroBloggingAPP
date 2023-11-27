import { useRef, useContext } from "react";
import { TweetsAddContext } from "../context/contextAdd";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebaseConfig";

function Profile() {
  const loginRef = useRef();
  const { login, setLogin } = useContext(TweetsAddContext);
  const { profileNameText, setProfileNameText } = useContext(TweetsAddContext);
  const { userLog, setUserLog } = useContext(TweetsAddContext);

  onAuthStateChanged(authentication, (user) => {
    setUserLog(user);
  });

  const loginHandle = (event) => {
    setLogin(event.target.value);
    setProfileNameText(false);
  };

  const saveHandle = () => {
    setLogin(loginRef.current.value);
    setProfileNameText(true);
  };

  return (
    <>
      <h3 className="h3-profilepage">Profile</h3>
      <label className="label-login" htmlFor="login">
        User Name
      </label>
      <input
        onChange={loginHandle}
        type="text"
        className="loginInput"
        id="login"
        ref={loginRef}
        placeholder={
          profileNameText
            ? login
            : userLog.displayName
            ? userLog.displayName
            : userLog.email
        }
      />
      <button onClick={saveHandle} className="buttonsave">
        Save
      </button>

      {profileNameText ? (
        <h3 className="h3-profilepageText"> Pofile Name changed to {login} </h3>
      ) : (
        <></>
      )}
    </>
  );
}

export default Profile;
