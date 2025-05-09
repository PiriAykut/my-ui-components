"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactImageCrop = _interopRequireDefault(require("react-image-crop"));
require("react-image-crop/dist/ReactCrop.css");
var _MyZoomImage = _interopRequireDefault(require("../MyZoomImage/MyZoomImage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyImageCropper = ({
  image,
  style = null,
  onChange = null
}) => {
  const [crop, setCrop] = (0, _react.useState)({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    aspect: 1
  });
  // const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = (0, _react.useState)(null);
  const [zoom, setZoom] = (0, _react.useState)({
    scale: 1,
    positionX: 0,
    positionY: 0
  }); // Zoom seviyesini saklamak için state
  const [scaleFactor, setScaleFactor] = (0, _react.useState)(1.5);

  // Görüntü yüklendiğinde çağrılır
  const handleImageLoad = e => {
    setImageRef(e.currentTarget); // HTMLImageElement olarak kaydediyoruz
  };

  // Zoom değiştiğinde çağrılır
  const handleZoomChange = newZoom => {
    setZoom(newZoom);
    setScaleFactor(newZoom.scale * 3);
  };

  // Kırpma tamamlandığında çağrılır
  const onCropComplete = newCrop => {
    if (imageRef && newCrop.width && newCrop.height) {
      // Zoom oranını kullanarak yeni koordinatlar hesapla
      const adjustedCrop = {
        ...newCrop,
        x: (newCrop.x - zoom.positionX) / zoom.scale,
        y: (newCrop.y - zoom.positionY) / zoom.scale,
        width: newCrop.width / zoom.scale,
        height: newCrop.height / zoom.scale
      };
      generateCroppedImage(imageRef, adjustedCrop);
    }
  };

  // Kırpılmış görseli base64 formatında almak için
  const generateCroppedImage = (image, crop) => {
    if (!crop || !crop.width || !crop.height || crop.width === 0) {
      console.warn("Geçersiz kırpma ölçüleri");
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Kesim boyutlarını scaleFactor ile çarp
    const outputWidth = crop.width * scaleFactor;
    const outputHeight = crop.height * scaleFactor;
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, outputWidth, outputHeight // Büyütülmüş boyutlar
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    // setCroppedImageUrl(base64Image);

    if (onChange) {
      onChange({
        value: base64Image
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: image && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactImageCrop.default, {
      crop: crop,
      onComplete: onCropComplete,
      onChange: newCrop => setCrop(newCrop),
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MyZoomImage.default, {
        onZoomChange: handleZoomChange,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
          src: image,
          alt: "Crop preview",
          onLoad: handleImageLoad,
          className: "rounded-e-md"
        })
      })
    })
  });
};
var _default = exports.default = MyImageCropper;