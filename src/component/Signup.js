import React, {
  useState
}from 'react';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'


const Signup = ()=> {
  let api_url = process.env.REACT_APP_API_URL
  // react state huks var
  const Navigate = useNavigate();
  const [user,
    setUser] = useState( {
      name: "",
      email: "",
      password: ""
    });
  const [empty,
    setEmpty] = useState(false)
  //submit button handle
  const HandleSubmit = async ()=> {
    try {
      if (!user.name || !user.email || !user.password) {
        setEmpty(true)
        return false
      } else {
        let result = await fetch(`${api_url}/user/add`, {
          method: "post",
          body: JSON.stringify(user),
          headers: {
            "content-type": "application/json"
          }
        });
        result = await result.json();
        console.log(result)
        if (result.data) {
          localStorage.setItem("blogToken", JSON.stringify(result.data))
          
          //show alert for ading usrr
          let timerInterval;
          Swal.fire({
            title: `added : ${result.data.name}`,
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
          
        }

      }
    }catch(error) {
      console.log(error)
    };
  }
  return(
    <>
      <div className="from-parent">
        <h1>Signup</h1>

        <label className="label">enter name</label>
        <input
        className="input"
        type="text"
        placeholder="enter name"
        onChange={(e)=> {
          setUser((old)=> {
            return {
              ...old, name: e.target.value
            }
          })
        }}
        />
      {!user.name && empty && <p className="empty">
        Please enter name.
      </p>
      }

      <label className="label">enter email</label>
      <input
      className="input"
      type="email"
      placeholder="enter email"
      onChange={(e)=>setUser((data)=> {
        return {
          ...data, email: e.target.value
        }
      })}
      />
    {!user.email && empty && <p className="empty">
      Please enter email.
    </p>
    }

    <label className="label">enter password</label>
    <input
    className="input"
    type="text"
    placeholder="enter password"
    onChange={(e)=>setUser((data)=> {
      return {
        ...data, password: e.target.value
      }
    })}
    />
  {!user.password && empty && <p className="empty">
    Please enter password.
  </p>
  }

  <button className="button"
    onClick={HandleSubmit}
    >Submit</button>

</div>
</>
);
};
export default Signup;