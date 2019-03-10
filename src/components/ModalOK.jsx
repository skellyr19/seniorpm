import React from "react";
import jquery from "jquery";

class ModalOK extends React.Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
  }

  show() {
    jquery(this.refs.modal).modal("show");
  }

  render() {
    return (
      <div
        id="modalOK"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        ref="modal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body d-block text-center py-3">
              <h3>Thank you!</h3>
              <p className="lead">
                Your submission was successful. Check your email for further
                correspondence from us.
              </p>
              <button className="btn btn-outline-primary" data-dismiss="modal">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalOK;
