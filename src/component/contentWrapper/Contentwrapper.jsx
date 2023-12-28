import React from 'react'
import "./style.scss"

const Contentwrapper = ({ children }) => {
    return (
        <div className="contentWrapper">{children}</div>
    )
}

export default Contentwrapper