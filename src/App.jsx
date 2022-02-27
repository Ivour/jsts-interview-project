import "./App.css";
import Welcome from "./components/signup-login/Welcome";
import Search from "./components/search/Search";
import Repos from "./components/repos/Repos";
import Orgs from "./components/orgs/Orgs";
import AboutUser from "./components/user/AboutUser";

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="search" element={<Search />} />
      <Route path=":username" element={<AboutUser />} />
      <Route path=":username/repos" element={<Repos />} />
      <Route path=":username/orgs" element={<Orgs />} />
      <Route path="*" element={<p>404...nothing found</p>} />
    </Routes>
  );
  /*  return <Welcome />; */
  /*   return <Search />; */
  /*  return <Repos />; */
}

export default App;
