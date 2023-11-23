import React from 'react'
import '../../styles/common/Button.css'

function Button({children, action, btnClass}) {
  return (
    <button onClick={action} className={`btn ${btnClass}`}>{children}</button>
  )
}

export default Button