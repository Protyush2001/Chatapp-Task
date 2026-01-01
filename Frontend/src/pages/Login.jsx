import {useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../redux/authSlice";
import { loginUser } from "../api/auth";

export default function Login (){
    const [formData,setFormData] = useState({email:"",password:""});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const data = await loginUser(formData);
            localStorage.setItem("token",data.token);
            dispatch(login(data));
            alert("Login Successful");
            navigate("/chat");

        }catch(err){
            console.log(err);
            alert("Login failed");
        }
    }
    return <div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email here" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}}/>
            </div>
                <label>Password:</label>
                <input type="password" placeholder="Enter your password here" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}}/>

            <div>
                <input type="submit" value="Login" />
            </div>
        </form>
    </div>
}