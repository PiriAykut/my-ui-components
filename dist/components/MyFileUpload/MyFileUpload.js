import React, { useEffect, useState, useRef } from "react";
import { PiCamera, PiFileArrowUpLight } from "react-icons/pi";
import Resizer from "react-image-file-resizer";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useTranslation } from "../../context/TranslationContext";
import MyWaiting from "../MyWaiting/MyWaiting";
import { MyAlert, MyAlertType } from "../MyAlert/MyAlert";
import styles from "./MyFileUpload.module.css";
import MyModal from "../MyModal/MyModal";
export const AcceptType = {
  ALL: "all",
  FILE: "file",
  IMAGE: "image",
  MEDIA: "media",
  PDF: "pdf",
  IMAGEPDF: "imagepdf"
};
Object.freeze(MyAlertType);
export default function MyFileUpload({
  multiple = false,
  accept = AcceptType.ALL,
  className = null,
  camera = true,
  maxSizeMB = 50,
  onData
}) {
  const {
    t
  } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [accepttypes, setAccepttypes] = useState(AcceptType.ALL);
  const [acceptlabel, setAcceptlabel] = useState(AcceptType.ALL);
  const [cameraopen, setCameraopen] = useState(false);
  const [cameraopened, setCameraopened] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const fileInputRef = useRef(null);
  let type_files = ".pdf,.rar,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx,msword,msexcel,vnd.ms-excel,vnd.openxmlformats-officedocument.spreadsheetml.sheet,vnd.openxmlformats-officedocument.wordprocessingml.document";
  let type_image = ".jpg,.jpeg,.png";
  let type_media = ".mp3,.mp4,.avi,.wav";
  useEffect(() => {
    switch (accept) {
      case AcceptType.ALL:
        setAccepttypes(type_files + "," + type_image + "," + type_media);
        setAcceptlabel("PNG, JPG, PDF, RAR, ZIP, MP3, MP4, AVI, WAV veya Word-Excel Dosyaları");
        break;
      case AcceptType.IMAGE:
        setAccepttypes(type_image);
        setAcceptlabel(t("PNG veya JPG Dosyaları"));
        break;
      case AcceptType.MEDIA:
        setAccepttypes(type_media);
        setAcceptlabel(t("MP3, MP4, AVI veya WAV Dosyaları"));
        break;
      case AcceptType.FILE:
        setAccepttypes(type_files + "," + type_image);
        setAcceptlabel(t("PDF, RAR, ZIP, PNG, JPG veya Word-Excel Dosyaları"));
        break;
      case AcceptType.PDF:
        setAccepttypes(".pdf");
        setAcceptlabel(t("PDF Dosyaları"));
        break;
      case AcceptType.IMAGEPDF:
        setAccepttypes(type_image + ",.pdf");
        setAcceptlabel(t("PNG, JPG veya PDF Dosyaları"));
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
      MyAlert(t("Aşağıdaki dosyalar eklenemedi!") + "<br/><br/><div style='display: block;font-size:13px;width: 100%;text-align: left;'>" + message + "</div>", MyAlertType.WARNING);
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
            message: t("Boyutu Max. Dosya Boyutundan büyük olamaz!") + ` <b>${maxSizeMB}MB</b>`
          });
        } else {
          _error.push({
            filename: file.name,
            message: t("Dosya türü desteklenmiyor!") + ` <b>${file_ext}</b>`
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
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MyWaiting, {
    show: loading,
    message: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItem
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItemIcon
  }, /*#__PURE__*/React.createElement(PiFileArrowUpLight, {
    className: styles.Icon
  }), /*#__PURE__*/React.createElement("h2", {
    className: styles.myFileUploadContainerItemIconText
  }, acceptlabel, /*#__PURE__*/React.createElement("br", null), " ", t("En fazla"), " ", maxSizeMB, " MB")), /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItemFile
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    hidden: true,
    ref: fileInputRef,
    onChange: handleFileInputChange,
    multiple: multiple,
    accept: accepttypes
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadButton,
    onClick: () => fileInputRef.current.click()
  }, t("Dosya Seç")))), camera && /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItem
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItemIcon
  }, /*#__PURE__*/React.createElement(PiCamera, {
    className: styles.Icon
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItemIconText
  }, /*#__PURE__*/React.createElement("span", null, t("Kameradan fotoğraf çekebilirsin.")))), /*#__PURE__*/React.createElement("div", {
    className: styles.myFileUploadContainerItemFile
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles.myFileUploadButton,
    onClick: () => setCameraopen(true)
  }, t("Fotoğraf Çek")))))), /*#__PURE__*/React.createElement(MyModal, {
    show: cameraopen,
    onClose: () => setCameraopen(false),
    title: t("Fotoğraf Çek"),
    closeOnEsc: false,
    closeOnBackdropClick: false
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Camera, {
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
  }))));
}