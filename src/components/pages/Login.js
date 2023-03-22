import { useRef } from "react";
import { Link ,useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import { authactions } from "../../store";


const Login = () =>{
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const emailRef=useRef();
    const passwRef=useRef();
     

    const submitHandler = async (e) =>{
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwRef.current.value;
         
        const user={
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
        }
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjXxAz_5ptEoFTSrfIS3gbmCPMdHiehAs",{

            method:'POST',
            body:JSON.stringify(user)
        });
        if(res.ok){
             
            const data = await res.json();
            console.log(data);
            const idToken=data.idToken;
            const email=data.email;
            const cemail=email.replace(/[^a-zA-Z0-9]/g,'');
            localStorage.setItem("userCurr",idToken);
            localStorage.setItem("email",cemail);
            dispatch(authactions.login(enteredEmail));
            navigate('/');


        }else{
            console.log("error in loggin in")
        }
        //localStorage.setItem(idToken,data)

    }
    return(<div>
        <div className="container bg-light"><form onSubmit={submitHandler}>
            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" placeholder="Enter email" required ref={emailRef}/>
            </div>
            <div className="mb-3">
                <label htmlFor="p">Password</label>
                <input className="form-control" type="password" id="p" placeholder="Enter password" required ref={passwRef} />
            </div>
            
            <button type="submit" className="btn btn-primary mb-3">Login</button>
        </form>
        <button className="btn btn-warning mb-3">Forgot password?</button><br></br>
        <Link to='/signup'>SignUp</Link></div>

    </div>)
}

export default Login;