import { Helmet } from "react-helmet";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from "../store/types/PostTypes";
import toast, {Toaster} from "react-hot-toast";
import { fetchPosts } from "../store/asyncMethods/PostMethods";
import {Link, useParams, useHistory} from "react-router-dom";
import {BsPencil, BsArchive, BsImage} from "react-icons/bs";
import axios from "axios";
import moment from 'moment';
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import ParticleBackground from "./ParticleBackground";

const Dashboard = () => {
    const {redirect, message, loading} = useSelector((state)=>state.PostReducer);
    
    const { user: {_id}, token } = useSelector((state)=>state.AuthReducer);
    const {posts, count, perPage}=useSelector((state)=>state.FetchPosts);
    const {push} = useHistory();
    let {page} = useParams();
    if(page === undefined){
        page=1;
    }
    const dispatch = useDispatch();

    const deletePost = async (id) =>{
        const confirm = window.confirm("Are you really want to delete this post ?");

        if(confirm){
            dispatch({type:SET_LOADER});
            try {
                const config = {headers: {Authorization: `Bearer ${token}`,},};
                const {data: {msg}} = await axios.get(`/deletepost/${id}`, config)
                dispatch(fetchPosts(_id, page));
                dispatch({type: SET_MESSAGE, payload: msg});
                dispatch({type: CLOSE_LOADER});
                push('/dashboard');
            } catch (error) {
                dispatch({ type: CLOSE_LOADER });
                console.log(error);
            }
        }
        
    }
    useEffect(() => {
        dispatch(fetchPosts(_id, page));
    },[page]);

    useEffect(()=>{
        if(redirect){
            dispatch({type:REDIRECT_FALSE});
        }
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MESSAGE});
        }
    },[message]);
    return <>
        <Helmet>
            <title>User DashBoard</title>
            <meta name="description" content="User Dashboard" />
        </Helmet>
        <Toaster
		position='top-center'
		reverseOrder={false}
			toastOptions={{
				style: {
					fontSize: '14px',
				},
			}}
		/>
        
        <div className="container mt-100">
            <div className="row ml-minus-15 mr-minus-15">
                <div className="col-3 p-15">
                    <Sidebar/>
                </div>
                <div className="col-9 p-15">
                    { !loading ? posts.length > 0 ? posts.map(post=>(
                        <div className="dashboard__post" key={post._id}>
                            <div className="dashboard__post__title">
                                <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                <span>Posted : {moment(post.updatedAt).fromNow()}</span>
                            </div>
                            <div className="dashboard__post__links">
                                <Link to={`updateImage/${post._id}`}><BsImage className='icon'/></Link>
                                <Link className="icon" to={`/edit/${post._id}`}><BsPencil/></Link>
                                <BsArchive className="icon" onClick={()=> deletePost(post._id)}/>
                            </div>
                        </div>
                    )) 
                    : <h1>You dont have any post</h1> 
                    : <Loader/>}
                    <Pagination path='dashboard' page={page} perPage={perPage} count={count}/>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;