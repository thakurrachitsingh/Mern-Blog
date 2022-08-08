import {useEffect} from 'react';
import { Helmet } from "react-helmet";
import Loader from './Loader';
import {useSelector, useDispatch} from "react-redux";
import {homePosts} from "../store/asyncMethods/PostMethods";
import {useParams, Link} from 'react-router-dom';
import moment from 'moment';
import Pagination from './Pagination';
// import { htmlToText } from 'html-to-text';
// // import { parse } from 'node-html-parser';
import ReactHtmlParser from 'react-html-parser'; 
var h2p = require('html2plaintext');

const Home = ()=>{

	let { page } = useParams();
	if (page === undefined) {
		page = 1;
	}
	const { loading } = useSelector((state) => state.PostReducer);
	const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(homePosts(page));
	}, [page]);


    return(
        <>
        <Helmet>
            <title>Home</title>
            <meta name="description" content="Home" />
        </Helmet>
        <div className="container">
            <div className="row mt-100" style={{marginBottom:'50px'}}>
                <div className="col-9 home">
                    {!loading ? posts.length>0 ? posts.map(post=>(
                        <div className="row post-style" key={post._id}>
                            <div className="col-8">
                                <div className="post">
                                    <div className="post__header">
                                        <div className="post__header__avatar">
                                            {post.userName[0]}
                                        </div>
                                        <div className="post__header__user">
                                            <span>{post.userName}</span>
                                            <span>{moment(post.updatedAt).format("MMM Do YY")}</span>
                                        </div>
                                    </div>
                                    <div className="post__body">
                                        <h1 className="post__body__title"> 
                                            <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                        </h1>
                                        <div className="post__body__details">
                                            {ReactHtmlParser(post.body.slice(0, 200))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="post__image">
                                    <img src={ `/images/${post.image}`  } alt="Post Image"/>
                                </div>
                            </div>
                        </div>
                    )) : <h1>No Post to display</h1>: <Loader/>}
                </div>
            </div>
            <div className="row">
                <div className="col-9">
                    <Pagination path='home' page={page} perPage={perPage} count={count}/>
                </div>
            </div>
        </div>
        </>
    );
}
export default Home;