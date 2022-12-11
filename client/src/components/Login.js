import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/dashboard")
        }
    },[])
   
    const PostData = async () =>{
        let formData = {email, password};
        const config = {
            header: {
              'Content-Type': 'application/json'
            }
          }
        const response = await axios.post("/api/login", formData, config)
        if(!response || !response.data){
            toast.error("Something went wrong", {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            if(response.data.status == "success"){
                localStorage.setItem("name", response.data.userResData.name)
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
            }else{
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }

  return (
    <div className='container login'>
        <div className='row'>
            <div className='col-md-6'>
            <h4 style={{textAlign:"center"}}>Login</h4>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Password" />
                </div>
                <button type="submit" onClick={()=>PostData()} className="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Login;
