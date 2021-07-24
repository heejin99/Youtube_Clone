import React, { useEffect ,useState} from 'react'
import SingleComment from './SingleComment'
function ReplyComment(props) {
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })

        setChildCommentNumber(commentNumber)
    }, [props.commentLists])
    
    let renderReplyComment = (parentCommentId) => {
        return props.commentLists.map((comment, index) => (
            <React.Fragment>
                { 
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '50px'}}>
                        < SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId}/>
                        < ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} parentCommentId={comment._id} postId={props.videoId}/>
                    </div> 
                }
            </React.Fragment>
        ));
    }

    const HandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    return (
        <div>
            {ChildCommentNumber > 0 && 
                <p style={{fontSize: '14px', marginLeft: '50px', marginBottom: '20px', color: 'gray '}} onClick={HandleChange}>
                    답글 {ChildCommentNumber}개
                </p>
            }
            
            {OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }
            
        </div>
    )
}

export default ReplyComment
