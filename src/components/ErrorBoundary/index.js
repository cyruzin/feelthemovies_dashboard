import React, { Component } from "react";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <div>
            <h1>Something went wrong :(</h1>
            <h4>Please, check the logs</h4>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
