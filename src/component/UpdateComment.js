import React,{useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateComment = ()=>{
  const Navigate = useNavigate()
  // DIT ENV
  const api_url = process.env.REACT_APP_API_URL
  // USE STATE
  const {id,text} = useParams();
  const [empty,setEmpty] = useState(false);
  const [comment,setComment] = useState({
    text:text,
    id:id
  })
  
  //RENAME FUNCTION
  const Rename = async ()=>{
    if(!comment.text){
      setEmpty(true);
      return false
    }else{
      try{
        let result = await fetch(`${api_url}/comment-update`,{
          method:"put",
          body:JSON.stringify(comment),
          headers:{
            "content-type":"application/json"
          }
        });
        result = await result.json();
        console.log(result)
        if(result.status){
          Navigate(`/read-blog/${result.data.blogId}`)
        }
      }catch(error){
        Swal.fire("Fetch error");
        console.log(` fetch error => ${error}`)
      }
    }
  };
  return(
    <>
      {
        <div class="from-parent updateComment">
          <h1>Rename Comment</h1>
          <textarea className="textarea"
          value={comment.text}
          onChange={(e)=>setComment((previous)=>{
            return{
              ...previous,text:e.target.value
            }
          })}
          />
          {!comment.text && empty && <p className="empty">Enter updated comment</p>}
          
          <button className="button" onClick={Rename}>Rename</button>
        </div>
      }
    </>
    );
};
export default UpdateComment;