import Axios from 'axios'
import React, {useEffect, useState} from 'react'


function Subscriber(props) {
    const userTo = props.userTo
    const userFrom = props.userFrom

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    
    useEffect(() => {
        const subscribeVariables = { userTo: userTo, userFrom: userFrom}
        // let variable = {userTo: props.userTo, userFrom : props.userFrom}
        Axios.post('/api/subscribe/subsribeNumber', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })

       

        Axios.post('/api/subscirbe/subscribed', subscribeVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('정보를 받아오지 못했습니다.')
                }
            })
    }, [])

    const onSubscribe = () => {
        let subscribeVariables = {userTo: userTo, userFrom: userFrom}
        if (Subscribed) {
            // 구독 중이면
            Axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber-1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 취소를 실패하였습니다.')
                    }
                })
        } else { 
            // 구독중이 아니라면
            Axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber+1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독을 실패하였습니다.')
                    }
                })
        }
    }
    return (
        <div>
            <button 
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}
export default Subscriber
