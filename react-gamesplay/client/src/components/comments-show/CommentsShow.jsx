import styles from './CommentsShow.module.css';

export default function CommentsShow({ comments }) {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.length > 0 ? (
                    comments.map(({ _id, _ownerId, comment, pending, author }) => (
                        <li key={_id} className={`comment ${pending ? styles['comment-pending'] : ''}`}>
                            <p>
                                {author.email}: {comment}
                            </p>
                        </li>
                    ))
                ) : (
                    <p className="no-comment">No comments.</p>
                )}
            </ul>
        </div>
    );
}
