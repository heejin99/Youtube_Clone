import Axios from 'axios'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
function Comment(props) {
    const videoId = props.postId
    const user = useSelector(state => state.user)

    const [commentValue, setcommentValue] = useState("")
    // 타이핑 가능
    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }
    const onClick = (event) => {
        event.preventDefault();
        // writer : redux 에서 가져오는 방법
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                } else {
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
        
    }
    return (
        <div>
            <br />
            <p>댓글</p>
            <br />

            {/* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => (
                < SingleComment postId={videoId}/>
            ))}
            
            { /* Root Comment Form */ }

            <form style={{display: 'flex'}} onSubmit={onClick} >
                <textarea 
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해주세요."
                />
                <br />
                <button style={{ width: '20%', height: '52px '}} onClick={onClick}>확인</button>
            </form>
        </div>
    )
}

export default Comment
