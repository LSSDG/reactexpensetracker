

const ExpenseItem=(props)=>{
    const editExpense=()=>{
        fetch('',{
            method:'PUT',
            
        })
    }
    return(<div>
        <li>
            <div>
                <h2>{props.amount}</h2>
            </div>
            <div>
                <span>{props.desc}</span>
                <span>{props.cat}</span>
            </div>
            <button onClick={editExpense}>Edit</button>
            <button>Delete</button>
        </li>
    </div>)
}

export default ExpenseItem;