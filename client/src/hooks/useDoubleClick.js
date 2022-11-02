import React, { useRef } from "react";

const useDoubleClick = (handleAction) => {
    
    const countClickRef = useRef(0)
    const clearTimeRef = useRef()

    const handleDoubleClick = (e) => {
        if (clearTimeRef.current) {
            clearTimeout(clearTimeRef.current)
        }

        countClickRef.current++
        clearTimeRef.current = setTimeout(() => {
            countClickRef.current = 0;
        }, 250)

        if (countClickRef.current < 2) return;

        countClickRef.current = 0
        clearTimeout(clearTimeRef.current)
        handleAction()
    }
    return handleDoubleClick
};

export default useDoubleClick;
