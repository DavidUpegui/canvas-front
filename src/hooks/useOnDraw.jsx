import { useRef } from "react";

export function useOnDraw(onDraw) {

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const mouseMoveListenerRef = useRef(null);
  const mouseDownListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);
  const prevPointRef = useRef(null)
  function setCanvasRef(ref) {
    if (!ref) return;
    if(canvasRef.current){
      canvasRef.current.removeEventListener("mousemove", mouseMoveListenerRef.current)
      canvasRef.current.removeEventListener("mousedown", mouseDownListenerRef.current)
      canvasRef.current.removeEventListener("mouseup", mouseUpListenerRef.current)
    }
    canvasRef.current = ref;
    scalateCanvas();
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  function initMouseMoveListener() {
    const mouseMoveListener = (e) => {
      if(isDrawingRef.current){
        const point = calculateCanvasPoint(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext("2d");
        if (onDraw) onDraw(ctx, point, prevPointRef.current);
        prevPointRef.current = point;
      }
    };
    mouseMoveListenerRef.current = mouseMoveListener
    window.addEventListener("mousemove", mouseMoveListener);
  }

  function initMouseDownListener(){
    if(!canvasRef.current) return
    const mouseDownListener = () =>{
      isDrawingRef.current = true
    }
    mouseDownListenerRef.current = mouseDownListener
    canvasRef.current.addEventListener('mousedown', mouseDownListener)
  }

  function initMouseUpListener(){
    const mouseUpListener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    }
    mouseUpListenerRef.current = mouseUpListener
    canvasRef.current.addEventListener('mouseup', mouseUpListener)
  }

  function scalateCanvas() {
    const canvasBoundaries = canvasRef.current.getBoundingClientRect();
    const scale = canvasBoundaries.width / canvasBoundaries.height;
    const canvasPixelWidth = 700;
    const canvasPixelHeight = canvasPixelWidth / scale;
    canvasRef.current.width = canvasPixelWidth;
    canvasRef.current.height = canvasPixelHeight;
  }

  function calculateCanvasPoint(clientX, clientY) {
    if (canvasRef.current) {
      const canvasBoundaries = canvasRef.current.getBoundingClientRect();
      const mouseX = clientX - canvasBoundaries.left;
      const mouseY = clientY - canvasBoundaries.top;
      return {
        x: (mouseX / canvasBoundaries.width) * canvasRef.current.width,
        y: (mouseY / canvasBoundaries.height) * canvasRef.current.height,
      };
    } else {
      return null;
    }
  }

  return setCanvasRef;
}
