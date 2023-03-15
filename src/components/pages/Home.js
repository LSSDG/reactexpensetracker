import { Link } from "react-router-dom"

const Home = () => {

    const verifyEmail = async () =>{
        const id = localStorage.getItem("userCurr");
        const res = await fetch('',{
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
    </div>)
}

export default Home;