import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid h-100 px-0 my-auto">
        <div className="row collapse show d-flex h-100 position-relative sidebar-collapse">
          <div className="col d-flex flex-column">
            <main className="p-4 flex-fill d-flex">
              <div className="row flex-fill align-items-center text-center">
                <div className="col">
                  <h1 className="display-2 font-weight-bold mb-0">
                    404
                    <br />
                    <span className="lnr lnr-paw" />
                  </h1>
                  <h6 className="text-uppercase">Page not found</h6>
                  <p className="text-muted">
                    The page you are looking for is not here. <br />
                    It may have been moved or doesn't exist.{" "}
                    <span aria-label="ghosty in the machine" role="img">
                      👻
                    </span>
                  </p>
                  <a href="./" className="btn btn-lg btn-primary">
                    Return Home
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
