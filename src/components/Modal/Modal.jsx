import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { setModalOpen } from "../../store/slices/modal/modalSlice";
import { StyledModal } from './styles';
function Modal({children,target}) {
    const dispatch = useDispatch();
    const handleClickOutside = useCallback((e) => {
        console.log(`${target} modal clicked : `, e.currentTarget);
        e.stopPropagation();
        dispatch(setModalOpen({target,value:false}));
        // Close search modal
    }, []);
    return (
        <StyledModal onClick={handleClickOutside}>
           {children}
        </StyledModal>
    )
}

export default Modal
