import Login from './components/Login'
import Logout from './components/Logout';
import DeleteUser from './components/Delete';
import  Register from './components/Register'
import Update from './components/Update';
import Search from './components/Search';
import User from './components/User';
import AccountLink from './components/AcoountLink'
import {useSelector,useDispatch} from 'react-redux'
import {login,logout} from './actions'
import {useState,createContext} from 'react';
import {BrowserRouter as Router, Route,Routes ,Link} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

//create context
export  const UserContext =createContext();

function App() {
    const [user,setUser]=useState([]);
    const [showupdate,setShowUpdate]=useState(false);
    const isLogged =useSelector((state)=>state);
    const dispatch=useDispatch();
   
  const dologin =() =>{
    dispatch(login())
  }
  const dologout = () =>{
    dispatch(logout())
  }

  const setUserData =(user) =>{
    setUser(user);

  }
  
  return (
    <Router>
      <div className="container col-6 px-5 mx-auto">

      <Routes>
          {/* Login or index page */}
          <Route 
            path='/'
            element={
                <div  >
                  {isLogged ? <Logout onClick={dologout} /> : 
                  <> 
                      <Login onLogin={dologin } userdata={setUserData} />
                      <AccountLink text="New User ?"
                                   TexttoLink="Registration" 
                                   href="/registration" />
                  </>
                  } 
                </div>
            }/>

            {/* registreation */}
            <Route 
            path='/registration'
            element={
                <>
                <Register />
                <AccountLink text="already have an account ?"
                                   TexttoLink="Login" 
                                   href="/" />
                </>
            }/>

            {/* Home Page */}
            <Route 
               path='/home'
               element={
                  <div className='mx-auto ' style={{width: "30rem"}}>
                   <div className='text-center h1' >User Information</div>
                    <UserContext.Provider value={user}>
                    <User />
                    <div className="d-flex justify-content-between" style={{width: "30rem"}}>
                    <Logout onClick={dologout} />
                    <DeleteUser onDeleteUser={dologout}/>
                    {/* //update */}
                    <button 
                          onClick={()=>setShowUpdate(!showupdate)} 
                           className={showupdate ? "btn btn-danger text-white" : "btn btn-primary text-white"}>{showupdate ? "Close" : "Update"}</button>
                   <Link to="/search" className='btn btn-success'>Search</Link>
                   </div>
                   {showupdate ? <Update userdata={setUserData} onUpdate={()=>setShowUpdate(!showupdate)}/> : "" }

                    </UserContext.Provider>

                  </div>}/>

                  {/* Search Page */}
                  <Route path="/search" element={<Search />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
