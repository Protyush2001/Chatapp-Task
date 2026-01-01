import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
export default function Signup () {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({username:"",email:"",password:""});
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axiosInstance.post("/api/auth/signup",formData);
            alert("Signup successfull");
            navigate("/login");
        }catch(err){
            console.log("Something went wrong",err);
        }
    }

    return <div>
        <h2>SignUp Page</h2>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" placeholder="Enter your username" value={formData.username} onChange={(e)=>{setFormData({...formData,username:e.target.value})}}/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="Enter your email" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="Enter your password" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>
            </div>
            <div>
                <input type="submit" value="Signup"/>
            </div>

        </form>
    </div>
}