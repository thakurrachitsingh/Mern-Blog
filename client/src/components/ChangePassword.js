import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import {useHistory} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import { updatePasswordAcion } from "../store/asyncMethods/profileMethods";
import Loader from "./Loader";
import { RESET_PROFILE_ERRORS } from "../store/types/profileTypes";
import { REDIRECT_FALSE } from "../store/types/PostTypes";

const ChangePassword = ()=>{

    const[state, setState] = useState({
        current :'',
        newPassword :'',
        newConfirmedPassword:'',
        useId: null,
    })

    const {push}=useHistory();
    const dispatch = useDispatch();
    const {loading, redirect}=useSelector((state)=>state.PostReducer);
    const {updateErrors}= useSelector((state)=>state.updateName);
    const {user:{_id}}= useSelector((state)=>state.AuthReducer);
    const updatePassword = (e)=>{
        e.preventDefault();
        
        dispatch(updatePasswordAcion({current: state.current, newPassword: state.newPassword,newConfirmedPassword: state.newConfirmedPassword, userId: _id}));
    }
    useEffect(() => {
        if (updateErrors.length > 0) {
			updateErrors.map((error) => toast.error(error.msg));
            dispatch({ type: RESET_PROFILE_ERRORS });
        }
    },[updateErrors]);

    useEffect(() => {
        
        if(redirect){
            dispatch({ type: REDIRECT_FALSE });
            push('/dashboard');
        }

    },[redirect]);

    return !loading ? <div className="container mt-100">
    <Helmet>
        <title>Update Password</title>
        <meta name="description" content="Update Password" />
    </Helmet>
    <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
            style: {
                fontSize: '14px',                },
            }}
    />
    <div className="row ml-minus-15 mr-minus-15">
        <div className="col-3 p-15">
            <Sidebar />
        </div>
        <div className="col-9 p-15">
            <div className="card">
                <h3 className="card__h3">Change Password</h3>
                <form onSubmit={updatePassword}>
                    <div className="group">
                        <input type="password" name="" id="" className="group__control" placeholder="Current Password" value={state.current} onChange={(e)=>setState({...state, current: e.target.value})} />
                    </div>
                    <div className="group">
                        <input type="password" name="" id="" className="group__control" placeholder="New Password" value={state.newPassword} onChange={(e)=>setState({...state, newPassword: e.target.value})} />
                    </div>
                    <div className="group">
                        <input type="password" name="" id="" className="group__control" placeholder="Confirm Password" value={state.newConfirmedPassword} onChange={(e)=>setState({...state, newConfirmedPassword: e.target.value})} />
                    </div>
                    <div className="group">
                            <input type="submit" value="Update Password" className="btn btn-default btn-block" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
 : <Loader />;
}
export default ChangePassword;