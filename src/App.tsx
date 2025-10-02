import "./App.css";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  
  return (
    <>
      <Header />
      <Outlet /> {/* This will render the matched child route component */}
    </>
  );
}

export default App;
