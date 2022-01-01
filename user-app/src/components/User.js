import { UserContext } from "../App"
import { useContext } from "react"

const User = ({user}) =>{
  const contextUser= useContext(UserContext);

  //when component call from the home page
  if(user=== undefined){
     user =  contextUser
  }

    return(
      <div className="card mx-auto" style={{width: "30rem"}}>
      <div className="card-body row">
      <div className="col-3"> 
      <img  align="center" src={user.profile} style={{ width: "100px",height: "100px",borderRadius: "50%", objectFit: "cover"}} className="card-img-top img-fluid" alt="..."  />
        </div><div className="col-1"></div>
        <div className="col-8"> <h5 className="card-title"><b>Name</b> : {user.name}</h5>
          <p className="card-text"><b>Age</b> : {user.age}</p>
          <p className="card-text"><b>Hobby</b> : {user.hobby.map((i) => `${i}`).join(',')}</p>
          </div>
      </div>
  </div>
    )
}

export default User