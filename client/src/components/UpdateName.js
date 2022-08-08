import { Helmet } from "react-helmet";
import {useState, useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import Sidebar from "./Sidebar";
import { updateNameAction } from "../store/asyncMethods/profileMethods";
import toast, {Toaster} from "react-hot-toast";
import { RESET_PROFILE_ERRORS } from "../store/types/profileTypes";
import { REDIRECT_FALSE } from "../store/types/PostTypes";
import { useHistory } from "react-router";
const UpdateName = () => {

    const {user:{name, _id}} = useSelector((state)=>state.AuthReducer);
    const [userName, setUserName] = useState('');
    const dispatch=useDispatch();
    const {push} = useHistory();
    const {loading, redirect}=useSelector((state)=>state.PostReducer);
    const {updateErrors}= useSelector((state)=>state.updateName);
    const updateNameMethod=(e)=>{
        e.preventDefault();
        dispatch(updateNameAction({name: userName, id: _id}));
    }

    useEffect(() => {
		setUserName(name);
	},[]);

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

    },[redirect])

    return (
        <div className="container mt-100">
            <Helmet>
                <title>Update Name</title>
                <meta name="description" content="Update Name" />
            </Helmet>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <div className="row">
                <div className="col-3 p-15">
                    <Sidebar />
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card__h3">
                            <form onSubmit={updateNameMethod}>
                                <div className="group">
                                <input type='text' name='' className='group__control' placeholder='Name...' onChange={(e) => setUserName(e.target.value)} value={userName}/>
                                </div>
                                <div className="group">
                                    <input type="submit" value="Update Name" className="btn btn-default btn-block" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateName;