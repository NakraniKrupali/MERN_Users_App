import {useState} from 'react';
import { Link} from 'react-router-dom';
import User from './User';
import Searchuser from './SearchUser'
const Search = () =>{

    const [users,setUsers]=useState([])
    const searchUser =(usersdata) =>{
        setUsers(usersdata)
        console.log(users)
    }
    return(
        <>
            <Link to="/home">Home</Link>
            <Searchuser onSearchUser={searchUser}/>
            {users.length > 0 ? <>
            {users.map((u)=> <User user={u}/> )}
            </>: 
            "No User Found "
            }
        </>
    )
}
export default Search