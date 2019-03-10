import React from "react";
import "././style.css";

const Home = () => (
  <div className="d-flex flex-column h-100">
    <div className="row">
      <div className="col-12 col-md-6 mx-auto">
        <img className="img-fluid " src="Images/Me.jpg" />
      </div>
    </div>
    <p className="text-center">Welcome to the senior project management app!</p>
    <a href="./" className="btn btn-lg btn-primary">
      Login
    </a>
  </div>
);

export default Home;
