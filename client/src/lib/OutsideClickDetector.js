import React, { useRef, useEffect } from 'react';
import { isFunction } from 'lodash';

function useOutsideClickDetector(ref, onClickOutside) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (isFunction(onClickOutside)) {
                    onClickOutside();
                }
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClickOutside]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideClickDetector({ onClickOutside, ...props }) {
    const wrapperRef = useRef(null);
    useOutsideClickDetector(wrapperRef, onClickOutside);

    return <div ref={wrapperRef}>{props.children}</div>;
}
