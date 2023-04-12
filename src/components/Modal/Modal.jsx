import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContainer } from './Modal.styled';

export const Modal = ({ onClose, selectedImage, alt }) => {

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={selectedImage} alt={alt} />
      </ModalContainer>
    </ModalOverlay>
  );
  
}

Modal.propTypes = {
    selectedImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };