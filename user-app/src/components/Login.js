import axios from 'axios'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login =({onLogin,userdata}) =>{
    const [name,setName]=useState();
    const [password,setPassword]=useState();
    let navigate=useNavigate();
    const onSubmit = (e) =>{
        e.preventDefault()

        if(!name){
            alert("Please Enter Name ")
           
        }
        if(!password){
            alert("Please Enter Password")
            return;
        }
        
       const logdata={ name:name,password:password }
        axios.post('/api/userlogin',logdata).then((res)=>{
            if(res.data.code === 200){
                onLogin()
                userdata(res.data.user)
                navigate('/Home')
            }
            else {
                alert("Please Enter Valid User name and password");
            }
        })
    }
    return(
        <>
            <h1 style={{color:'Orange'}}>Login</h1>
            <form className="add-form" onSubmit={onSubmit}>
                <div   className="form-group ">
                    <label ><b>User Name</b></label>
                    <input 
                    className="form-control"
                    type="text" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder="Enter UserName"/>
                </div>

                <div className="form-group">
                    <label><b>Password</b></label>
                    <input type="password"
                    className="form-control"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter Password"/>
                </div>
                <input type="submit"  className="btn btn-block btn-dark btn-lg" value="Login" />
            </form>
        </>
    )
}
export default Login