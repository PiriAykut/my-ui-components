import React, { useEffect, useState, useRef } from "react";
import { PiCamera, PiFileArrowUpLight } from "react-icons/pi";
import Resizer from "react-image-file-resizer";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import MyWaiting from "../MyWaiting/MyWaiting";
import { MyAlert, MyAlertType } from "../MyAlert/MyAlert";
import styles from "./MyFileUpload.module.css"
import MyModal from "../MyModal/MyModal";
import { MdOutlineAttachFile } from "react-icons/md";

export const AcceptType = {
    ALL: "all",
    FILE: "file",
    IMAGE: "image",
    MEDIA: "media",
    PDF: "pdf",
    IMAGEPDF: "imagepdf",
};

Object.freeze(MyAlertType);

export default function MyFileUpload({
    multiple = false,
    accept = AcceptType.ALL,
    className = null,
    camera = true,
    maxSizeMB = 50,
    onData,
}) {

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
                setAccepttypes(
                    type_files + "," + type_image + "," + type_media
                );
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
                setAcceptlabel("PDF, RAR, ZIP, PNG, JPG, Word-Excel "
                );
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
        )
            onData(resdata);

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

            if (extension_type == "file") {
                const reader = new FileReader();
                reader.onload = function() {
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
            <div className={className}>
                <div className={styles.myFileUploadContainer}>
                    <div className={styles.myFileUploadContainerItem}>
                        <div className={styles.myFileUploadContainerItemIcon}>
                            <PiFileArrowUpLight className={styles.Icon} />
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
                                accept={accepttypes}
                            />
                            <div
                                className={styles.myFileUploadButton}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <MdOutlineAttachFile />
                            </div>
                        </div>
                    </div>
                    {camera && (
                        <div className={styles.myFileUploadContainerItem}>
                            <div className={styles.myFileUploadContainerItemIcon}>
                                <PiCamera className={styles.Icon} />
                                <div className={styles.myFileUploadContainerItemIconText}>
                                    <span>
                                        {/* {t("Kameradan fotoğraf çekebilirsin.")} */}
                                        You can take a photo from the camera.
                                    </span>
                                </div>
                            </div>
                            <div className={styles.myFileUploadContainerItemFile}>
                                <button
                                    type="button"
                                    className={styles.myFileUploadButton}
                                    onClick={() => setCameraopen(true)}
                                >
                                    <PiCamera />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <MyModal show={cameraopen} onClose={() => setCameraopen(false)} title={t("Fotoğraf Çek")} closeOnEsc={false} closeOnBackdropClick={false}   >
                <div>
                    <Camera
                        videoConstraints={{
                            deviceId: selectedDeviceId
                                ? { exact: selectedDeviceId }
                                : undefined,
                        }}
                        onTakePhoto={(dataUri) => {
                            console.log(dataUri);
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
