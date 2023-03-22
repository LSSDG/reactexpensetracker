import { Link } from "react-router-dom";
import ExpenseContext from '../../store/expense-context'
import {useContext,useRef,useEffect,useState} from 'react';
import ExpenseItem from '../Expenses/ExpenseItem';
import { useDispatch,useSelector } from "react-redux";
import { authactions, expenseActions } from "../../store";
import store from "../../store";
import { Navigate ,useNavigate} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const itemsr=useSelector((state)=>state.expense.items)
    const data=useSelector((state)=>state.expense.data)
    const userEmail=useSelector((state)=>state.auth.email)
    const totalExpense=useSelector((state)=>state.expense.totalExpense)
    const overload=useSelector((state)=>state.expense.overload);
    console.log("this:"+userEmail)
    const cuserEmail=userEmail.replace(/[^a-zA-Z0-9]/g,'');
    const [adding,setAdding] =  useState({});
    const [items,setItems] =  useState([]);
    const [editing,setEditing]=useState(false)

    useEffect(()=>{
        const userToken=localStorage.getItem("userCurr");
        
        if(userToken==''){
            navigate('/login')
        }

        async function fetchData(){
            const email=localStorage.getItem('email')
            const res = await fetch( `https://reactexpensetracker-1a159-default-rtdb.firebaseio.com/${email}.json`,
        {method:'GET',
        
        headers:{'Content-Type':'application/json' }
        });
        if(res.ok){const data =await res.json();
            console.log(data);
        const loadedItems=[];
        for(const key in data){
            
             let temp={
                 id:key,
                 amount:data[key].amount,
                 desc:data[key].desc,
                 cat:data[key].cat
             };
            
            loadedItems.push(temp);
        }setItems(loadedItems);
        dispatch(expenseActions.getExpense(loadedItems))
        
        } else{
            console.log("error")
        }}
        fetchData();
        
    },[adding,data])
    const expenseCtx=useContext(ExpenseContext);
    const amountRef = useRef();
    const descRef = useRef();
    const catRef=useRef();

    const logout = ()=>{
        localStorage.setItem("userCurr",'');
        
        localStorage.setItem("email",'');
        dispatch(authactions.logout);

        navigate('/login');
    };

    const editHandler=async (amount,desc,cat,id)=>{
        console.log(amount);
         localStorage.setItem('id',id);
        amountRef.current.value=amount;
        descRef.current.value=desc;
        catRef.current.value=cat;
        //amountRef.current.focus();
        setEditing(true);

        
    }
    const submitHandler = async (e) =>{
        e.preventDefault();
        const email=localStorage.getItem('email')
        //const userEmail=useSelector((state)=>state.auth.email)
        //const cuserEmail=userEmail.replace(/[^a-zA-Z0-9]/g,'');
        const enteredAmount=amountRef.current.value;
        const enteredDesc=descRef.current.value;
        const enteredCat=catRef.current.value;
        const id=localStorage.getItem('id')
        const item ={
            amount:enteredAmount,
            desc:enteredDesc,
            category:enteredCat
        }//changing hereafter
        if(editing===true){
            setEditing(false);
            const res=await fetch(`https://reactexpensetracker-1a159-default-rtdb.firebaseio.com/${email}/${id}.json`,{
            method:'PUT',
            body:JSON.stringify(item),
            headers:{'Content-Type':'application/json' }
            
        })
        if(res.ok){
            const data=await res.json();
            dispatch(expenseActions.changing(data));
            
        }else{
            console.log("eror in editing");
        }
        }else{
        console.log(`"adding"${cuserEmail}`)
        const res = await fetch( `https://reactexpensetracker-1a159-default-rtdb.firebaseio.com/${email}.json`,
        {method:'POST',
        body:JSON.stringify(item),
        headers:{'Content-Type':'application/json' }
        });
        if(res.ok){const data = await res.json();
        //console.log(data); 
        //console.log(item);
        setAdding(data);}else{
            console.log("error in adding");
        }}
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
            const data=await res.json();

        }else{
            console.log("error");
        }
    }
    console.log(itemsr)
    const expenseItems=<ul className="list-group">{itemsr.map((item)=>{
        if(item.amount===undefined){return}else
        {return <ExpenseItem edit={editHandler} key={item.id} id={item.id} amount={item.amount} desc={item.desc} cat={item.cat}/>}
    })}</ul>

    //JSX RETURN
    return(<div>
        
        <header>
        <h2>Welcome to the ExpenseTracker App{totalExpense}</h2>
        <Link to='/profile'>Complete your profile now</Link>
        </header>

        <div className="bg-dark justify-content-between align-items-center"><button onClick={verifyEmail} className="btn btn-info m-2">Verify your email</button>
        <button onClick={logout} className="btn btn-danger m-2">Logout</button></div>
        <h2>ADD A EXPENSE</h2>
        {overload?<button className="btn btn-success">Get Premium</button>:<></>}
        <form onSubmit={submitHandler} className="container">
            <div className="form-group mb-3">
                <label>Expense amount</label>
                <input  className="form-control" type="number" ref={amountRef} required /></div>
                <div className="form-group mb-3"><label>Expense Description</label>
            <input className="form-control" type="text" ref={descRef} required/></div>
            <div className="form-group mb-3"><select  className="form-control">
                <option ref={catRef}>Food</option>
                <option ref={catRef}>Salary</option>
                <option ref={catRef}>Petrol</option>
                <option ref={catRef}>Electricity</option>
            </select></div>
            <button type="submit" className="btn btn-primary mb-3">Add expense</button>
        </form>
        {expenseItems}
    </div>)
}

export default Home;