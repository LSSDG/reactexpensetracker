import {useRef} from 'react'

const ForgotPassword=()=>{
    const emailRef=useRef();

    const submitHandler = async (e)=>{
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCjXxAz_5ptEoFTSrfIS3gbmCPMdHiehAs',{
            method:'POST',
            body:JSON.stringify({
                requestType:'PASSWORD_RESET',
                email:enteredEmail
            })

        });
        if(res.ok){
            const data=res.json();

        }else{
            console.log("error");
        }
    }
    return(<div>
        <form onSubmit={submitHanlder}>
            <label htmlFor="forgotemail">Enter your email</label>
            <input type="email" id="forgotemail" ref={emailRef}></input>
            <button type="submit">Reset Password</button>
        </form>
    </div>)
}

export default ForgotPassword;