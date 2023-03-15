import {useRef} from 'react';


const Profile = () =>{
    const fnRef=useRef();
    const urlRef=useRef();
    const submitHandler=async (e)=>{
        e.preventDefault();
        const enteredFullName=fnRef.current.value;
        const enteredUrl=urlRef.current.value;
        const user=localStorage.getItem("userCurr");
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCjXxAz_5ptEoFTSrfIS3gbmCPMdHiehAs',{
            method:'POST',
            body:JSON.stringify({
                idToken:user,
                displayName:enteredFullName,
                photoUrl:enteredUrl
            })
        });
        const data = res.json();
        const idToken=data.idToken;
        localStorage.setItem("userCurr",idToken);
    }
    return(<div>
        <form onSubmit={submitHandler}>
            <label>PROFILE DETAILS</label>
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" ref={fnRef}/>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" ref={urlRef}/>
            <button type="submit">UPDATE</button>
        </form>
    </div>)
}

export default Profile;