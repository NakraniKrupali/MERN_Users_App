import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react"
const DeleteUser = ({onDeleteUser}) =>{
    const navigate=useNavigate()
    const user=useContext(UserContext);

    const onDelete = () =>{
       const id =user.id;
        //console.log(id);
       axios.post('/api/userdelete',{id:id}).then((res)=> {
           if(res.data.code === 200){
            onDeleteUser()
            navigate('/')
           }
       })
    }
    return(
        <button onClick={onDelete}
          className="btn btn-warning text-white"> Delete </button>
    )
}
export default DeleteUser