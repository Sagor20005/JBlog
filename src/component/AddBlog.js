import React,{useState,useEffect} from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

const AddBlog = ()=>{
  let api_url = process.env.REACT_APP_API_URL
  //all hoocks
  const Navigate = useNavigate()
  const [file,setFile] = useState(null)
  const [empty,setEmpty] = useState(false)
  const [blog,setBlog] = useState({
    titel:"",
    discription:"",
    author_id:"",
    author:""
  })
  // page starting task
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("blogToken"));
    console.log(user)
    setBlog((before)=>{
      return{
        ...before,author_id:user._id, author:user.name
      }
    })
  },[])
  //handle submit button
  const HandleSubmit =async ()=>{
    if(!file || !blog.titel || !blog.discription){
      setEmpty(true);
      return false
    }
    let formData = new FormData();
    formData.append("image",file);
    formData.append("titel",blog.titel);
    formData.append("discription",blog.discription);
    formData.append("author_id",blog.author_id);
    formData.append("author",blog.author);
    //tring to post backend
    try{
      let result = await fetch(`${api_url}/upload`,{
        method:"post",
        body:formData,
      })
      result = await result.json();
      console.log(result)
      // blog addded conformation alert
      if(result.status === true){
        let timerInterval;
          Swal.fire({
            title: `Blog added`,
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
              Navigate("/")
            }
          });
      }else{
        Swal.fire("blog not added ,Error");
      }
    }catch(error){
      Swal.fire("internal problem")
      console.log(error)
    }
  };
  return(
    <div className="new_blog">
      <h1>Add new Blog</h1>
      
      <label className="label">Select bannar*</label>
      <input className="inputFile" type="file"
      onChange={(e)=>setFile(e.target.files[0])}
      />
      {empty && !file && <p className="empty">Please select a image</p>}
      
      <label className="label">Write blog Titel*</label>
      <textarea className="textarea"
      onChange={(e)=>setBlog((before)=>{
        return{
          ...before,titel:e.target.value
        }
      })}
      ></textarea>
      {empty && !blog.titel && <p className="empty">Please enter titel</p>}
      
      <label className="label">Write blog Discription*</label>
      <textarea className="textarea discription"
      onChange={(e)=>setBlog((before)=>{
        return{
          ...before,discription:e.target.value
        }
      })}
      ></textarea>
      {empty && !blog.discription && <p className="empty">Please enter discription</p>}
      
      <button className="button" onClick={HandleSubmit}>Add Blog</button>
    </div>
    )
}
export default AddBlog;