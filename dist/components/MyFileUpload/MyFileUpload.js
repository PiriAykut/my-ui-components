"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptType = void 0;
exports["default"] = MyFileUpload;
var _react = _interopRequireWildcard(require("react"));
var _pi = require("react-icons/pi");
var _reactImageFileResizer = _interopRequireDefault(require("react-image-file-resizer"));
var _reactHtml5CameraPhoto = _interopRequireWildcard(require("react-html5-camera-photo"));
require("react-html5-camera-photo/build/css/index.css");
var _MyWaiting = _interopRequireDefault(require("../MyWaiting/MyWaiting"));
var _MyAlert = require("../MyAlert/MyAlert");
var _MyFileUploadModule = _interopRequireDefault(require("./MyFileUpload.module.css"));
var _MyModal = _interopRequireDefault(require("../MyModal/MyModal"));
var _md = require("react-icons/md");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var AcceptType = exports.AcceptType = {
  ALL: "all",
  FILE: "file",
  IMAGE: "image",
  MEDIA: "media",
  PDF: "pdf",
  IMAGEPDF: "imagepdf"
};
Object.freeze(_MyAlert.MyAlertType);
function MyFileUpload(_ref) {
  var _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? AcceptType.ALL : _ref$accept,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$camera = _ref.camera,
    camera = _ref$camera === void 0 ? true : _ref$camera,
    _ref$maxSizeMB = _ref.maxSizeMB,
    maxSizeMB = _ref$maxSizeMB === void 0 ? 50 : _ref$maxSizeMB,
    onData = _ref.onData;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(AcceptType.ALL),
    _useState4 = _slicedToArray(_useState3, 2),
    accepttypes = _useState4[0],
    setAccepttypes = _useState4[1];
  var _useState5 = (0, _react.useState)(AcceptType.ALL),
    _useState6 = _slicedToArray(_useState5, 2),
    acceptlabel = _useState6[0],
    setAcceptlabel = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    cameraopen = _useState8[0],
    setCameraopen = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    cameraopened = _useState10[0],
    setCameraopened = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    devices = _useState12[0],
    setDevices = _useState12[1];
  var _useState13 = (0, _react.useState)(""),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedDeviceId = _useState14[0],
    setSelectedDeviceId = _useState14[1];
  var fileInputRef = (0, _react.useRef)(null);
  var type_files = ".pdf,.rar,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx,msword,msexcel,vnd.ms-excel,vnd.openxmlformats-officedocument.spreadsheetml.sheet,vnd.openxmlformats-officedocument.wordprocessingml.document";
  var type_image = ".jpg,.jpeg,.png";
  var type_media = ".mp3,.mp4,.avi,.wav";
  (0, _react.useEffect)(function () {
    switch (accept) {
      case AcceptType.ALL:
        setAccepttypes(type_files + "," + type_image + "," + type_media);
        setAcceptlabel("PNG, JPG, PDF, RAR, ZIP, MP3, MP4, AVI, WAV, Word-Excel");
        break;
      case AcceptType.IMAGE:
        setAccepttypes(type_image);
        setAcceptlabel("PNG, JPG ");
        break;
      case AcceptType.MEDIA:
        setAccepttypes(type_media);
        setAcceptlabel("MP3, MP4, AVI, WAV");
        break;
      case AcceptType.FILE:
        setAccepttypes(type_files + "," + type_image);
        setAcceptlabel("PDF, RAR, ZIP, PNG, JPG, Word-Excel ");
        break;
      case AcceptType.PDF:
        setAccepttypes(".pdf");
        setAcceptlabel("PDF");
        break;
      case AcceptType.IMAGEPDF:
        setAccepttypes(type_image + ",.pdf");
        setAcceptlabel("PNG, JPG, PDF");
        break;
    }
    navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
      var videoDevices = deviceInfos.filter(function (device) {
        return device.kind === "videoinput";
      });
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId); // İlk kamerayı varsayılan olarak seç
      }
    });
  }, []);
  var responseData = function responseData(resdata, _error) {
    if (_error.length > 0) {
      var message = _error.map(function (e, i) {
        return i + 1 + ".) <b><i>" + e.filename + "</i></b><br/>---- " + e.message + "<br/>";
      });
      (0, _MyAlert.MyAlert)("<br/><br/><div style='display: block;font-size:13px;width: 100%;text-align: left;'>" + message + "</div>", _MyAlert.MyAlertType.WARNING);
    }
    if (onData && (Array.isArray(resdata) && resdata.length > 0 || !Array.isArray(resdata) && resdata)) onData(resdata);
    setLoading(false);
  };
  var getBase64 = function getBase64(files) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var response_files = [];
    var _error = [];
    var fileReaderCalc = 0;
    setLoading(true);
    var _loop = function _loop() {
      var file = files[i];
      var filesize = parseInt(file.size) / 1024 / 1024; //MB

      var file_ext = file.type.split("/");
      file_ext = file_ext[file_ext.length - 1];
      if (filesize > maxSizeMB || accepttypes.indexOf(file_ext) == -1) {
        if (filesize > maxSizeMB) {
          _error.push({
            filename: file.name,
            // message: "Boyutu Max. Dosya Boyutundan büyük olamaz!" + ` <b>${maxSizeMB}MB</b>`,
            message: "Size cannot be larger than Max. File Size!" + " <b>".concat(maxSizeMB, "MB</b>")
          });
        } else {
          _error.push({
            filename: file.name,
            // message: t("Dosya türü desteklenmiyor!") + ` <b>${file_ext}</b>`,
            message: "File type not supported!" + " <b>".concat(file_ext, "</b>")
          });
        }
        if (files.length == i + 1 && response_files.length == 0) {
          responseData(response_files, _error);
          if (callback) {
            callback();
          }
        }
        return 1; // continue
      }
      var extension_type = type_image.indexOf(file_ext) > -1 ? "image" : "file";
      if (extension_type == "file") {
        var reader = new FileReader();
        reader.onload = function () {
          var fileitem = {
            base64: reader.result,
            extension: file_ext,
            extension_type: type_image.indexOf(file_ext) > -1 ? "image" : "file",
            file: file
          };
          if (!multiple) {
            response_files = fileitem;
          } else {
            response_files.push(fileitem);
          }
          fileReaderCalc++;
          if (files.length == fileReaderCalc) {
            responseData(response_files, _error);
            if (callback) {
              callback();
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        var reader_param = {
          file: file,
          index: i,
          ext: file_ext,
          type_image: type_image
        };
        _reactImageFileResizer["default"].imageFileResizer(file, 2600, 2600, "JPEG", 100, 0, function (uri) {
          fileReaderCalc++;
          var fileitem = {
            base64: uri,
            extension: reader_param.ext,
            extension_type: reader_param.type_image.indexOf(reader_param.ext) > -1 ? "image" : "file",
            file: reader_param.file
          };
          if (!multiple) {
            response_files = fileitem;
          } else {
            response_files.push(fileitem);
          }
          if (files.length == fileReaderCalc) {
            responseData(response_files, _error);
            if (callback) {
              callback();
            }
          }
        }, "base64");
      }
    };
    for (var i = 0; i < files.length; i++) {
      if (_loop()) continue;
    }

    // responseData(response_files, _error);
  };
  (0, _react.useEffect)(function () {
    if (!cameraopen) {
      setCameraopened(false);
    }
  }, [cameraopen]);
  var handleFileInputChange = function handleFileInputChange(e) {
    getBase64(e.target.files, function () {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.files = null;
      }
    });
  };
  var handleDeviceChange = function handleDeviceChange(event) {
    setSelectedDeviceId(event.target.value);
  };
  var handleTakePhoto = function handleTakePhoto(dataUri) {
    var fileitem = {
      base64: dataUri,
      extension: "jpg",
      extension_type: "image",
      file: ""
    };
    responseData([fileitem], []);
    setCameraopened(false);
    setCameraopen(false);
  };
  var handleCameraError = function handleCameraError() {
    // setCameraopened(false);
    // setCameraopen(false);
  };
  var handleCameraStart = function handleCameraStart(stream) {
    setCameraopened(true);
  };
  var handleCameraStop = function handleCameraStop() {
    //  setCameraopened(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MyWaiting["default"], {
      show: loading,
      message: ""
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _MyFileUploadModule["default"].myFileUploadContainer,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _MyFileUploadModule["default"].myFileUploadContainerItem,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _MyFileUploadModule["default"].myFileUploadContainerItemIcon,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiFileArrowUpLight, {
              className: _MyFileUploadModule["default"].Icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("h2", {
              className: _MyFileUploadModule["default"].myFileUploadContainerItemIconText,
              children: [acceptlabel, /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), " ", maxSizeMB, " MB"]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _MyFileUploadModule["default"].myFileUploadContainerItemFile,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
              type: "file",
              hidden: true,
              ref: fileInputRef,
              onChange: handleFileInputChange,
              multiple: multiple,
              accept: accepttypes
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: _MyFileUploadModule["default"].myFileUploadButton,
              onClick: function onClick() {
                return fileInputRef.current.click();
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_md.MdOutlineAttachFile, {})
            })]
          })]
        }), camera && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _MyFileUploadModule["default"].myFileUploadContainerItem,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _MyFileUploadModule["default"].myFileUploadContainerItemIcon,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCamera, {
              className: _MyFileUploadModule["default"].Icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: _MyFileUploadModule["default"].myFileUploadContainerItemIconText,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                children: "You can take a photo from the camera."
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _MyFileUploadModule["default"].myFileUploadContainerItemFile,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              type: "button",
              className: _MyFileUploadModule["default"].myFileUploadButton,
              onClick: function onClick() {
                return setCameraopen(true);
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCamera, {})
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MyModal["default"], {
      show: cameraopen,
      onClose: function onClose() {
        return setCameraopen(false);
      },
      title: t("Fotoğraf Çek"),
      closeOnEsc: false,
      closeOnBackdropClick: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactHtml5CameraPhoto["default"], {
          videoConstraints: {
            deviceId: selectedDeviceId ? {
              exact: selectedDeviceId
            } : undefined
          },
          onTakePhoto: function onTakePhoto(dataUri) {
            console.log(dataUri);
            handleTakePhoto(dataUri);
          },
          onCameraError: handleCameraError,
          onCameraStart: function onCameraStart(stream) {
            handleCameraStart(stream);
          },
          onCameraStop: function onCameraStop() {
            handleCameraStop();
          },
          idealFacingMode: _reactHtml5CameraPhoto.FACING_MODES.ENVIRONMENT,
          idealResolution: {
            width: 1024,
            height: 1024
          },
          imageType: _reactHtml5CameraPhoto.IMAGE_TYPES.JPG,
          isMaxResolution: true,
          isImageMirror: false,
          isSilentMode: false,
          isDisplayStartCameraError: true,
          isFullscreen: false,
          sizeFactor: 1
        })
      })
    })]
  });
}