import { useRef } from "react";


const Login = () =>{
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
        const data = res.json();
        const idToken=data.idToken;
        //localStorage.setItem(idToken,data)

    }
    return(<div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter email" required ref={emailRef}/>
            </div>
            <div>
                <label htmlFor="p">Password</label>
                <input type="password" id="p" placeholder="Enter password" required ref={passwRef} />
            </div>
            
            <button type="submit">Login</button>
        </form>

    </div>)
}

export default Login;