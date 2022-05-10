import configureAddStore from "./store/configureAddStore";
import { Provider } from "react-redux";
import BugsFuncComponent from "./components/BugsFuncComponent";
import Bugs from "./components/Bugs";

function App() {
  const store = configureAddStore();
  return (
    <div className="App">
      <Provider store={store}>
        <Bugs />
      </Provider>
    </div>
  );
}

export default App;
