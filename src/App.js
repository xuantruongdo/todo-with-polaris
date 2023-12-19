import "./App.css";
import List from "./components/List/List";
import {
  Frame,
  TopBar,
} from "@shopify/polaris";

function App() {

  const userMenuMarkup = <TopBar.UserMenu name="Dharma" initials="D" />;

  const topBarMarkup = (
    <TopBar showNavigationToggle userMenu={userMenuMarkup} />
  );

  return (
    <>
      <Frame topBar={topBarMarkup}>
        <List />
      </Frame>
    </>
  );
}

export default App;
