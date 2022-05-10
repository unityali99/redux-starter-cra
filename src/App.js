import configureAddStore from "./store/configureAddStore";
import { Provider } from "react-redux";
import BugsFuncComponent from "./components/BugsFuncComponent";

function App() {
  const store = configureAddStore();
  return (
    <div className="App">
      <Provider store={store}>
        <BugsFuncComponent />
      </Provider>
    </div>
  );
}

export default App;
