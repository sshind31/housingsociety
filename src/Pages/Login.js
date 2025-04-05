import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function Login(){
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [societyCode, setSocietyCode]=useState("")
  const [memberCode, setMemberCode]=useState("")
  const mystyle = {
    position: "fixed",
    inset: "0px",
    width: "12rem",
    height: "5rem",
    maxWidth: "100vw",
    maxHeight: "100dvh",
    margin: "auto"
  };
  function LoginUser(){
    let IsUserValid=false;
    axios.get("http://localhost:3000/User")
      .then(resp=>{
        console.log(memberCode);
        let user=resp.data.find(e => e.HousingSocietyCode===societyCode && e.MemberCode===memberCode);
        if(user!==undefined){
            dispatch({
              type:'LOGIN',
              payload:{
                HousingSocietyCode:user.HousingSocietyCode,
                MemberCode:user.MemberCode,
                Name:user.Name,
                UserID:user.id
              }});
            IsUserValid = true;
        }
        else{
            IsUserValid = false;
        }
        if(IsUserValid){
          navigate('/home')
        }
    })      
  }
  return (
    <div style={mystyle}>
    <input type="text" placeholder="SocietyCode" onChange={e=>setSocietyCode(e.target.value)}/><br/>
    <input type="text" placeholder="MemberCode" onChange={e=>setMemberCode(e.target.value)}/><br/>
    <input type="submit" placeholder="SocietyCode" onClick={e=>LoginUser(e.target.value)}/>
    </div>
  )
}