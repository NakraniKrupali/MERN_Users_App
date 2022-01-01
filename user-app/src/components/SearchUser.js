import axios from 'axios'
import {useState} from 'react';
const Searchuser = ({onSearchUser}) =>{
    const [age,setAge]=useState();
    const onSearch = (e) =>{
       e.preventDefault()
        if(!age){
            alert("Please Enter age ")
        }
    
        axios.post('/api/searchuser',{age:age}).then((res)=>{
          //console.log(res.data)              

            if(res.data.code === 200){
                console.log(res.data.users)   
                //pass the user data to search Component           
                onSearchUser(res.data.users)
            }
            else {
                alert("No user Found");
              }
        })
    }

    
    return(
        <>
        <h1 style={{color:'Orange'}}>Search by Age</h1>
            <form className="add-form" onSubmit={onSearch}>
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
                <input type="submit"  className="btn btn-block btn-primary btn-lg" value="search" />
            </form>
        </>
    )
}
export default Searchuser