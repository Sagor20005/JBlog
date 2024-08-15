import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

const Login = ()=>{
  const server = process.env.REACT_APP_API_URL
  // huks defain
  const Navigate = useNavigate()
  // varuable defain
  const[user,setUser]=useState({email:"",password:""});
  const[empty,setEmpty]=useState(false)
  //login button click handle
  const HandleLogin = async()=>{
    try{
      if(!user.email || !user.password){
        setEmpty(true)
        return false
      }else{
        let result = await fetch(`${server}/login`,{
          method:"post",
          body:JSON.stringify(user),
          headers:{
            "content-type":"application/json"
          }
        });
        result = await result.json()
        delete result.password;
        console.log(result)
        //chaking data
        if(result.msg === "ok"){
          //set localstorage user
          localStorage.setItem("blogToken",JSON.stringify(result.data))
          // loged in alert
          let timerInterval;
          Swal.fire({
            title: `Login succes : ${result.data.name}`,
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
          Swal.fire("User not registerd !");
        }
      }
    }catch(error){console.log(error)}
  }
  
  return(
    <div className="from-parent">
      
      <h1>Login</h1>
      <label className="label" >enter email</label>
      <input
      className="input"
      type="email"
      placeholder="enter email"
      onChange={(e)=>setUser((previous)=>{
        return{
          ...previous,email:e.target.value
        }
      })}
      />
      {!user.email && empty && <p className="empty">Please enter email</p>}
      
      <label className="label" >enter password</label>
      <input
      className="input"
      type="password"
      placeholder="enter password"
      onChange={(e)=>setUser((previous)=>{
        return{
          ...previous,password:e.target.value
        }
      })}
      />
      {!user.password && empty && <p className="empty">Please enter password</p>}
      
      <button onClick={HandleLogin} className="button">Login</button>
      
    </div>
    );
};
export default Login;