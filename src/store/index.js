

import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


const initialExpenseState = {items:[],totalExpense:0,data:{},overload:false}
const expenseSlice = createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        getExpense(state,action){
            state.items=action.payload;
            let total=0;
            state.totalExpense=state.items.reduce((tot,arr)=>{
                
                return tot + +(arr.amount);
            },0)
            if(state.totalExpense>10000){
                state.overload=true;
            }
        },
        addExpense(state,action){
            state.items.concat(action.payload)
        },
        removeExpense(state,action){
            state.items.filter(item=>item.id!==action.payload)
        },
        changing(state,action){
            state.data=action.payload;
        }
    }
})

const initialAuthState = {isAuthenticated:false,token:'',email:''}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.email=action.payload
        },
        logout(state){
            state.isAuthenticated=false;
            state.token='';
            state.email='';
            
        },
    }
})

const store = configureStore({
    reducer:{expense:expenseSlice.reducer,auth:authSlice.reducer}
});
export const expenseActions =expenseSlice.actions;
export const authactions=authSlice.actions;

export default store;