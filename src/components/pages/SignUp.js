import { useRef } from "react";

const SignUp = () =>{

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
        localStorage.setItem('userCurr',idToken);
        }else{
            console.log("error")
        }
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
            <div>
                <label htmlFor="cp">Confirm Password</label>
                <input type="password" id="cp" placeholder="Confirm password" required ref={cpasswRef} />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>)
}

export default SignUp;