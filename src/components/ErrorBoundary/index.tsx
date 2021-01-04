import React, { Component } from 'react';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: React.ReactNode;
}

interface IError {
  stack?: string;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: IError) {
    return { hasError: true };
  }

  componentDidCatch(error: IError, errorInfo: React.ErrorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
