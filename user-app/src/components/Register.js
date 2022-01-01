import React,{ useState ,useEffect} from "react"
import axios from "axios";
import{useNavigate} from 'react-router-dom'
const Register = () =>{
  const [name,setName]=useState();
  const [age,setAge]=useState();
  const [profile,setProfile]=useState();
  const [password,setPassword]=useState();
  var [hobby,setHobby]=useState([]);

  //this function will be call when user can check or unckeck the any hobby
  const onChangeHobby =(e) => {
    if(hobby.includes(e.target.value)){
        hobby.splice( hobby.indexOf(e.target.value),1)
        setHobby([...hobby]  )
    }else{
    setHobby([...hobby,e.target.value]);
    }
  }
//  useEffect(()=>console.log(hobby),[hobby])
  let navigate= useNavigate();
  const onSubmit = (e) =>{
    e.preventDefault()
    if(!name){
        alert("Please Enter Name ")
       
    }
    if(!age){
        alert("Please Enter Age")
        return;
    }
    if(!profile){
        alert("Please Enter Profile URL")
        return;
    }
    if(!password){
        alert("Please Enter Password")
        return;
    }
    //gemnerate id
    const id=  Math.floor(Math.random()*100000)+1
    const user ={id,name,password,age,hobby,profile}
    axios.post('/api/registeruser',user).then((res)=>{
        console.log(res.data)
        if(res.data.code === 200){
            navigate("/")
        }else{
            alert("Something Wrong Please try Again")
        }
    })
    setAge("")
    setName("")
    setPassword("")
    setProfile("")
    setHobby([])
    
}
    return(
        <>
            <h1 className="bg-dark text-white text-center mt-3">Registration</h1>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label><b>User Name</b></label>
                    <input 
                    className="form-control"
                    type="text"
                    placeholder="Enter User Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                     />
                </div>

                <div className="form-group">
                    <label><b>User Age</b></label>
                    <input 
                    className="form-control"
                    type="number"
                    placeholder="Enter User Age"
                    value={age}
                    onChange={(e)=> setAge(e.target.value)}
                     />
                </div>
                <div className="form-group">
                    <label><b>User Profile</b></label>
                    <input 
                    className="form-control"
                    type="url"
                    placeholder="Enter User Profile url"
                    value={profile}
                    onChange={(e)=> setProfile(e.target.value)}
                     />
                </div>

                <div className="form-group">
                    <label><b>User Password</b></label>
                    <input 
                    className="form-control"
                    type="password"
                    placeholder="Enter User Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                     />
                </div>
                <div class="custom-control custom-checkbox">
                    <label><b>Hobby</b></label><br/>
                    <div className="row">
                        <div className="col-6">
                        <input type="checkbox" className="custom-control-input col-2 " value="Dancing"  onChange={onChangeHobby} />
                        <label className="custom-control-label pd-1 col-10 h6" >Dancing</label>
                        </div>
                        <div className="col-6">
                        <input type="checkbox" className="custom-control-input col-2 " value="Play Game" onChange={onChangeHobby}/>
                        <label className="custom-control-label pd-1 col-10 h6" >Play Game</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <input 
                            type="checkbox" 
                            className="custom-control-input col-2 " 
                            value="Singing"  
                            onChange={onChangeHobby}
                            />
                        <label className="custom-control-label pd-1 col-10 h6">Singing</label>
                        </div>
                        <div className="col-6">
                        <input type="checkbox" className="custom-control-input col-2 " value="Reading" onChange={onChangeHobby} />
                        <label className="custom-control-label pd-1 col-10 h6" >Reading</label>
                        </div>
                    </div>
                </div>
               
                <input type="submit"  value="Register" className="btn btn-block btn-dark btn-lg" />
            </form>
        </>
    )
}
export default Register