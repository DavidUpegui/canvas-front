import React from 'react'
import '../styles/CanvaTools.css'
import ColorSelect from './ColorSelect'
import Button from './common/Button'

function CanvaTools() {
  return (
    <div className='tools_container'>
      <h2 className='tools_title'>Tools</h2>
        <ColorSelect/>
      <Button btnClass= 'btnClear'>Clear Canva</Button>
      <Button btnClass= 'btnSave'>Save</Button>
    </div>
  )
}

export default CanvaTools