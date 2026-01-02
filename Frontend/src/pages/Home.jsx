import { useNavigate } from "react-router-dom"
export default function Home(){
    const navigate = useNavigate();

    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to chat app 💬</h2>
            <p className="text-gray-800 mb-8 text-xl text-bold">Connect. Chat. Share instantly</p>
            <div className="flex flex-col gap-4">
                <button onClick={()=>{navigate("/login")}} className="bg-green-800 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition">Login</button>
                <button onClick={()=>{navigate("/signup")}} className="border border-green-600 text-green-900 py-3 rounded-xl font-medium hover:bg-gray-400 transition">Signup</button> 
            </div>

        </div>
        
    </div>
}