import { useNavigate } from "react-router-dom"
const Logout = ({onClick}) =>{
    const navigate=useNavigate()
    return (
            <button 
            className="btn btn-danger"
            onClick={()=>{
                onClick()
                navigate('/')

            }}> Logout </button>  
    )
}
export default Logout