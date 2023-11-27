import { useState, createContext } from "react";
export const TweetsAddContext = createContext();
export const FunctionContext = createContext();

function AddContext({ children }) {
  const [item, setItem] = useState([]);
  const [post, setPost] = useState({
    nameObj: " ",
    dateObj: " ",
    textpostObj: " ",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [login, setLogin] = useState("");
  const [userLog, setUserLog] = useState({});
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [profileNameText, setProfileNameText] = useState(false);

  return (
    <TweetsAddContext.Provider
      value={{
        item,
        setItem,
        post,
        setPost,
        buttonDisabled,
        setButtonDisabled,
        login,
        setLogin,
        userLog,
        setUserLog,
        photoURL,
        setPhotoURL,
        profileNameText,
        setProfileNameText,
      }}
    >
      {children}
    </TweetsAddContext.Provider>
  );
}

export default AddContext;
