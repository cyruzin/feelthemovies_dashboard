import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Content = (props) => (
  <div>
    <div className="d-flex align-items-stretch">
      <Sidebar />
      <div className="page-content">
        {props.children}
        <Footer />
      </div>
    </div>
  </div>
);

export default Content;
