import { Link } from "react-router-dom"

const Home = () => {
    return(<div>
        
        <header>
        <h2>Welcome to the ExpenseTracker App</h2>
        <Link to='/userdetails'>Complete your profile now</Link>
        </header>
    </div>)
}

export default Home;