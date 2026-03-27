import React, { useEffect, useState, useRef } from "react";
import { PiCamera, PiFileArrowUpLight } from "react-icons/pi";
import MyWaiting from "../MyWaiting/MyWaiting";
import { MyAlert, MyAlertType } from "../MyAlert/MyAlert";
import styles from "./MyFileUpload.module.css"
import MyModal from "../MyModal/MyModal";
import { MdOutlineAttachFile } from "react-icons/md";

// Opsiyonel bağımlılıkları kontrol et
let Resizer, Camera, FACING_MODES, IMAGE_TYPES;
let hasImageResizer = false;
let hasCamera = false;

try {
    const raw = require("react-image-file-resizer");
    // Vite/ESM: default export is { default: { imageFileResizer } }; CJS often { imageFileResizer }
    const resolved = raw && (raw.default ?? raw);
    if (resolved && typeof resolved.imageFileResizer === "function") {
        Resizer = resolved;
        hasImageResizer = true;
    }
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

export const MyFileUploadAcceptType = {
    ALL: "all",
    FILE: "file",
    IMAGE: "image",
    MEDIA: "media",
    PDF: "pdf",
    IMAGEPDF: "imagepdf",
};

Object.freeze(MyFileUploadAcceptType);

export default function MyFileUpload({
    t = null,
    name = null,
    required = false,
    multiple = false,
    accept = MyFileUploadAcceptType.ALL,
    camera = true,
    maxSizeMB = 50,
    onData,

    label = null,
    labelClassName = null,

    className = null,
    classNameContainer = null,
    classNameItem = null,
    classNameIcon = null,
    classNameButton = null,
    classNameModal = null,
    classNameButtonIcon = null,
}) {

    const localT = typeof t === "function" ? t : ((key) => key);

    const [loading, setLoading] = useState(false);
    const [MyFileUploadAcceptTypes, setMyFileUploadAcceptTypes] = useState(MyFileUploadAcceptType.ALL);
    const [acceptlabel, setAcceptlabel] = useState(MyFileUploadAcceptType.ALL);
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
            case MyFileUploadAcceptType.ALL:
                setMyFileUploadAcceptTypes(
                    type_files + "," + type_image + "," + type_media
                );
                setAcceptlabel("PNG, JPG, PDF, RAR, ZIP, MP3, MP4, AVI, WAV, Word-Excel");
                break;
            case MyFileUploadAcceptType.IMAGE:
                setMyFileUploadAcceptTypes(type_image);
                setAcceptlabel("PNG, JPG ");
                break;
            case MyFileUploadAcceptType.MEDIA:
                setMyFileUploadAcceptTypes(type_media);
                setAcceptlabel("MP3, MP4, AVI, WAV");
                break;
            case MyFileUploadAcceptType.FILE:
                setMyFileUploadAcceptTypes(type_files + "," + type_image);
                setAcceptlabel("PDF, RAR, ZIP, PNG, JPG, Word-Excel "
                );
                break;
            case MyFileUploadAcceptType.PDF:
                setMyFileUploadAcceptTypes(".pdf");
                setAcceptlabel("PDF");
                break;
            case MyFileUploadAcceptType.IMAGEPDF:
                setMyFileUploadAcceptTypes(type_image + ",.pdf");
                setAcceptlabel("PNG, JPG, PDF");
                break;
        }

        navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
            const videoDevices = deviceInfos.filter(
                (device) => device.kind === "videoinput"
            );
            setDevices(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedDeviceId(videoDevices[0].deviceId); // İlk kamerayı varsayılan olarak seç
            }
        });
    }, []);

    const responseData = (resdata, _error) => {
        if (_error.length > 0) {
            let message = _error.map((e, i) => {
                return (
                    i +
                    1 +
                    ".) <b><i>" +
                    e.filename +
                    "</i></b><br/>---- " +
                    e.message +
                    "<br/>"
                );
            });

            MyAlert(
                "<br/><br/><div style='display: block;font-size:13px;width: 100%;text-align: left;'>" +
                message +
                "</div>",
                MyAlertType.WARNING
            );
        }

        if (onData && (
            (Array.isArray(resdata) && resdata.length > 0) ||
            (!Array.isArray(resdata) && resdata)
        )
        ) {
            if (name) {
                onData({
                    target: {
                        name: name,
                        files: Array.isArray(resdata) ? resdata : [resdata],
                        value: Array.isArray(resdata) ? resdata : [resdata],
                    },
                    value: Array.isArray(resdata) ? resdata : [resdata],
                });
            } else {
                onData(resdata);
            }
        }

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

            if (filesize > maxSizeMB || MyFileUploadAcceptTypes.indexOf(file_ext) == -1) {
                if (filesize > maxSizeMB) {
                    _error.push({
                        filename: file.name,
                        // message: "Boyutu Max. Dosya Boyutundan büyük olamaz!" + ` <b>${maxSizeMB}MB</b>`,
                        message: "Size cannot be larger than Max. File Size!" + ` <b>${maxSizeMB}MB</b>`,
                    });
                } else {
                    _error.push({
                        filename: file.name,
                        // message: t("Dosya türü desteklenmiyor!") + ` <b>${file_ext}</b>`,
                        message: "File type not supported!" + ` <b>${file_ext}</b>`,
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

            if (extension_type == "file" || !hasImageResizer) {
                const reader = new FileReader();
                reader.onload = function () {
                    let fileitem = {
                        base64: reader.result,
                        extension: file_ext,
                        extension_type: type_image.indexOf(file_ext) > -1 ? "image" : "file",
                        file: file,
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
                    type_image: type_image,
                };

                Resizer.imageFileResizer(
                    file,
                    2600,
                    2600,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        fileReaderCalc++;

                        let fileitem = {
                            base64: uri,
                            extension: reader_param.ext,
                            extension_type:
                                reader_param.type_image.indexOf(reader_param.ext) >
                                    -1
                                    ? "image"
                                    : "file",
                            file: reader_param.file,
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
                    },
                    "base64"
                );
            }
        }

        // responseData(response_files, _error);
    };

    useEffect(() => {
        if (!cameraopen) {
            setCameraopened(false);
        }
    }, [cameraopen]);

    const handleFileInputChange = (e) => {
        getBase64(e.target.files, () => {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
                fileInputRef.current.files = null;
            }
        });
    };

    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };
    const handleTakePhoto = (dataUri) => {
        let fileitem = {
            base64: dataUri,
            extension: "jpg",
            extension_type: "image",
            file: "",
        };

        responseData([fileitem], []);

        setCameraopened(false);
        setCameraopen(false);
    };

    const handleCameraError = () => {
        // setCameraopened(false);
        // setCameraopen(false);
    };

    const handleCameraStart = (stream) => {
        setCameraopened(true);
    };

    const handleCameraStop = () => {
        //  setCameraopened(false);
    };

    return (
        <>
            <MyWaiting show={loading} message="" />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
                {label && (
                    <div
                        style={{
                            display: "block",
                            fontSize: 11,
                            fontWeight: "bold",
                            color: "black",
                            marginBottom: "0.25rem",
                            paddingLeft: "0.5rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        }}
                        className={labelClassName ? labelClassName : ''}
                    >
                        {label} {required && <span style={{ color: 'red' }}>*</span>}
                    </div>
                )}
                <div className={styles.myFileUploadContainer + (className != null ? " " + className : '')}>
                    <div className={styles.myFileUploadContainerItem + (classNameItem != null ? " " + classNameItem : '')}>
                        <div className={styles.myFileUploadContainerItemIcon}>
                            <PiFileArrowUpLight className={styles.Icon + (classNameIcon != null ? " " + classNameIcon : '')} />
                            <h2 className={styles.myFileUploadContainerItemIconText}>
                                {acceptlabel}
                                <br /> {maxSizeMB} MB
                            </h2>
                        </div>
                        <div className={styles.myFileUploadContainerItemFile}>
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileInputChange}
                                multiple={multiple}
                                accept={MyFileUploadAcceptTypes}
                            />
                            <div
                                className={styles.myFileUploadButton + (classNameButton != null ? " " + classNameButton : '')}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <MdOutlineAttachFile className={(classNameButtonIcon != null ? classNameButtonIcon : '')} />
                            </div>
                        </div>
                    </div>
                    {camera && (
                        <div className={styles.myFileUploadContainerItem + (classNameItem != null ? " " + classNameItem : '')}>
                            <div className={styles.myFileUploadContainerItemIcon}>
                                <PiCamera className={styles.Icon + (classNameIcon != null ? " " + classNameIcon : '')} />
                                <div className={styles.myFileUploadContainerItemIconText}>
                                    <span>
                                        {localT("Kameradan fotoğraf çekebilirsin.")}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.myFileUploadContainerItemFile}>
                                <button
                                    type="button"
                                    className={styles.myFileUploadButton + (classNameButton != null ? " " + classNameButton : '')}
                                    onClick={() => setCameraopen(true)}
                                >
                                    <PiCamera className={(classNameButtonIcon != null ? classNameButtonIcon : '')} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <MyModal
                show={cameraopen}
                onClose={() => setCameraopen(false)}
                title={localT("Fotoğraf Çek")}
                closeOnEsc={false}
                closeOnBackdropClick={false}
                className={classNameModal != null ? " " + classNameModal : ''}
            >
                <div>
                    <Camera
                        videoConstraints={{
                            deviceId: selectedDeviceId
                                ? { exact: selectedDeviceId }
                                : undefined,
                        }}
                        onTakePhoto={(dataUri) => {
                            // console.log(dataUri);
                            handleTakePhoto(dataUri);
                        }}
                        onCameraError={handleCameraError}
                        onCameraStart={(stream) => {
                            handleCameraStart(stream);
                        }}
                        onCameraStop={() => {
                            handleCameraStop();
                        }}
                        idealFacingMode={FACING_MODES.ENVIRONMENT}
                        idealResolution={{ width: 1024, height: 1024 }}
                        imageType={IMAGE_TYPES.JPG}
                        isMaxResolution={true}
                        isImageMirror={false}
                        isSilentMode={false}
                        isDisplayStartCameraError={true}
                        isFullscreen={false}
                        sizeFactor={1}
                    />
                </div>
            </MyModal>
        </>
    );
}
