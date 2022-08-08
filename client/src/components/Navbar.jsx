import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../store/types/UserTypes";

const Navbar = ()=>{

    const dispatch = useDispatch();
    const {user} =useSelector((state)=>state.AuthReducer);

    const logout = () => {
        localStorage.removeItem("myToken");
        dispatch({ type: LOGOUT });
    }

    const Links = user ?(<div className="navbar__right">
    <li>
        <Link to="/create">Create Post</Link>
    </li>
    <li>
        <Link to='/dashboard'>{user.name}</Link>
    </li>
    <li>
        <span onClick={logout}>Logout</span>
    </li>
</div>):(<div className="navbar__right">
    <li>
        <Link exact to="/login">Login</Link>
    </li>
    <li>
        <Link exact to="/register">Register</Link>
    </li>
</div>);
    return(
        <nav className="navbar">
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar__left">
                        <Link exact to="/">
                            <img className="logo" src="/images/logo.png" alt="img" />
                        </Link>
                    </div>
                    {Links}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;