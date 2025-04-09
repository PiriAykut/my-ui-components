"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactImageCrop = _interopRequireDefault(require("react-image-crop"));
require("react-image-crop/dist/ReactCrop.css");
var _MyZoomImage = _interopRequireDefault(require("../MyZoomImage/MyZoomImage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MyImageCropper = function MyImageCropper(_ref) {
  var image = _ref.image,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange;
  var _useState = (0, _react.useState)({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      aspect: 1
    }),
    _useState2 = _slicedToArray(_useState, 2),
    crop = _useState2[0],
    setCrop = _useState2[1];
  // const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    imageRef = _useState4[0],
    setImageRef = _useState4[1];
  var _useState5 = (0, _react.useState)({
      scale: 1,
      positionX: 0,
      positionY: 0
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    zoom = _useState6[0],
    setZoom = _useState6[1]; // Zoom seviyesini saklamak için state
  var _useState7 = (0, _react.useState)(1.5),
    _useState8 = _slicedToArray(_useState7, 2),
    scaleFactor = _useState8[0],
    setScaleFactor = _useState8[1];

  // Görüntü yüklendiğinde çağrılır
  var handleImageLoad = function handleImageLoad(e) {
    setImageRef(e.currentTarget); // HTMLImageElement olarak kaydediyoruz
  };

  // Zoom değiştiğinde çağrılır
  var handleZoomChange = function handleZoomChange(newZoom) {
    setZoom(newZoom);
    setScaleFactor(newZoom.scale * 3);
  };

  // Kırpma tamamlandığında çağrılır
  var onCropComplete = function onCropComplete(newCrop) {
    if (imageRef && newCrop.width && newCrop.height) {
      // Zoom oranını kullanarak yeni koordinatlar hesapla
      var adjustedCrop = _objectSpread(_objectSpread({}, newCrop), {}, {
        x: (newCrop.x - zoom.positionX) / zoom.scale,
        y: (newCrop.y - zoom.positionY) / zoom.scale,
        width: newCrop.width / zoom.scale,
        height: newCrop.height / zoom.scale
      });
      generateCroppedImage(imageRef, adjustedCrop);
    }
  };

  // Kırpılmış görseli base64 formatında almak için
  var generateCroppedImage = function generateCroppedImage(image, crop) {
    if (!crop || !crop.width || !crop.height || crop.width === 0) {
      console.warn("Geçersiz kırpma ölçüleri");
      return;
    }
    var canvas = document.createElement("canvas");
    var scaleX = image.naturalWidth / image.width;
    var scaleY = image.naturalHeight / image.height;

    // Kesim boyutlarını scaleFactor ile çarp
    var outputWidth = crop.width * scaleFactor;
    var outputHeight = crop.height * scaleFactor;
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, outputWidth, outputHeight // Büyütülmüş boyutlar
    );
    var base64Image = canvas.toDataURL("image/jpeg");
    // setCroppedImageUrl(base64Image);

    if (onChange) {
      onChange({
        value: base64Image
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: image && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactImageCrop["default"], {
      crop: crop,
      onComplete: onCropComplete,
      onChange: function onChange(newCrop) {
        return setCrop(newCrop);
      },
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MyZoomImage["default"], {
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
var _default = exports["default"] = MyImageCropper;