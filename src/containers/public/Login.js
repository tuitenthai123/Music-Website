import React, {useState} from "react";
import axios from "axios";
// import * as apis from '../apis'

const Login = () => {
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        axios.post('')
    }
    return(
        <div>
            <div class="flex justify-center items-center h-screen bg-gray-200">
                <form class="bg-white p-8 shadow-md rounded-md max-w-md" onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Tài Khoản
                        </label>
                        <input class="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500" type="text" id="username" placeholder="USER" onChange={e=>setUser(e.target.value)} />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password" >
                            Mật Khẩu
                        </label>
                        <input class="border-2 border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500" type="password" id="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <button class="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600" type="submit">
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login