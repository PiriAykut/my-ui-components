import React, { useEffect } from 'react';
import './MyModal.css'; // Modal için CSS dosyası

const MyModal = ({
  show,
  title,
  children,
  top = null,
  onClose = null,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  style = null
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
    const handleEsc = event => {
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
  const handleBackdropClick = e => {
    if (closeOnBackdropClick && e.target.className.includes('modal-overlay')) {
      onClose();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: 'modal-overlay ' + (top ? 'top' : ''),
    onClick: handleBackdropClick,
    style: {
      paddingTop: top
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation(),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h4", null, title), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "close-button",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, childBody), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, childFooter)));
};
export default MyModal;