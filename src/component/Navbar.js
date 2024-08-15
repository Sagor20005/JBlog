import React, {  useEffect,  useState} from 'react';
import { Link,  useLocation} from 'react-router-dom'

const Navbar = ({open})=> {
  let [blogToken,setBlogToken]=useState()
  let [logo,setLogo]=useState("B")
  const location = useLocation().pathname;
  
  useEffect(()=> {
    const lsUser = JSON.parse(localStorage.getItem("blogToken"));
    setBlogToken(lsUser)
    if(lsUser){setLogo(lsUser.name.slice(0,1))}
    
  }, [location])
  return(
    <>
      {
      <div className="nav">
        <div className="logo" onClick={open}>{logo}</div>
        {
          blogToken ? //if
          <ul>
            <li className={location==="/new/blog"?"active":""}>
              <Link to="/new/blog" style={{color:location==="/new/blog"?"black":""}}  >Add Blog</Link>
            </li>
            <li className={location==="/"?"active":""} >
              <Link to="/" style={{color:location==="/"?"black":""}} >Blog</Link>
            </li>
          </ul>
          ://else
          <ul>
            <li className={location==="/login"?"active":""}>
              <Link to="/login" style={{color:location==="/login"?"black":""}} >Login</Link>
            </li>
            <li className={location==="/signup"?"active":""} >
              <Link to="/signup" style={{color:location==="/signup"?"black":""}} >Signup</Link>
            </li>
          </ul>
        }
      </div>
      }
   </>
  );
}
export default Navbar;