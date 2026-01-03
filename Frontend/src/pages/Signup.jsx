import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
export default function Signup () {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({username:"",email:"",password:""});
    const [errors,setErrors] = useState({});

    const validate = () =>{
        const newError = {};
        if(!formData.username){
            newError.username = "Username is required";
        }
        if(!formData.email){
            newError.email = "Email is required";
        }
        if(!formData.password){
            newError.password = "Password is required";
        }
        setErrors(newError);
        return Object.keys(newError).length ===0;
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!validate()){
            return;
        }
        try{
            await axiosInstance.post("/api/auth/signup",formData);
            alert("Signup successfull");
            navigate("/login");
        }catch(err){
            console.log("Something went wrong",err);
        }
    }

    return <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl text-center mb-6 font-bold text-gray-600">SignUp Page</h2>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username" className="block text-gray-900 mb-1 font-bold">Username:</label>
                <input type="text" placeholder="Enter your username" value={formData.username} onChange={(e)=>{setFormData({...formData,username:e.target.value})}} className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"/>
                {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-900 mb-1 font-bold">Email:</label>
                <input type="email" placeholder="Enter your email" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}} className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"/>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-900 mb-1 font-bold">Password:</label>
                <input type="password" placeholder="Enter your password" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}} className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"/>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div>
                <input type="submit" value="Signup" className="w-full text-white bg-green-500 rounded-lg p-2 cursor-pointer hover:bg-green-800 mb-4 mt-2"/>
            </div>

        </form>
        <p>Already have an accuunt? {" "} <span onClick={()=>navigate("/login")} className="text-green-800 cursor-pointer">Login</span></p>
        </div>
        
    </div>
}