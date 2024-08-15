import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import {useNavigate,useParams} from 'react-router-dom'

const UpdateBlog = ()=>{
  const Navigate = useNavigate()
  //get api url from dotenv
  const api_url = process.env.REACT_APP_API_URL
  //get blog id frim use useParams
  const {id} = useParams()
  // use state hucks
  const [file,setFile] = useState(null);
  const [blog,setBlog] = useState({
    titel:"",
    discription:"",
    img:"",
    id:"",
  })
  // get previous blog from mongodb
  useEffect(()=>{
    console.log(id)
    const GetBlog = async ()=>{
      let result = await fetch(`${api_url}/get-blog/${id}`);
      let previousBlog = await result.json();
      console.log(previousBlog)
      setBlog({
        titel:previousBlog.titel,
        discription:previousBlog.discription,
        img:previousBlog.img,
        id:previousBlog._id
      })
    };
    GetBlog()
  },[]);
  useEffect(()=>{
    console.log(blog)
  },[blog])
  
  // handle Update
  const Update = async ()=>{
    //create formdata and append data
    let formData = new FormData();
    formData.append("titel",blog.titel);
    formData.append("discription",blog.discription);
    formData.append("id",blog.id)
    if(file){
      formData.append("file",file);
      formData.append("previousImg",blog.img);
    }
    //tring to post backend
    try{
      let result = await fetch(`${api_url}/update-blog`,{
        method:"post",
        body:formData,
      })
      result = await result.json();
      console.log(result)
      if(result.status === true){
        Swal.fire("Blog updated.");
        Navigate(`/read-blog/${id}`);
      }else{
        Swal.fire("Cannot update")
      }
    }catch(error){
      console.log(`Update error : ${error}`);
      Swal.fire("Fetch Faild")
    }
  };
  
  return(
    <div className="new_blog">
      <h1>Update Blog</h1>
      
      <label className="label">Select bannar*</label>
      <input className="inputFile" type="file"
      onChange={(e)=>setFile(e.target.files[0])}
      />
      
      <label className="label">Write blog Titel*</label>
      <textarea className="textarea"
      value={blog.titel}
      onChange={(e)=>setBlog((before)=>{
        return{
          ...before,titel:e.target.value
        }
      })}
      ></textarea>
      
      <label className="label">Write blog Discription*</label>
      <textarea className="textarea discription"
      value={blog.discription}
      onChange={(e)=>setBlog((before)=>{
        return{
          ...before,discription:e.target.value
        }
      })}
      ></textarea>
      
      <button className="button" onClick={Update}>Update</button>
    </div>
    )
}
export default UpdateBlog;