import React, {
  useEffect,
  useState
} from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom'
import Swal from 'sweetalert2'
import Comment from './Comment'

const ReadBlog = ()=> {
  //dot env data
  const api_url = process.env.REACT_APP_API_URL
  // react usestate huks
  const [blog, setBlog] = useState( {});
  const [authorId, setAuthorId] = useState("");
  const [author, setAuthor] = useState(false);
  const [blogId, setBlogId] =useState("")
  
  //react-router huks
  const Navigate = useNavigate()
  const {id} = useParams();
  // page start work
  useEffect(()=> {
    GetABlog()
  }, [])
  // creator id chaking
  useEffect(()=> {
    const user_id = JSON.parse(localStorage.getItem("blogToken"))._id;
    if (user_id === authorId) {
      setAuthor(true)
    }
    setBlogId(blog._id)
    console.log(blogId)
  },[blog]);
  // get blog with id function
  const GetABlog = async ()=> {
    try {
      let result = await fetch(`${api_url}/read-blog/${id}`)
      result = await result.json()
      setAuthorId(result.data.author_id)
      setBlog(result.data);
    }catch(error) {
      console.log(error)
    }
  };
  // delete api function
  const HandleDelete = async ()=> {
    try {
      let result = await fetch(`${api_url}/delete-blog`,
        {
          method: "delete",
          body: JSON.stringify({
            id: blog._id, img: blog.img
          }),
          headers: {
            "content-type": "application/json"
          }
        });
      result = await result.json()
      console.log(result)
      if (result.status === true) {
        Swal.fire("Blog Deleted.")
        Navigate("/")
      } else {
        Swal.fire("blog deleteing faild")
      }
    }catch(error) {
      Swal.fire("fetch faild")
      console.log(error)
    }
  }
  return(
    <>
      {
      <div>
        <div className="read_blog">
          {author ?
          <div className="blog_action">
            <button className="button" onClick={()=>Navigate(`/update-blog/${blog._id}`)}>Update</button>
            <button className="button" onClick={HandleDelete}>Delete</button>
          </div>:
          ""
          }
          <img src={`${api_url}/${blog.img}`} alt="thamnel" />
        <div className="blog_info">
          <div>
            Author: {blog.author}
          </div>
          <div>
            Update: {blog.date}
          </div>
        </div>
        <h3>{blog.titel}</h3>
        <p>
          {blog.discription}
        </p>
      </div>
      {blogId ? <Comment blog_id={blogId} />:null}
    </div>
    }
  </>
);
};
export default ReadBlog;