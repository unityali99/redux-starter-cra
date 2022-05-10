import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  //#region
  //Old and long way (without toolkit (react-redux) to connect to store )
  // import StoreContext from "../contexts/storeContext";
  // static contextType = StoreContext;
  // state = { bugs: [] };
  // componentDidMount() {
  //   const store = this.context;
  //   store.dispatch(loadBugs());
  //   this.unSubscribe = store.subscribe(() => {
  //     const bugInStore = store.getState().entities.bugs.list;
  //     if (bugInStore !== this.state) this.setState({ bugs: bugInStore });
  //   });
  // }
  // componentWillUnmount() {
  //   this.unSubscribe();
  // }
  //#endregion

  //Old but gold (Class Component)

  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  bugs: state.entities.bugs.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
