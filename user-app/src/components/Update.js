import { UserContext } from "../App"
import { useState,useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Update =({userdata,onUpdate}) =>{

    const user =useContext(UserContext);
    const navigate =useNavigate();
    const id =user.id;
    
    const [name,setName]=useState(user.name);
    const [age,setAge]=useState(user.age);
    const [profile,setProfile] =useState(user.profile);
    const [password,setPassword]=useState(user.password);
    var [hobby,setHobby]=useState(user.hobby);

    const onChangeHobby =(e) => {
        if(hobby.includes(e.target.value)){
            hobby.splice( hobby.indexOf(e.target.value),1)
            setHobby([...hobby]  )
        }else{
        setHobby([...hobby,e.target.value]);
        }
    }

    const isChecked=(value)=>{
      if (hobby.includes(value)){
        return true
      }
      else
      { 
          return false
      }
    }
    const onSubmit = (e) =>{
        e.preventDefault()
         if(!name){
             alert("Please Enter Name ");
             return;
         }
         if(!age){
             alert("Please Enter Age")
             return;
         }
         if(!password){
             alert("Please Enter Password")
             return;
         }
         if(!profile){
            alert("Please Enter Profile URL")
            return;
        }
         const newuser ={
             "id":id,
             "name":name,
             "password":password,
             "age":age,
             "hobby" :hobby,
             "profile":profile}

         axios.put('/api/updateuser',newuser).then((res)=>{
             console.log(res.data)
             if(res.data.code === 200){
                userdata(res.data.user)
                onUpdate()
              navigate("/home",{replace:false})
       
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
            
                <h1 className="bg-dark text-white text-center mt-3">Update Data</h1>
                <form className="add-form" onSubmit={onSubmit}>
                {/* Name */}
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
                
                {/* age */}
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
                {/* user profile url */}
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
{/* password */}
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
                {/* hobby */}
                <div className="custom-control custom-checkbox">
                    <label><b>Hobby</b></label><br/>
                    <div className="row">
                        <div className="col-6">
                        <input 
                            type="checkbox" 
                            className="custom-control-input col-2 " 
                            value="Dancing" 
                            checked={isChecked("Dancing")} 
                            onChange={onChangeHobby} 
                        />
                        <label className="custom-control-label pd-1 col-10 h6" >Dancing</label>
                        </div>
                        <div className="col-6">
                        <input 
                            type="checkbox" 
                            className="custom-control-input col-2 " 
                            value="Play Game"
                            checked={isChecked("Play Game")} 
                            onChange={onChangeHobby}/>
                        <label className="custom-control-label pd-1 col-10 h6" >Play Game</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <input 
                            type="checkbox" 
                            className="custom-control-input col-2 " 
                            value="Singing"  
                            checked={isChecked("Singing")} 
                            onChange={onChangeHobby}
                            />
                        <label className="custom-control-label pd-1 col-10 h6">Singing</label>
                        </div>
                        <div className="col-6">
                        <input 
                            type="checkbox" 
                            className="custom-control-input col-2 " 
                            value="Reading" 
                            checked={isChecked("Reading")} 
                            onChange={onChangeHobby}
                         />
                        <label className="custom-control-label pd-1 col-10 h6" >Reading</label>
                        </div>
                    </div>
                </div>
    
                    <input type="submit"  value="Update" className="btn btn-block btn-primary" />
                </form>
            </>
    )
}
export default Update