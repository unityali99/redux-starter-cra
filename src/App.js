import Bugs from "./components/Bugs";
import StoreContext from "./contexts/storeContext";
import configureAddStore from "./store/configureAddStore";

function App() {
  const store = configureAddStore();
  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        <Bugs />
      </StoreContext.Provider>
    </div>
  );
}

export default App;
