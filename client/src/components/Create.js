import { Helmet } from 'react-helmet';
import {useState, useEffect} from "react";
import ReactQuill from 'react-quill';
import { createAction } from '../store/asyncMethods/PostMethods';
import 'react-quill/dist/quill.snow.css';
import {useSelector, useDispatch} from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import Loader from "./Loader";

const Create = (props)=>{
    const {loading}= useSelector((state) => state.PostReducer);
    const {createError, redirect} = useSelector((state)=>state.PostReducer);
    const dispatch = useDispatch();
    const {user:{_id, name }} = useSelector((state)=>state.AuthReducer);

    const[value, setValue] = useState("");
    const [currentImage, setCurrentImage]=useState("choose image");
    const [imagePreview, setImagePreview] = useState('');
    const [state, setState]=useState({
        title:"",
        description:'',
        image:'',
    });

    const handleDescription = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const [slug, setSlug]=useState('');
    const [slugButton, setSlugButton] = useState(false);
    const slugHandle = (e)=>{
        setSlugButton(true);
        setSlug(e.target.value);
    }

    const handleURL = (e)=>{
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'));
    }

    const handleInput = e =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        const creatSlug = e.target.value.trim().split(' ').join('-');
        setSlug(creatSlug);
    };

    const createPost = e => {
        e.preventDefault();
        const {title, description, image}=state;
        const formData = new FormData();
        formData.append('title', title)
        formData.append('body', value)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('slug', slug)
        formData.append('name', name)
        formData.append('id', _id)
        dispatch(createAction(formData));
    }
    
    const fileHandle=(e)=>{

        if(e.target.files.length !== 0){
            setCurrentImage(e.target.files[0].name);

            setState({
                ...state,
                [e.target.name]: e.target.files[0],
            })

            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    
    useEffect(()=>{

        if(redirect){
            props.history.push('/dashboard');
        }

        if(createError.length > 0){
            createError.map(err => {
                toast.error(err.msg);
            })
        }
    },[createError, redirect]);

    return <div className="create mt-100">
    <Helmet>
        <title>Create new Post</title>
        <meta name="description" content="Create new Post" />
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
        {!loading?<div className="container">
    <form onSubmit={createPost}>
        <div className="row ml-minus-15 mr-minus-15">
            <div className="col-6 p-15">
                <div className="card">
                    <h3 className="card__h3">Create a new Post</h3>                   
                        <div className="group">
                        <label htmlFor="title">Post Title</label>
                        <input type="text" value={state.value} onChange={handleInput} name="title" id="title" className="group__control" placeholder="Post title" />
                        </div>
                        <div className="group">
                            <label htmlFor="image" className="image__label">{currentImage}</label>
                            <input type="file" name="image" id="image" onChange={fileHandle} />
                        </div>
                        <div className="group">
                            <label htmlFor="body">
                                Post Body
                            </label>
                            <ReactQuill id="body" placeholder="Write something..." theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="group">
                            <label htmlFor="decription">Description</label>
                            <textarea name="description" onChange={handleDescription} defaultValue={state.description} id="description" maxLength="300" placeholder="Description...." cols="30" rows="10" className="group__control"></textarea>
                            <p className="length">{state.description ? `${state.description.length}/300` : "0/300"}</p>
                        </div>
                </div>
            </div>
            <div className="col-6 p-15">
                <div className="card">
                    <div className="group">
                        <label htmlFor="slug">Post URL</label>
                        <input type="text" name="slug" id="slug" onChange={slugHandle} value={slug} className="group__control" placeholder="Post URL"/>
                    </div>
                    <div className="group">
                        {slugButton? <button className="btn btn-default" onClick={handleURL}>Update Slug</button>: " "}
                    </div>
                    <div className="group">
                        <div className="imagePreview">
                            {imagePreview ? <img src={imagePreview}/> : " "}
                        </div>
                    </div>
                    
                    <div className="group">
                        <input type="submit" value="Create Post" className="btn btn-default btn-block" />
                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>: <Loader/> }
    </div>
}

export default Create;