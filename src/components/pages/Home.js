import { Link } from "react-router-dom";
import ExpenseContext from '../../store/expense-context'
import {useContext,useRef,useEffect,useState} from 'react';
import ExpenseItem from '../Expenses/ExpenseItem'

const Home = () => {
    const [items,setItems] =  useState([]);
    useEffect(()=>{

        async function fetchData(){
            const res = await fetch( 'https://reactexpensetracker-1a159-default-rtdb.firebaseio.com/items.json',
        {method:'GET',
        
        headers:{'Content-Type':'application/json' }
        });
        if(res.ok){const data =await res.json();
        const loadedItems=[];
        for(const key in data){
            loadedItems.push({
                id:key,
                amount:data[key].amount,
                desc:data[key].desc,
                cat:data[key].cat
            });
            setItems(loadedItems);
            
        }
        console.log(data);} else{
            console.log("error")
        }}
        fetchData();
    },[])
    const expenseCtx=useContext(ExpenseContext);
    const amountRef = useRef();
    const descRef = useRef();
    const catRef=useRef();

    const logout = ()=>{
        localStorage.setItem("userCurr",'');
    };
    const submitHandler = async (e) =>{
        e.preventDefault();
        const enteredAmount=amountRef.current.value;
        const enteredDesc=descRef.current.value;
        const enteredCat=catRef.current.value;
        const item ={
            amount:enteredAmount,
            desc:enteredDesc,
            category:enteredCat
        }
        const res = await fetch( 'https://reactexpensetracker-1a159-default-rtdb.firebaseio.com/items.json',
        {method:'POST',
        body:JSON.stringify(item),
        headers:{'Content-Type':'application/json' }
        });
        const data = res.json();
        console.log(data); 
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
    const expenseItems=<ul>{items.map((item)=>{
        return <ExpenseItem key={item.id} amount={item.amount} desc={item.desc} cat={item.cat}/>
    })}</ul>
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
            <input type="text" ref={descRef}/>
            <select ref={catRef}>
                <option>Food</option>
                <option>Salary</option>
                <option>Petrol</option>
                <option>Electricity</option>
            </select>
            <button type="submit">Add expense</button>
        </form>
        {expenseItems}
    </div>)
}

export default Home;