import React from 'react'
import '../styles/canva.css'
import { useOnDraw } from '../hooks/useOnDraw'


function Canva() {
  const setCanvasRef = useOnDraw(onDraw);
  function onDraw(ctx, point, prevPoint){
   drawLine(prevPoint, point, ctx, '#000000', 5)
  }

  function drawLine(start, end, ctx, color, width){
    start  = start ?? end
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
    ctx.fill();
  }
  return (
    <div className='canva_container'>
        <canvas className='canva' ref={setCanvasRef}></canvas>
    </div> 
  )
}

export default Canva

