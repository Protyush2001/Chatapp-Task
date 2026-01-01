import { useNavigate } from "react-router-dom"
export default function Home(){
    const navigate = useNavigate();

    return <div>
        <h2>Welcome to chat app</h2>
        <button onClick={()=>{navigate("/login")}}>Login</button>
        <button onClick={()=>{navigate("/signup")}}>Signup</button>
    </div>
}