"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MyAlert", {
  enumerable: true,
  get: function () {
    return _MyAlert.default;
  }
});
Object.defineProperty(exports, "MyContainer", {
  enumerable: true,
  get: function () {
    return _MyContainer.default;
  }
});
Object.defineProperty(exports, "MyEditor", {
  enumerable: true,
  get: function () {
    return _MyEditor.default;
  }
});
Object.defineProperty(exports, "MyFileUpload", {
  enumerable: true,
  get: function () {
    return _MyFileUpload.default;
  }
});
Object.defineProperty(exports, "MyImageCropper", {
  enumerable: true,
  get: function () {
    return _MyImageCropper.default;
  }
});
Object.defineProperty(exports, "MyInput", {
  enumerable: true,
  get: function () {
    return _MyInput.default;
  }
});
exports.MyInputType = void 0;
Object.defineProperty(exports, "MyMaps", {
  enumerable: true,
  get: function () {
    return _YandexMaps.default;
  }
});
Object.defineProperty(exports, "MyMenu", {
  enumerable: true,
  get: function () {
    return _MenuItem.default;
  }
});
Object.defineProperty(exports, "MyModal", {
  enumerable: true,
  get: function () {
    return _MyModal.default;
  }
});
Object.defineProperty(exports, "MyNotFound", {
  enumerable: true,
  get: function () {
    return _MyNotFound.default;
  }
});
Object.defineProperty(exports, "MyScrollableCard", {
  enumerable: true,
  get: function () {
    return _MyScrollableCard.default;
  }
});
Object.defineProperty(exports, "MySwitch", {
  enumerable: true,
  get: function () {
    return _MySwitch.default;
  }
});
Object.defineProperty(exports, "MyTable", {
  enumerable: true,
  get: function () {
    return _MyTable.default;
  }
});
Object.defineProperty(exports, "MyTabs", {
  enumerable: true,
  get: function () {
    return _MyTabs.default;
  }
});
Object.defineProperty(exports, "MyWaiting", {
  enumerable: true,
  get: function () {
    return _MyWaiting.default;
  }
});
Object.defineProperty(exports, "MyZoomImage", {
  enumerable: true,
  get: function () {
    return _MyZoomImage.default;
  }
});
var _MyInput = _interopRequireDefault(require("./components/MyInput/MyInput"));
var _MyAlert = _interopRequireDefault(require("./components/MyAlert/MyAlert"));
var _MyContainer = _interopRequireDefault(require("./components/MyContainer/MyContainer"));
var _MyEditor = _interopRequireDefault(require("./components/MyEditor/MyEditor"));
var _MyFileUpload = _interopRequireDefault(require("./components/MyFileUpload/MyFileUpload"));
var _MyImageCropper = _interopRequireDefault(require("./components/MyImageCropper/MyImageCropper"));
var _YandexMaps = _interopRequireDefault(require("./components/MyMaps/YandexMaps"));
var _MenuItem = _interopRequireDefault(require("./components/MyMenu/MenuItem"));
var _MyModal = _interopRequireDefault(require("./components/MyModal/MyModal"));
var _MyNotFound = _interopRequireDefault(require("./components/MyNotFound/MyNotFound"));
var _MyScrollableCard = _interopRequireDefault(require("./components/MyScrollableCard/MyScrollableCard"));
var _MyTable = _interopRequireDefault(require("./components/MyTable/MyTable"));
var _MyTabs = _interopRequireDefault(require("./components/MyTabs/MyTabs"));
var _MyWaiting = _interopRequireDefault(require("./components/MyWaiting/MyWaiting"));
var _MyZoomImage = _interopRequireDefault(require("./components/MyZoomImage/MyZoomImage"));
var _MySwitch = _interopRequireDefault(require("./components/MySwitch/MySwitch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Export types
const MyInputType = exports.MyInputType = {
  TEXT: 'text',
  PASSWORD: 'password',
  SELECT: 'select',
  SELECTFILTER: 'selectfilter',
  FILE: 'file',
  IMAGE: 'image',
  TEXTAREA: 'textarea',
  COLOR: 'color',
  READONLY: 'readonly',
  DATE: 'date',
  DATETIME: 'datetime',
  TIME: 'time',
  MONEY: 'money',
  NUMBER: 'number',
  MAIL: 'mail',
  PHONE: 'phone'
};