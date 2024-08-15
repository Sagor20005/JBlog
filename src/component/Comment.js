import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
const sendBtnUrl = "https://img.icons8.com/?size=100&id=13842&format=png&color=000000";
const threeDotUrl = "https://img.icons8.com/?size=100&id=103410&format=png&color=000000";

const Comment = ({blog_id})=> {
  //DOTENV FILE
  const api_url = process.env.REACT_APP_API_URL
  //USE NAVIGATE
  const Navigate = useNavigate();
  //useState
  const [empty,setEmpty] = useState(false);
  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState( {
      text: "",
      blogId: "",
      authorId: "",
      authorName: ""
    });
  const [blogId,setBlogId] = useState("")
  //USE EFFECT HUCK
  useEffect(()=> {
    setBlogId(blog_id)
    const user = JSON.parse(localStorage.getItem("blogToken"));
    setComment((previous)=> {
      return {
        ...previous, authorId: user._id, authorName: user.name, blogId: blog_id
      }
    })
    // CALL GET COMMENTS
    GetComments()
  }, [blogId]);
  // GET COMMENTS FUNCTION
  const GetComments = async ()=>{
    try{
      const respons = await fetch(`${api_url}/comments/${blogId}`);
      const result = await respons.json();
      console.log(result);
      if(result.status === true){
        setComments(result.data)
      }
    }catch(error){
      console.log(error)
    }
  };
  // HANDLE SUBMIT FUNCTION
  const HandleSubmit = async ()=> {
    if(!comment.text){
      setEmpty(true);
      return false
    }
    try {
      const respons = await fetch(`${api_url}/create/comment`, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
          "content-type": "application/json"
        }
      });
      const result = await respons.json();
      //ALERT ADDED OR NOT
      console.log(result);
      if (result.status === true) {
        GetComments()
        // SET EMPTY COMMENT
        setComment((previous)=> {
          return{
            ...previous, text: ""
          }
        })
      } else {
        Swal.fire("Comment add faild")
      };
    }catch(error) {
      Swal.fire("Fetch Faild")
    };
  };
  
  //DELETE BUTTON CLICK HANDLE
  const Delete =async (id)=>{
    try{
      let result = await fetch(`${api_url}/delete-comment/${id}`,{
        method:"delete",
      });
      result = await result.json()
      console.log(result)
      if(result.data.acknowledged===true){
        Swal.fire("Comment Deleted.");
        GetComments()
      }
    }catch(error){
      Swal.fire("Delete faild");
      console.log(error);
    }
  };
  return(
    <>
      {
      <div className="comment_section">
        {/* CREATE COMMENT*/}
        <hr />
      <h3>Comments</h3>
      <p>
        {comments.length} comments
      </p>
      <lebel className={!comment.text && empty ? "empty lebel":"lebel"}>Write your comment</lebel>
      <br/>
      <textarea
        value={comment.text}
        onChange={(e)=>setComment((previous)=> {
          return {
            ...previous, text: e.target.value
          }
        })}
        />
        
        
      <img src={sendBtnUrl} alt="send" className="sendBtn"
      onClick={HandleSubmit}
      />

    {/* SHOW COMMENT*/}
    {
    comments.map((e)=>{
      return(
        <div className="comment">
          <div className="cmntLogo-Name">
            <div className="cmntLogo">
              {e.authorName.slice(0,1)}
            </div>
            <h4>{e.authorName}</h4>
          </div>
          <p>
            {e.text}
          </p>
          <div className="menuBtn_cmntMenu">
            {e.authorId === comment.authorId ? <img src={threeDotUrl} alt="menu" className="menuBtn" /> : null}
            <ul className="cmntMenu">
              <li onClick={()=>Navigate(`/comment-update/${e._id}/${e.text}`)}>Update</li>
              <li onClick={()=>Delete(e._id)}>Delete</li>
            </ul>
          </div>
      </div>
    )
  })
  }
</div>
}
</>
);
};
export default Comment;