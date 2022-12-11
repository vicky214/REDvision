import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/dashboard")
        }
    },[])
   
    const PostData = async () =>{
        let formData = { name, email, password};
        const config = {
            header: {
              'Content-Type': 'application/json'
            }
          }
        const response = await axios.post("/api/register", formData, config)
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
    <div className='container register'>
        <div className='row'>
            <div className='col-md-6'>
                <h4 style={{textAlign:"center"}}>Register</h4>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} id="name" placeholder="Enter Name" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="Enter Password" />
                </div>
                <button type="submit" onClick={()=>PostData()} className="btn btn-primary">Register</button>
            </div>
        </div>
    </div>
  )
}

export default Register;
