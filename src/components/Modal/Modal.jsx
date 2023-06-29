import styles from './Modal.module.css';
import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';

export const Modal = ({ image, closeModal }) => {
  const overlayRef = useRef(null);
  useEffect(() => {
    overlayRef.current.focus();
  }, []);
  return (
    <div
      className={styles.Overlay}
      tabIndex={0}
      ref={overlayRef}
      onKeyDown={e => closeModal(e)}
      onClick={e => closeModal(e)}
    >
      <div className={styles.Modal}>
        <img src={image[0]} alt={image[1]} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: propTypes.array,
  closeModal: propTypes.func,
};
