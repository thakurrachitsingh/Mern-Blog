  
import moment from 'moment';
const Comments = ({ comments }) => {
	return comments.length > 0
		? comments.map((comment) => (
				<div key={comment._id} className='commentSection'>
					<div className='post__header'>
						<div className='post__header__avatar'>
							{comment.userName ? comment.userName[0] : ''}
						</div>
						<div className='post__header__user'>
							<span>{comment.userName}</span>
							<span className="publishTime">{moment(comment.updatedAt).format('MMM Do YY')}</span>
						</div>
					</div>
					<div className='comment__body'>{comment.comment}</div>
				</div>
		  ))
		: 'No comments';
};
export default Comments;