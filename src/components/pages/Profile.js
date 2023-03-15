import {useRef,useEffect,useState} from 'react';


const Profile = () =>{
    const fnRef=useRef();
    const urlRef=useRef();
    const [name,setName]=useState();
    const [url,setUrl]=useState();
    useEffect(async ()=>{
        const id=localStorage.getItem("userCurr");
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCjXxAz_5ptEoFTSrfIS3gbmCPMdHiehAs',{
            method:'POST',
            body:JSON.stringify({
                idToken:id,
                
            })
        });
        if(res.ok){const data = await res.json();
            console.log(data);
        const users=data.users;
        const displayName=users.displayName;
        setName(displayName);
        setUrl(users.photoUrl)

        }else{
            console.log("error");
        }
    },[]);
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
        if(res.ok){const data = await res.json();
        const idToken=data.idToken;
        localStorage.setItem("userCurr",idToken);}else{
            console.log("error");
        }
    }
    return(<div>
        <form onSubmit={submitHandler}>
            <label>PROFILE DETAILS</label>
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" ref={fnRef} value={name}/>
            <label htmlFor="url">Age</label>
            <input type="text" id="url" ref={urlRef} value={url}/>
            <button type="submit">UPDATE</button>
        </form>
    </div>)
}

export default Profile;