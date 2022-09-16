import "./Style.css";
// const backgroundImage = require("../img/background.png").default;

function LandingPage() {
  return (
    <div
      className="landing"
      style={{
        backgroundImage: "url(" + require("../img/background.png") + ")",
      }}
    >
      <a href="/home">Home</a>
      {/* <img src={backgroundImage} alt="icon" /> */}
    </div>
  );
}

export default LandingPage;
