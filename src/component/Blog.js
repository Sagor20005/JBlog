// requirf package import
import React, {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import Swal from 'sweetalert2';


const Blog = ()=> {
  let api_url = process.env.REACT_APP_API_URL
  // hucks defaiend
  const [blogs,
    setBlogs] = useState([])
  const Navigate = useNavigate()


  //using use state call getBlog
  useEffect(()=> {
    //getting blogs data function
    const GetBlog = async ()=> {
      try {
        let result = await fetch(`${api_url}/blog`);
        result = await result.json()
        if (result.status === true) {
          setBlogs(result.data)
        } else {
          Swal.fire(result.msg);
        }
      }catch(error) {
        Swal.fire("Blog getting faild")
        console.log(error)
      }
    }
    GetBlog()
  },[]);

  return(
    <>
      {
      <div className="blogs">
        {
        blogs.map((blog)=> {
          return(
            <div className="blog" onClick={()=>Navigate(`/read-blog/${blog._id}`)}>
              <img src={`http://localhost:2001/${blog.img}`} alt="thamnel" />
            <h4>{blog.titel.length > 50 ? blog.titel.slice(0,50)+"..." : blog.titel}</h4>
          </div>
        )
        })
      }
    </div>
    }
  </>
)
}
export default Blog;