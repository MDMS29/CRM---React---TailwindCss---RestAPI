import React from 'react'

const Error = ({ children }) => {
    return (
        <div className='text-center mb-5 bg-red-600 p-3 uppercase font-bold text-white'>
            {children}
        </div>
    )
}

export default Error