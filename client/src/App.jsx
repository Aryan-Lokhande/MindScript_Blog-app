import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Addblog from "./pages/admin/Addblog";
import Listblog from "./pages/admin/Listblog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        {/* <Route path="/admin" element={<Layout/>}> */}
        <Route path="/admin" element={false ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>} />
          <Route path="comments" element={<Comments/>} />
          <Route path="addblog" element={<Addblog/>} />
          <Route path="listblog" element={<Listblog/>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
