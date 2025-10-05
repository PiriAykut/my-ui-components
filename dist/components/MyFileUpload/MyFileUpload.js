"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptType = void 0;
exports.default = MyFileUpload;
var _react = _interopRequireWildcard(require("react"));
var _pi = require("react-icons/pi");
var _MyWaiting = _interopRequireDefault(require("../MyWaiting/MyWaiting"));
var _MyAlert = require("../MyAlert/MyAlert");
var _MyFileUploadModule = _interopRequireDefault(require("./MyFileUpload.module.css"));
var _MyModal = _interopRequireDefault(require("../MyModal/MyModal"));
var _md = require("react-icons/md");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Opsiyonel bağımlılıkları kontrol et
let Resizer, Camera, FACING_MODES, IMAGE_TYPES;
let hasImageResizer = false;
let hasCamera = false;
try {
  Resizer = require("react-image-file-resizer");
  hasImageResizer = true;
} catch (error) {
  console.warn("MyFileUpload: react-image-file-resizer bağımlılığı bulunamadı.");
}
try {
  const cameraModule = require("react-html5-camera-photo");
  Camera = cameraModule.default;
  FACING_MODES = cameraModule.FACING_MODES;
  IMAGE_TYPES = cameraModule.IMAGE_TYPES;
  require("react-html5-camera-photo/build/css/index.css");
  hasCamera = true;
} catch (error) {
  console.warn("MyFileUpload: react-html5-camera-photo bağımlılığı bulunamadı.");
}
const AcceptType = exports.AcceptType = {
  ALL: "all",
  FILE: "file",
  IMAGE: "image",
  MEDIA: "media",
  PDF: "pdf",
  IMAGEPDF: "imagepdf"
};
Object.freeze(_MyAlert.MyAlertType);
function MyFileUpload({
  multiple = false,
  accept = AcceptType.ALL,
  className = null,
  camera = true,
  maxSizeMB = 50,
  onData
}) {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [accepttypes, setAccepttypes] = (0, _react.useState)(AcceptType.ALL);
  const [acceptlabel, setAcceptlabel] = (0, _react.useState)(AcceptType.ALL);
  const [cameraopen, setCameraopen] = (0, _react.useState)(false);
  const [cameraopened, setCameraopened] = (0, _react.useState)(false);
  const [devices, setDevices] = (0, _react.useState)([]);
  const [selectedDeviceId, setSelectedDeviceId] = (0, _react.useState)("");
  const fileInputRef = (0, _react.useRef)(null);
  let type_files = ".pdf,.rar,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx,msword,msexcel,vnd.ms-excel,vnd.openxmlformats-officedocument.spreadsheetml.sheet,vnd.openxmlformats-officedocument.wordprocessingml.document";
  let type_image = ".jpg,.jpeg,.png";
  let type_media = ".mp3,.mp4,.avi,.wav";
  (0, _react.useEffect)(() => {
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
    navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
      const videoDevices = deviceInfos.filter(device => device.kind === "videoinput");
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId); // İlk kamerayı varsayılan olarak seç
      }
    });
  }, []);
  const responseData = (resdata, _error) => {
    if (_error.length > 0) {
      let message = _error.map((e, i) => {
        return i + 1 + ".) <b><i>" + e.filename + "</i></b><br/>---- " + e.message + "<br/>";
      });
      (0, _MyAlert.MyAlert)("<br/><br/><div style='display: block;font-size:13px;width: 100%;text-align: left;'>" + message + "</div>", _MyAlert.MyAlertType.WARNING);
    }
    if (onData && (Array.isArray(resdata) && resdata.length > 0 || !Array.isArray(resdata) && resdata)) onData(resdata);
    setLoading(false);
  };
  const getBase64 = (files, callback = null) => {
    let response_files = [];
    let _error = [];
    let fileReaderCalc = 0;
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let filesize = parseInt(file.size) / 1024 / 1024; //MB

      let file_ext = file.type.split("/");
      file_ext = file_ext[file_ext.length - 1];
      if (filesize > maxSizeMB || accepttypes.indexOf(file_ext) == -1) {
        if (filesize > maxSizeMB) {
          _error.push({
            filename: file.name,
            // message: "Boyutu Max. Dosya Boyutundan büyük olamaz!" + ` <b>${maxSizeMB}MB</b>`,
            message: "Size cannot be larger than Max. File Size!" + ` <b>${maxSizeMB}MB</b>`
          });
        } else {
          _error.push({
            filename: file.name,
            // message: t("Dosya türü desteklenmiyor!") + ` <b>${file_ext}</b>`,
            message: "File type not supported!" + ` <b>${file_ext}</b>`
          });
        }
        if (files.length == i + 1 && response_files.length == 0) {
          responseData(response_files, _error);
          if (callback) {
            callback();
          }
        }
        continue;
      }
      let extension_type = type_image.indexOf(file_ext) > -1 ? "image" : "file";
      if (extension_type == "file") {
        const reader = new FileReader();
        reader.onload = function () {
          let fileitem = {
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
        let reader_param = {
          file: file,
          index: i,
          ext: file_ext,
          type_image: type_image
        };
        Resizer.imageFileResizer(file, 2600, 2600, "JPEG", 100, 0, uri => {
          fileReaderCalc++;
          let fileitem = {
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
    }

    // responseData(response_files, _error);
  };
  (0, _react.useEffect)(() => {
    if (!cameraopen) {
      setCameraopened(false);
    }
  }, [cameraopen]);
  const handleFileInputChange = e => {
    getBase64(e.target.files, () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.files = null;
      }
    });
  };
  const handleDeviceChange = event => {
    setSelectedDeviceId(event.target.value);
  };
  const handleTakePhoto = dataUri => {
    let fileitem = {
      base64: dataUri,
      extension: "jpg",
      extension_type: "image",
      file: ""
    };
    responseData([fileitem], []);
    setCameraopened(false);
    setCameraopen(false);
  };
  const handleCameraError = () => {
    // setCameraopened(false);
    // setCameraopen(false);
  };
  const handleCameraStart = stream => {
    setCameraopened(true);
  };
  const handleCameraStop = () => {
    //  setCameraopened(false);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MyWaiting.default, {
      show: loading,
      message: ""
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _MyFileUploadModule.default.myFileUploadContainer,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _MyFileUploadModule.default.myFileUploadContainerItem,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _MyFileUploadModule.default.myFileUploadContainerItemIcon,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiFileArrowUpLight, {
              className: _MyFileUploadModule.default.Icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("h2", {
              className: _MyFileUploadModule.default.myFileUploadContainerItemIconText,
              children: [acceptlabel, /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), " ", maxSizeMB, " MB"]
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _MyFileUploadModule.default.myFileUploadContainerItemFile,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
              type: "file",
              hidden: true,
              ref: fileInputRef,
              onChange: handleFileInputChange,
              multiple: multiple,
              accept: accepttypes
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: _MyFileUploadModule.default.myFileUploadButton,
              onClick: () => fileInputRef.current.click(),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_md.MdOutlineAttachFile, {})
            })]
          })]
        }), camera && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _MyFileUploadModule.default.myFileUploadContainerItem,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: _MyFileUploadModule.default.myFileUploadContainerItemIcon,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCamera, {
              className: _MyFileUploadModule.default.Icon
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: _MyFileUploadModule.default.myFileUploadContainerItemIconText,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                children: "You can take a photo from the camera."
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: _MyFileUploadModule.default.myFileUploadContainerItemFile,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              type: "button",
              className: _MyFileUploadModule.default.myFileUploadButton,
              onClick: () => setCameraopen(true),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCamera, {})
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MyModal.default, {
      show: cameraopen,
      onClose: () => setCameraopen(false),
      title: t("Fotoğraf Çek"),
      closeOnEsc: false,
      closeOnBackdropClick: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Camera, {
          videoConstraints: {
            deviceId: selectedDeviceId ? {
              exact: selectedDeviceId
            } : undefined
          },
          onTakePhoto: dataUri => {
            console.log(dataUri);
            handleTakePhoto(dataUri);
          },
          onCameraError: handleCameraError,
          onCameraStart: stream => {
            handleCameraStart(stream);
          },
          onCameraStop: () => {
            handleCameraStop();
          },
          idealFacingMode: FACING_MODES.ENVIRONMENT,
          idealResolution: {
            width: 1024,
            height: 1024
          },
          imageType: IMAGE_TYPES.JPG,
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