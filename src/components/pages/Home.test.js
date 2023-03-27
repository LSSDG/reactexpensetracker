import { render,screen } from "@testing-library/react";
import Home from './Home'


test('testing header text in home page',()=>{
    render(<Home/>);
    const headerELement=screen.getByText('Welcome to the ExpenseTracker App');
    expect(headerELement).toBeInTheDocument();
})