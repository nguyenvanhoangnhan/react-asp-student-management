import React from 'react'

export default function Loading() {
    return (
        <div
            style={{ borderRadius: 'inherit' }}
            className="loading flex flex-col justify-center items-center text-white h-full w-full absolute top-0 left-0 z-20 bg-black bg-opacity-10">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
