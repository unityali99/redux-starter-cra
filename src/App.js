import Bugs from "./components/Bugs";
import configureAddStore from "./store/configureAddStore";
import { Provider } from "react-redux";

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
