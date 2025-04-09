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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import Swal from "sweetalert2";

var MyAlertType = exports.MyAlertType = {
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  QUESTION: 'question'
};
Object.freeze(MyAlertType); // Enum sabitlerini değiştirmeyi engeller

var MyAlert = exports.MyAlert = function MyAlert(message) {
  var _message$props;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MyAlertType.INFO;
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$buttontext = _ref.buttontext,
    buttontext = _ref$buttontext === void 0 ? {
      confirm: 'Tamam',
      cancel: 'İptal'
    } : _ref$buttontext,
    _ref$callback = _ref.callback,
    callback = _ref$callback === void 0 ? null : _ref$callback;
  var _showCancelButton = false;
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
  var _buttons = [{
    label: buttontext.confirm,
    onClick: function onClick() {
      if (callback) callback({
        isConfirmed: true,
        isDenied: false
      });
    }
  }];
  if (_showCancelButton) {
    _buttons.push({
      label: buttontext.cancel,
      onClick: function onClick() {
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
        __html: typeof message === 'string' ? message : ((_message$props = message.props) === null || _message$props === void 0 ? void 0 : _message$props.children) || message.toString()
      }
    }),
    buttons: _buttons,
    onClickOutside: function onClickOutside() {
      if (callback) callback({
        isConfirmed: false,
        isDenied: true
      });
    },
    onKeypressEscape: function onKeypressEscape() {
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