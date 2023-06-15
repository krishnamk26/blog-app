import React from "react";
import NavBar from "./component/NavBar";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import CreateBlogs from "./component/CreateBlogs";
import ManageBlog from "./component/ManageBlog";
import EditBlog from "./component/EditBlog"
import Home from "./component/Home";
function App() {
  return <>
  <BrowserRouter>
  <div>
  <NavBar/>
  </div>
  <div className="container-fluid">
  <Routes>
    <Route path="/create" element={<CreateBlogs/>}/>
    <Route path="/manage" element={<ManageBlog/>}/>
    <Route path="/edit/:id" element={<EditBlog/>}/>
    <Route path="/" element={<Home/>}/>
  </Routes>
  </div>
  </BrowserRouter>
  </>
}

export default App;
