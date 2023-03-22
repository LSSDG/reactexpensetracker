import { useDispatch,useSelector } from "react-redux";
import { authactions,expenseActions } from "../../store";

const ExpenseItem=(props)=>{
    const userEmail=useSelector((state)=>state.auth.email);
    const itemsr=useSelector((state)=>state.expense.items)
    const dispatch=useDispatch();
    const cuserEmail=userEmail.replace(/[^a-zA-Z0-9]/g,'');
    const editExpense=()=>{
        
        props.edit(props.amount,props.desc,props.cat,props.id);
    }
    const deleteExpense=()=>{
        async function deleteExpenses(){
            const email=localStorage.getItem('email')
            const res = await fetch(`https://reactexpensetracker-1a159-default-rtdb.firebaseio.com/${email}/${props.id}.json`,{
            method:'DELETE',
            
        });
        if(res.ok){
            const data = await res.json();
            dispatch(expenseActions.changing(data))
        }else{
            console.log("error in deleting expense");
        }
    }
        deleteExpenses();
    }
    return(<div>
        <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
            <div>
                <h4>Rs {props.amount}</h4>
            </div>
            <div>
                <span>Description:{props.desc}</span>
                <span>{props.cat}</span>
            </div>
            <button onClick={editExpense} className="btn btn-warning">Edit</button>
            <button onClick={deleteExpense} className="btn btn-danger">Delete</button>
        </li>
    </div>)
}

export default ExpenseItem;