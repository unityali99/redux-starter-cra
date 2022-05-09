import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";

class componentName extends Component {
  static contextType = StoreContext;

  state = { bugs: [] };
  componentDidMount() {
    const store = this.context;

    this.unSubscribe = store.subscribe(() => {
      const bugInStore = store.getState().entities.bugs.list;
      if (bugInStore !== this.state) this.setState({ bugs: bugInStore });
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }
  render() {
    return (
      <ul>
        {this.state.bugs.map((bug) => (
          <li key={bug.id}>bug.description</li>
        ))}
      </ul>
    );
  }
}

export default componentName;
