

const ExpenseItem=(props)=>{
    return(<div>
        <li>
            <div>
                <h2>{props.amount}</h2>
            </div>
            <div>
                <span>{props.desc}</span>
                <span>{props.cat}</span>
            </div>
        </li>
    </div>)
}

export default ExpenseItem;