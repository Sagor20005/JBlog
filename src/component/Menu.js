import React from 'react';
import {useNavigate,} from 'react-router-dom';
import Swal from 'sweetalert2'

const Menu = ({close})=> {
  const Navigate = useNavigate();
  
  const close_url = "https://img.icons8.com/?size=100&id=8112&format=png&color=000000";
  const mypic = "https://scontent.fjsr15-1.fna.fbcdn.net/v/t39.30808-6/434166048_941430680986329_7913426966803249864_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeHoj-WAPu4TPh69Di9TNNn6mn871Lykmz6afzvUvKSbPoouxKZL0EXjnRgJjs58xRpnD8EYcZ1R_C71jmMVhSEz&_nc_ohc=9uhMW6j04goQ7kNvgHYOk--&_nc_ht=scontent.fjsr15-1.fna&oh=00_AYBD1hPa7Th2T9LiI7TcE9zKlcAibjAsx2uUBNBnA7VV6A&oe=66C390DC";
  // LOGOUT FUNCTION
  const Logout = ()=> {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        Swal.fire({
          title: "Logout!",
          text: "Your file has been Logout.",
          icon: "success"
        });
        close()
        Navigate("/login")
      }
    });
  }
  // ABOUT CREATOR
  const About = ()=>{
    Swal.fire({
      title: "Jakareya!",
      text: "This website author Jakareya Halder. this is a simple blog/news related website",
      imageUrl: mypic,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "jakareya,s image"
    });
  }
  return(
    <>
      <div className="menu">
        <h1>Blog Menu</h1>
        <img src={close_url} alt="close" onClick={close} />
      <ul className="side_menu">
        <li onClick={Logout}>Logout</li>
        <li className="them">Them
          <ul className="them_menu" style={ { margin: "0px" }}>
            <li>Dark</li>
            <li>Light</li>
          </ul>
        </li>
        <li onClick={About}>About</li>
        <li>contact us</li>
      </ul>
    </div>
  </>
)
}
export default Menu;