import { Helmet } from "react-helmet";
import { useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import { updateImageAction } from "../store/asyncMethods/PostMethods";
import {RESET_UPDATE_IMAGE_ERROR} from "../store/types/PostTypes";
import Loader from './Loader';


const EditImage = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const{push}=useHistory();
    const {updateImageErrors}= useSelector((state)=>state.UpdateImage);
    const {redirect, loading} = useSelector((state)=>state.PostReducer);
    const [state, setState] = useState({
        
        image: '',
        imagePreview: '',
        imageName:'Choose Image',
    });
    const fileHandle = (e)=>{
        if(e.target.files !== 0){
            setState({
                ...state,
                
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setState({
                    ...state, 
                    imagePreview: reader.result, 
                    image: e.target.files[0],
                    imageName: e.target.files[0].name
                });
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    useEffect(() => {
        if(updateImageErrors.length !==0 ){
            updateImageErrors.map(err => {
                    toast.error(err.msg);
            })
            dispatch({type: RESET_UPDATE_IMAGE_ERROR});
        }

    },[updateImageErrors]);

    useEffect(() => {
        if(redirect){
            push('/dashboard');
        }
    },[redirect]);

    const updateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image',state.image);
        dispatch(updateImageAction(formData));
    }

    return(
        <div className="container mt-100">
            <Helmet>
                <title>Update Image</title>
                <meta name="description" content="Update Image" />
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
            {!loading ? <div className="row">
                <div className="col-6">
                    <div className="car">
                        <h3 className="card__h3">Update Post Image</h3>
                        <form onSubmit={updateImage}>
                            <div className="group">
                                <label htmlFor="image" className="image__label">{state.imageName}</label>
                                <input type="file" name="image" id="image" onChange={fileHandle} />
                            </div>
                            <div className="group">
                                <div className="imagePreview">
                                    {state.imagePreview ? <img src={state.imagePreview}/> : " "}
                                </div>
                            </div>
                            <div className="group">
                            <input type="submit" value="Update Image" className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div> : <Loader/>}
        </div>
    );
}
export default EditImage;