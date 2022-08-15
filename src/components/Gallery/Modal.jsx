import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './Gallery.module.css'
import PropTypes from 'prop-types'
const modal = document.querySelector('#modal')



const Modal = ({ src, alt, unshowModal }) => {
    
    const esc = useCallback(
      (e) => {
          if (e.code === `Escape`) {
              unshowModal()
          }
      },
      [unshowModal],
    )

    useEffect(() => {
        window.addEventListener("keydown", esc)
    
        return () => {
            window.removeEventListener("keydown", esc)
      }
    }, [esc])
    
    
    const onBackClick = e => {
        if (e.currentTarget === e.target) {
            unshowModal()
        }
    }

    return createPortal(
            <div className={styles.Overlay} onClick = {onBackClick}>
                <div className={styles.Modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>, modal   
    );
}

Modal.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    unshowModal: PropTypes.func,
}

export default Modal
