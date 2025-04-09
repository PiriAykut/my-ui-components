"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactQuill = _interopRequireDefault(require("react-quill"));
require("react-quill/dist/quill.snow.css");
var _quillImageResize = _interopRequireDefault(require("quill-image-resize"));
var _quill = _interopRequireDefault(require("quill"));
var _quillTable = _interopRequireDefault(require("quill-table"));
var _katex = _interopRequireDefault(require("katex"));
require("katex/dist/katex.min.css");
require("./MyEditor.scss");
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
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // KaTeX'i global hale getir
window.katex = _katex["default"];

// Özel font listesini tanımla
var fonts = [{
  label: "Arial",
  value: "arial"
}, {
  label: "Comic Sans MS",
  value: "comic-sans"
}, {
  label: "Courier New",
  value: "courier-new"
}, {
  label: "Georgia",
  value: "georgia"
}, {
  label: "Helvetica",
  value: "helvetica"
}, {
  label: "Times New Roman",
  value: "times-new-roman"
}, {
  label: "Verdana",
  value: "verdana"
}, {
  label: "Trebuchet MS",
  value: "trebuchet-ms"
}, {
  label: "Garamond",
  value: "garamond"
}, {
  label: "Palatino Linotype",
  value: "palatino-linotype"
}, {
  label: "Consolas",
  value: "consolas"
}, {
  label: "Lucida Console",
  value: "lucida-console"
}, {
  label: "Impact",
  value: "impact"
}, {
  label: "Brush Script MT",
  value: "brush-script-mt"
}, {
  label: "Tahoma",
  value: "tahoma"
}, {
  label: "Gill Sans",
  value: "gill-sans"
}, {
  label: "Franklin Gothic Medium",
  value: "franklin-gothic-medium"
}, {
  label: "Century Gothic",
  value: "century-gothic"
}, {
  label: "Bookman Old Style",
  value: "bookman-old-style"
}, {
  label: "Candara",
  value: "candara"
}, {
  label: "Didot",
  value: "didot"
}, {
  label: "Futura",
  value: "futura"
}, {
  label: "Rockwell",
  value: "rockwell"
}, {
  label: "Baskerville",
  value: "baskerville"
}, {
  label: "Bodoni MT",
  value: "bodoni-mt"
}, {
  label: "Copperplate",
  value: "copperplate"
}, {
  label: "Perpetua",
  value: "perpetua"
}, {
  label: "Monaco",
  value: "monaco"
}, {
  label: "Century Schoolbook",
  value: "century-schoolbook"
}, {
  label: "Segoe UI",
  value: "segoe-ui"
}];

// Quill font formatını genişlet
var Font = _quill["default"]["import"]("formats/font");
Font.whitelist = fonts.map(function (f) {
  return f.value;
});
_quill["default"].register(Font, true);

// Quill modüllerini kaydet
_quill["default"].register("modules/imageResize", _quillImageResize["default"]);
_quill["default"].register(_quillTable["default"].TableCell);
_quill["default"].register(_quillTable["default"].TableRow);
_quill["default"].register(_quillTable["default"].Table);
_quill["default"].register(_quillTable["default"].Contain);
_quill["default"].register("modules/table", _quillTable["default"].TableModule);

// Formula Embed için düzeltme
var Embed = _quill["default"]["import"]("blots/embed");
var FormulaEmbed = /*#__PURE__*/function (_Embed) {
  function FormulaEmbed() {
    _classCallCheck(this, FormulaEmbed);
    return _callSuper(this, FormulaEmbed, arguments);
  }
  _inherits(FormulaEmbed, _Embed);
  return _createClass(FormulaEmbed, null, [{
    key: "create",
    value: function create(value) {
      var node = _superPropGet(FormulaEmbed, "create", this, 2)([]);
      if (value) {
        node.setAttribute("data-value", value);
        try {
          window.katex.render(value, node, {
            throwOnError: false
          });
        } catch (err) {
          console.error("KaTeX render error:", err);
        }
      }
      return node;
    }
  }, {
    key: "value",
    value: function value(node) {
      return node.getAttribute("data-value");
    }
  }]);
}(Embed);
FormulaEmbed.blotName = "formula";
FormulaEmbed.tagName = "SPAN";
FormulaEmbed.className = "ql-formula";
_quill["default"].register("formats/formula", FormulaEmbed);
function MyEditor(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {
      height: "300px"
    } : _ref$style;
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    editorValue = _useState2[0],
    setEditorValue = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isFullscreen = _useState4[0],
    setIsFullscreen = _useState4[1];
  var editorRef = (0, _react.useRef)(null);
  var timeoutRef = (0, _react.useRef)(null);
  var isFirstRender = (0, _react.useRef)(true);
  var handleFullscreen = function handleFullscreen() {
    setIsFullscreen(!isFullscreen);
  };

  // Custom buton tanımı
  (0, _react.useEffect)(function () {
    var icons = _quill["default"]["import"]('ui/icons');
    icons['fullscreen'] = "<svg viewbox=\"0 0 18 18\">\n      <path d=\"M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M6,14H0v2h4v4h2V14z M14,18h2v-4h4v-2h-6V18z\"/>\n    </svg>";
  }, []);
  (0, _react.useEffect)(function () {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setEditorValue(value || "");
    } else if (value !== editorValue) {
      var _editorRef$current;
      var editor = (_editorRef$current = editorRef.current) === null || _editorRef$current === void 0 ? void 0 : _editorRef$current.getEditor();
      if (editor) {
        editor.setContents(editor.clipboard.convert(value || ""));
      }
    }
  }, [value]);
  var handleChange = function handleChange(content, delta, source, editor) {
    var html = editor.getHTML();
    setEditorValue(html);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      if (onChange) onChange({
        value: html
      });
    }, 500);
  };
  var formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "color", "background", "align", "script", "table", "table-cell", "table-row", "table-header", "table-body", "formula"];
  var maxRows = 10;
  var maxCols = 5;
  var tableOptions = [];
  for (var r = 1; r <= maxRows; r++) {
    for (var c = 1; c <= maxCols; c++) {
      tableOptions.push("newtable_" + r + "_" + c);
    }
  }
  var modules = {
    toolbar: {
      container: [[{
        font: fonts.map(function (f) {
          return f.value;
        })
      }], [{
        header: [1, 2, 3, 4, 5, 6, false]
      }], [{
        size: ["small", "normal", "large", "huge"]
      }], [{
        list: "ordered"
      }, {
        list: "bullet"
      }], ["bold", "italic", "underline", "strike"], [{
        align: []
      }], [{
        color: []
      }, {
        background: []
      }], [{
        script: "sub"
      }, {
        script: "super"
      }], ["image"]
      // [{ table: tableOptions }, { table: "append-row" }, { table: "append-col" }],
      // ["formula"]
      ]
    },
    table: {
      operationMenu: true,
      resizable: true,
      tableCellMinWidth: 50,
      tableHeaderRows: 1
    },
    clipboard: {
      matchVisual: false
    },
    imageResize: {
      modules: ["Resize", "DisplaySize"],
      displaySize: true,
      handleStyles: {
        backgroundColor: '#000',
        border: 'none',
        color: '#fff'
      }
    }
  };

  // Font adlarını gerçek isimleriyle göstermek için toolbar'ı güncelle
  var fontPicker = document.querySelector(".ql-font");
  if (fontPicker) {
    var items = fontPicker.querySelectorAll(".ql-picker-item");
    items.forEach(function (item, index) {
      if (fonts[index]) {
        item.innerText = fonts[index].label; // Gerçek font adını göster
      }
    });
    var pickerLabel = fontPicker.querySelector(".ql-picker-label");
    if (pickerLabel) {
      pickerLabel.innerText = fonts[0].label; // Varsayılan font ismi
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: 'myEditorContainer ' + (isFullscreen ? 'fullscreen' : ''),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "myEditorContainerContent",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: handleFullscreen,
        className: "myEditorContainerFullscreenButton",
        title: isFullscreen ? "Minimize" : "Maximize",
        children: isFullscreen ? /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
          viewBox: "0 0 18 18",
          width: "18",
          height: "18",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            d: "M4,4h2v6H0V8h4V4z M14,4v4h4v2h-6V4H14z M6,14H4v-4H0v-2h6V14z M14,14h-2v-6h6v2h-4V14z"
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
          viewBox: "0 0 18 18",
          width: "18",
          height: "18",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
            d: "M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M6,14H0v2h4v4h2V14z M14,18h2v-4h4v-2h-6V18z"
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuill["default"], {
        ref: editorRef,
        theme: "snow",
        value: editorValue,
        onChange: handleChange,
        modules: modules,
        formats: formats,
        style: style,
        preserveWhitespace: true
      })]
    })
  });
}
var _default = exports["default"] = MyEditor;