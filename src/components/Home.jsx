import React from "react";
import { Link } from "react-router-dom";
import "././style.css";

const Home = () => (
  <div className="d-flex flex-column h-100">
    <div className="row">
      <div className="col-12 col-lg-5 mx-auto">
        <img className="img-fluid" alt=".." src="Images/Me.jpg" />
      </div>
    </div>
    <p className="text-center">
      Hello... and welcome to the senior project management app!
    </p>
    {!localStorage.getItem("currentUserId") ? (
      <Link to={"/login"} className="btn btn-primary btn-lg">
        Login
      </Link>
    ) : (
      ""
    )}
  </div>
);

export default Home;
