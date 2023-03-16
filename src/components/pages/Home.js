import { Link } from "react-router-dom"

const Home = () => {
    const logout = ()=>{
        localStorage.setItem("userCurr",'');
    }

    const verifyEmail = async () =>{
        const id = localStorage.getItem("userCurr");
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCjXxAz_5ptEoFTSrfIS3gbmCPMdHiehAs',{
            method:'POST',
            body:JSON.stringify({
                requestType:'VERIFY_EMAIL',
                idToken:id
            })

        });
        if(res.ok){
            const data=res.json();

        }else{
            console.log("error");
        }
    }
    return(<div>
        
        <header>
        <h2>Welcome to the ExpenseTracker App</h2>
        <Link to='/profile'>Complete your profile now</Link>
        </header>

        <button onClick={verifyEmail}>Verify your email</button>
        <button onClick={logout}>Logout</button>
    </div>)
}

export default Home;