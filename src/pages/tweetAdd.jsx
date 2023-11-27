import { useContext, useEffect } from "react";
import TweetList from "../components/TweetList";
import MaximumCaractheres from "../components/MaximumCaractheres";
import { TweetsAddContext } from "../context/contextAdd";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";
import { useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebaseConfig";

function TweetAdd() {
  const [getTweetNow, setGetTweetNow] = useState(false);
  const [tweetsFire, setTweetsFire] = useState([]);
  const { post, setPost } = useContext(TweetsAddContext);
  const { buttonDisabled } = useContext(TweetsAddContext);
  const { login } = useContext(TweetsAddContext);
  const { userLog, setUserLog } = useContext(TweetsAddContext);
  const { profileNameText } = useContext(TweetsAddContext);

  const inputPostRef = useRef(null);
  const collectionRef = collection(db, "tweets");
  const datenow = new Date();
  let data;

  onAuthStateChanged(authentication, (user) => {
    setUserLog(user);
  });

  const getTweetsFirebase = async () => {
    let q1 = query(collectionRef, orderBy("date", "desc"), limit(50));
    data = await getDocs(q1);
    setTweetsFire(
      data.docs.map((tweet) => ({ ...tweet.data(), id: tweet.id }))
    );
  };

  const sendTweetsFirebase = async () => {
    const sendTweet = await addDoc(collectionRef, {
      userName: profileNameText
        ? login
        : userLog.displayName
        ? userLog.displayName
        : userLog.email,
      content: post.textpostObj,
      date: JSON.stringify(datenow),
    });
    setGetTweetNow(!getTweetNow);
    inputPostRef.current.value = "";
    return sendTweet;
  };

  useEffect(() => {
    getTweetsFirebase();
  }, []);

  useEffect(() => {
    getTweetsFirebase();
  }, [getTweetNow]);

  const handleTextArea = (e) => {
    setPost({ textpostObj: e.target.value });
  };

  return (
    <>
      <div className="postBox">
        <textarea
          className="textareastyle"
          type="text"
          ref={inputPostRef}
          onChange={handleTextArea}
          placeholder={"What you have in mind..."}
        ></textarea>

        <button
          id="button"
          style={{ opacity: buttonDisabled && "0.5" }}
          disabled={post.textpostObj.length > 140 || buttonDisabled}
          onClick={sendTweetsFirebase}
          className="buttontweet"
        >
          Tweet
        </button>
        {post.textpostObj.length > 140 && <MaximumCaractheres />}
      </div>

      <div className="listContainer">
        {tweetsFire.map((i, index) => (
          <TweetList
            key={index}
            nameFire={i.userName}
            dateFire={i.date}
            contentFire={i.content}
          />
        ))}
      </div>
    </>
  );
}

export default TweetAdd;
