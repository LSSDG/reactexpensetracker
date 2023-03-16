 
import React from 'react';
import  {useReducer} from 'react';


const ExpenseContext=React.createContext();
const initialState ={
    items:[],
}
const expenseReducer=(state,action)=>{
    if(action.type==="ADD"){
        const updatedItems=state.items.concat(action.item);
        return{
            items:updatedItems
        }
    }
    
}
export const ExpenseContextProvider = (props)=>{
    const [expenseState,dispatchAction] = useReducer(expenseReducer,initialState);
    const addExpenseHandler=(item)=>{
        dispatchAction({
            type:'ADD',
            item:item
        })
    };
    const removeExpenseHandler=(id)=>{
        dispatchAction({
            type:'REMOVE',
            id:id
        })
    };



    const expenseCtx = {
        items:expenseState.items,
        addItem:addExpenseHandler,
    }





    return(<ExpenseContext.Provider value={expenseCtx}>{props.children}</ExpenseContext.Provider>)
};


export default ExpenseContext;