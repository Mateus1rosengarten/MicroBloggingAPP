function PictureLogin({ functionChange, functionUpload }) {
  return (
    <>
      <input
        className="inputImage"
        onChange={functionChange}
        type="file"
        id="inputfile"
      ></input>
      <button className="buttonImage" onClick={functionUpload}>
        Upload
      </button>
    </>
  );
}

export default PictureLogin;
