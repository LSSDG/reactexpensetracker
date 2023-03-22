import { useRef } from "react";
import { Link ,useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
const SignUp = () =>{
    const navigate = useNavigate();

    const emailRef=useRef();
    const passwRef=useRef();
    const cpasswRef=useRef();

    const submitHandler = async (e) =>{
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwRef.current.value;
        const enteredConfirmPassword = cpasswRef.current.value;
        const user={
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
        }
        const response= await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjXxAz_5ptEoFTSrfIS3gbmCPMdHiehAs",{

            method:'POST',
            body:JSON.stringify(user)
        });
        if(response.ok)
        {
            const data = await response.json();
        const idToken=data.idToken;
        //localStorage.setItem('userCurr',idToken);
        const email=data.email;
            const cemail=email.replace(/[^a-zA-Z0-9]/g,'');
            localStorage.setItem("userCurr",idToken);
            localStorage.setItem("email",cemail);
        navigate('/');

        }else{
            console.log("error")
        }
    }
    return(<div className="container bg-light">    
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" placeholder="Enter email" required ref={emailRef}/>
            </div>
            <div className="form-group">
                <label htmlFor="p">Password</label>
                <input className="form-control" type="password" id="p" placeholder="Enter password" required ref={passwRef} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="cp">Confirm Password</label>
                <input className="form-control" type="password" id="cp" placeholder="Confirm password" required ref={cpasswRef} />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <Link to='/login'>Login</Link>
    </div>)
}

export default SignUp;