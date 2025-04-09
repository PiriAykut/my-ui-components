"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyAlertType = exports.MyAlert = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactConfirmAlert = require("react-confirm-alert");
require("react-confirm-alert/src/react-confirm-alert.css");
require("./MyAlert.css");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import Swal from "sweetalert2";

const MyAlertType = exports.MyAlertType = {
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  QUESTION: 'question'
};
Object.freeze(MyAlertType); // Enum sabitlerini değiştirmeyi engeller

const MyAlert = (message, type = MyAlertType.INFO, {
  title = '',
  buttontext = {
    confirm: 'Tamam',
    cancel: 'İptal'
  },
  callback = null
} = {}) => {
  let _showCancelButton = false;
  switch (type) {
    case MyAlertType.WARNING:
      title = title ? title : 'Uyarı';
      break;
    case MyAlertType.ERROR:
      title = title ? title : 'Hata!';
      break;
    case MyAlertType.SUCCESS:
      title = title ? title : 'İşlem Başarılı';
      break;
    case MyAlertType.INFO:
      title = title ? title : 'Bilgi';
      break;
    case MyAlertType.QUESTION:
      title = title ? title : 'Onaylıyor musunuz?';
      _showCancelButton = true;
      if (buttontext.confirm == "Tamam") {
        buttontext.confirm = "Evet";
        buttontext.cancel = "Hayır";
      }
      break;
  }
  let _buttons = [{
    label: buttontext.confirm,
    onClick: () => {
      if (callback) callback({
        isConfirmed: true,
        isDenied: false
      });
    }
  }];
  if (_showCancelButton) {
    _buttons.push({
      label: buttontext.cancel,
      onClick: () => {
        if (callback) callback({
          isConfirmed: false,
          isDenied: true
        });
      }
    });
  }
  (0, _reactConfirmAlert.confirmAlert)({
    title: title,
    message: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      dangerouslySetInnerHTML: {
        __html: typeof message === 'string' ? message : message.props?.children || message.toString()
      }
    }),
    buttons: _buttons,
    onClickOutside: () => {
      if (callback) callback({
        isConfirmed: false,
        isDenied: true
      });
    },
    onKeypressEscape: () => {
      if (callback) callback({
        isConfirmed: false,
        isDenied: true
      });
    }
  });

  // Swal.fire({
  //   title: title,
  //   html: message,
  //   icon: type,
  //   focusConfirm: true,
  //   confirmButtonText: buttontext.confirm,
  //   cancelButtonText: buttontext.cancel,
  //   showCancelButton: _showCancelButton
  // }).then((result) => {
  //   if (callback){
  //     callback(result);
  //   }
  //   // /* Read more about isConfirmed, isDenied below */
  //   // if (result.isConfirmed) {
  //   //   // Swal.fire("Saved!", "", "success");
  //   // } else if (result.isDenied) {
  //   //   // Swal.fire("Changes are not saved", "", "info");
  //   // }
  // });
};
exports.MyAlert = MyAlert;