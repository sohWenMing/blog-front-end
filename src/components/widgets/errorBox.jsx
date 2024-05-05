import './widget_stylesheets.scss'
import { useState } from 'react'

export default function ErrorBox({ message }) {

    return (
        <div className={!message ? 'error-box--wrapper' : 'error-box--wrapper show'}>
        <div className="error-box">
            <h6>{message}</h6>
        </div>
        </div>
    )
}