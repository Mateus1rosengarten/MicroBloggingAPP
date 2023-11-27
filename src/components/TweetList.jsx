import "./TweetList.css";

function TweetList({ nameFire, contentFire, dateFire }) {
  return (
    <>
      <div className="postContainer">
        <span className="namestyle">{nameFire}</span>
        <p className="datestyle">{dateFire}</p>
        <p className="textpoststyle">{contentFire}</p>
      </div>
    </>
  );
}

export default TweetList;
