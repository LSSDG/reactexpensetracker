import { Link } from "react-router-dom";
import ExpenseContext from '../../store/expense-context'
import {useContext,useRef} from 'react';

const Home = () => {
    const expenseCtx=useContext(ExpenseContext);
    const amountRef = useRef();
    const descRef = useRef();
    const catRef=useRef();

    const logout = ()=>{
        localStorage.setItem("userCurr",'');
    };
    const submitHandler = (e) =>{
        const enteredAmount=amountRef.current.value;
        const enteredDesc=descRef.current.value;
        const enteredCat=catRef.current.value;
        const item ={
            amount:enteredAmount,
            desc:enteredDesc,
            category:enteredCat
        }
        expenseCtx.addItem(item);
        console.log(item);
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
    const expenseItems=expenseCtx.items.map((item)=>{
        return <li key={Math.random()}>{item.amount}</li>
    })
    return(<div>
        
        <header>
        <h2>Welcome to the ExpenseTracker App</h2>
        <Link to='/profile'>Complete your profile now</Link>
        </header>

        <button onClick={verifyEmail}>Verify your email</button>
        <button onClick={logout}>Logout</button>
        <h2>ADD A EXPENSE</h2>
        <form onSubmit={submitHandler}>
            <label>Expense amount</label>
            <input type="number" ref={amountRef}/>
            <label>Expense Description</label>
            <input type="text"/>
            <select ref={catRef}>
                <option>Food</option>
                <option>Salary</option>
                <option>Petrol</option>
                <option>Electricity</option>
            </select>
            <button type="submit">Add expense</button>
        </form>
        {}
    </div>)
}

export default Home;