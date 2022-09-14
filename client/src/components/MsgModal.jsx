import { Button } from 'antd'
import React from 'react'

export default function MsgModal({ msg, Fn, show, danger }) {
    return (
        <div
            className={
                'msg-modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center ' +
                (show ? 'show' : 'hide')
            }>
            <div className="msg-modal-box text-center justify-center whitespace-pre bg-white px-16 pt-8 pb-3 rounded-lg">
                <div className="msg pb-4">{msg}</div>
                <Button type="primary" shape="round" size="large" onClick={Fn} danger={danger}>
                    OK
                </Button>
            </div>
        </div>
    )
}
