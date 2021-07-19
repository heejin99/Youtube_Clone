import React, {useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';

const { TextArea } = Input;

function SingleComment() {

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply) // Toggle
    }
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.CommentValue)
    }
    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">답글</span>
    ]
    return (
        <div>
            <Comment 
                actions={actions}
                author
                avatar={<Avatar src alt />}
                content
            />
            {OpenReply && 
                <form style={{display: 'flex'}} onSubmit >
                    <textarea 
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="댓글을 작성해주세요."
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px '}} onClick>확인</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
