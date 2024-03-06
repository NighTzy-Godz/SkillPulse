import "../../assets/css/main_loader.css";
function MainLoader() {
  return (
    <div className="w-full h-dvh grid place-items-center">
      <div className="spinnerContainer">
        <div className="spinner"></div>
        <div className="loader">
          <p className="loading">loading</p>
          <div className="words">
            <span className="word">job posts</span>
            <span className="word">images</span>
            <span className="word">companies</span>
            <span className="word">users</span>
            <span className="word">applicants</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLoader;
