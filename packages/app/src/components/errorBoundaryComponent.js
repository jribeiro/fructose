import React from "react";
import PropTypes from "prop-types";
import ErrorView from "./errorViewComponent";

export default class ErrorBoundary extends React.Component {
  constructor({ events, socket }) {
    super();
    this.events = events;
    this.socket = socket;
    this.state = {
      error: null,
      component: null
    };

    this.socket.on("load-component-in-app", component => {
      this.state.error = null;
      this.state.component = component;
    });

    this.events.on("load-component", component => {
      this.state.error = null;
      this.state.component = component;
    });
  }

  componentDidCatch(error) {
    this.setState({
      error
    });

    const errorObject = {
      component: this.state.component,
      error: error.message
    };

    this.socket.emit("component-error", errorObject);
  }

  render() {
    if (this.state.error) {
      return <ErrorView error={this.state.error} />;
    }

    return this.props.children; //eslint-disable-line
  }
}

ErrorBoundary.propTypes = {
  events: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired
  }).isRequired
};
