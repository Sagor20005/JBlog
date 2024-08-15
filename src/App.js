import React, { useState, useEffect} from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import Navbar from './component/Navbar'
import Signup from './component/Signup'
import Login from './component/Login'
import PrivateComponent from './component/PrivateComponent'
import Blog from './component/Blog'
import AddBlog from './component/AddBlog'
import ReadBlog from './component/ReadBlog'
import UpdateBlog from './component/UpdateBlog'
import Menu from './component/Menu'
import UpdateComment from './component/UpdateComment'


function App() {
  //SIDE MENU TOGGOL FUNF & USE STATE
  const [menu,setMenu] = useState(false);
  const [auth,setAuth] = useState(false)
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("blogToken"));
    user ? setAuth(true):setAuth(false);
  },[menu])
  const OpenMenu = ()=>{
    if(menu === true){
      setMenu(false)
    }else{
      setMenu(true)
    }
  }
  return (
    <>
      {
      <div className="App">
        <BrowserRouter>
          <Navbar open={OpenMenu} />
          {menu && auth ? <Menu close={OpenMenu}/> : null}
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* PRIVATE COMPONENT SETUP*/}
            <Route element={<PrivateComponent />}>
              <Route path="/" element={<Blog />} />
              <Route path="/new/blog" element={<AddBlog />} />
              <Route path="/read-blog/:id" element={<ReadBlog />} />
              <Route path="/update-blog/:id" element={<UpdateBlog />} />
              <Route path="/comment-update/:id/:text" element={<UpdateComment />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
      }
    </>
  );
}

export default App;