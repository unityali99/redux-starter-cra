import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";

class componentName extends Component {
  static contextType = StoreContext;
  componentDidMount() {
    console.log(this.context);
  }
  render() {
    return <div>{"Bugs"}</div>;
  }
}

export default componentName;
