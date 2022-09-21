import "./Style.css";
import logo from "../img/soy-henry-logo.jpg";

function LandingPage() {
  return (
    <div className="landing">
      <img className="logo" src={logo} alt="logo" />
      <div className="titleBox">
        <div className="titleCard">
          <h2 className="text">
            This is a project for "Soy Henry" programing bootcamp for full-stack
          </h2>
        </div>
        <p></p>
        <a className="homeBtn" href="/home">
          <strong>Home</strong>
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
