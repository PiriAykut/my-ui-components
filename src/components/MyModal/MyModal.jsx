import React, { useEffect } from 'react';
import './MyModal.css'; // Modal için CSS dosyası

const MyModal = ({
  show,
  title,
  children,

  className = null,
  headerClassName = null,
  contentClassName = null,
  footerClassName = null,
  top = null,
  onClose = null,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  style = null,
}) => {

  const arrChild = React.Children.toArray(children);

  let childBody = null;
  let childFooter = null;

  for (let i = 0; i < arrChild.length; i++) {
    const el = arrChild[i];
    if (el.type.toString().includes("MyModalTagFooter")) {
      childFooter = el;
    } else if (el.type.toString().includes("MyModalTagBody")) {
      childBody = el;
    } else if (childBody == null) {
      childBody = el;
    }
  }

  // ESC tuşu ile kapatma işlevi
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeOnEsc, onClose]);

  if (!show) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target.className.includes('modal-overlay')) {
      onClose();
    }
  };


  return (
    <div className={`modal-overlay ${top ? 'top' : ''}`} onClick={handleBackdropClick} style={{ paddingTop: top }}>
      <div className={`modal ${className || ''}`} onClick={(e) => e.stopPropagation()} style={style}>
        <div className={`modal-header ${headerClassName || ''}`}>
          <h4>{title}</h4>
          {onClose &&
            <button type='button' className='close-button' onClick={onClose}>
              &times;
            </button>
          }
        </div>

        <div className={`modal-content ${contentClassName || ''}`}>{childBody}</div>

        {childFooter &&
          <div className={`modal-footer ${footerClassName || ''}`}>{childFooter}</div>
        }
      </div>
    </div>
  );
};

export default MyModal;
