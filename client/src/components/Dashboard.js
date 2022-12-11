import React, {useEffect, useState} from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import moment from "moment"

const Dashboard = () => {
    const [loginData, setLoginData] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if(!token){
            navigate("/")
        }else{
            fetchData();
        }
        async function fetchData(){
            let token = localStorage.getItem("token");
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            const response = await axios.get("/api/dashboard")
            if(!response || !response.data){
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
                if(response.data.status == "success"){
                    setLoginData(response.data.data[0].attemptData)
                }else{
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }
        }
    },[])
   
  return (
    <div className="container">
        <div className='row'>
        <div className='col-md-12'>
            <h3>Hello {localStorage.getItem("name")} </h3>
        </div>
        </div>
        <div className='row'>
        {
            loginData.map((data,i) => {
                return (
                    // <div className='col-md-2'>
                <div className="col-sm-2">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{data.attemptStatus}</h5>
                    {
                        data.attemptStatus == "Error" ? 
                            <p className="card-text">{data.ReasonForError}</p>
                        :null
                    }
                    <p className="card-text">{moment(data.createdAt).format("DD/MM/YYYY hh:mm:ss a")}</p>
                </div>
                </div>
            </div>
            // </div>
                )
            })
        }
        </div>
   
    </div> 
  )
}

export default Dashboard;
