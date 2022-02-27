import "./App.css";
import Welcome from "./components/signup-login/Welcome";
import Search from "./components/search/Search";
import Repos from "./components/repos/Repos";

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="search" element={<Search />} />
      <Route path=":username/try" element={<Repos />} />
    </Routes>
  );
  /*  return <Welcome />; */
  /*   return <Search />; */
  /*  return <Repos />; */
}

export default App;
