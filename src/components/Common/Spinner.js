import React from "react";
import SpinnerGIF from "../../assets/img/Loading.gif";

function Spinner() {
  return (
    <div>
      <section className="no-padding-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src={SpinnerGIF} alt="Loading" width="60" height="60" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Spinner;
