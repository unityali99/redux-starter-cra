import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBugs, resolveBug } from "../store/bugs";

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

  componentDidUpdate() {
    this.props.loadBugs();
  }

  render() {
    // function resolveBug(id) {
    //   this.props.resolveBug(id);
    // }
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id} style={{ padding: "1rem 0" }}>
            {bug.description} {"==>"} {`${bug.resolved}`}{" "}
            <span>
              <button onClick={() => this.props.resolveBug(bug.id)}>
                {"Resolve"}
              </button>
            </span>
          </li>
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
  resolveBug: (id) => dispatch(resolveBug(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
