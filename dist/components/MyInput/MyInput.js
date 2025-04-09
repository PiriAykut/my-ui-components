"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MyInputType = exports.MyInputIsNumeric = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MyInputModule = _interopRequireDefault(require("./MyInput.module.css"));
var _pi = require("react-icons/pi");
var _md = require("react-icons/md");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MyInputType = exports.MyInputType = Object.freeze({
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
});
var MyInputIsNumeric = exports.MyInputIsNumeric = function MyInputIsNumeric(value) {
  if (value === null || value === undefined || value === '') return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
};
function MyInput(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? null : _ref$id,
    _ref$ref = _ref.ref,
    ref = _ref$ref === void 0 ? null : _ref$ref,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
    _ref$placeholdersearc = _ref.placeholdersearchtext,
    placeholdersearchtext = _ref$placeholdersearc === void 0 ? "" : _ref$placeholdersearc,
    _ref$description = _ref.description,
    description = _ref$description === void 0 ? null : _ref$description,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? MyInputType.TEXT : _ref$type,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 0 : _ref$rows,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? null : _ref$options,
    _ref$options_key_valu = _ref.options_key_value,
    options_key_value = _ref$options_key_valu === void 0 ? "value" : _ref$options_key_valu,
    _ref$options_key_text = _ref.options_key_text,
    options_key_text = _ref$options_key_text === void 0 ? "text" : _ref$options_key_text,
    _ref$options_key_subt = _ref.options_key_subtext,
    options_key_subtext = _ref$options_key_subt === void 0 ? "subtext" : _ref$options_key_subt,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? null : _ref$value,
    _ref$decimalCount = _ref.decimalCount,
    decimalCount = _ref$decimalCount === void 0 ? 2 : _ref$decimalCount,
    _ref$buttonText = _ref.buttonText,
    buttonText = _ref$buttonText === void 0 ? "" : _ref$buttonText,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? ".jpg,.jpeg,.png" : _ref$accept,
    _ref$minDate = _ref.minDate,
    minDate = _ref$minDate === void 0 ? null : _ref$minDate,
    _ref$maxDate = _ref.maxDate,
    maxDate = _ref$maxDate === void 0 ? null : _ref$maxDate,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$maxlength = _ref.maxlength,
    maxlength = _ref$maxlength === void 0 ? null : _ref$maxlength,
    _ref$dangerouslySetIn = _ref.dangerouslySetInnerHTML,
    dangerouslySetInnerHTML = _ref$dangerouslySetIn === void 0 ? null : _ref$dangerouslySetIn,
    _ref$uppercase = _ref.uppercase,
    uppercase = _ref$uppercase === void 0 ? false : _ref$uppercase,
    _ref$lowercase = _ref.lowercase,
    lowercase = _ref$lowercase === void 0 ? false : _ref$lowercase,
    _ref$firstUppercase = _ref.firstUppercase,
    firstUppercase = _ref$firstUppercase === void 0 ? false : _ref$firstUppercase,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$onBlur = _ref.onBlur,
    onBlur = _ref$onBlur === void 0 ? null : _ref$onBlur,
    _ref$onFocus = _ref.onFocus,
    onFocus = _ref$onFocus === void 0 ? null : _ref$onFocus,
    _ref$onKeyDown = _ref.onKeyDown,
    onKeyDown = _ref$onKeyDown === void 0 ? null : _ref$onKeyDown,
    _ref$onKeyUp = _ref.onKeyUp,
    onKeyUp = _ref$onKeyUp === void 0 ? null : _ref$onKeyUp,
    _ref$onKeyPress = _ref.onKeyPress,
    onKeyPress = _ref$onKeyPress === void 0 ? null : _ref$onKeyPress,
    _ref$onMouseDown = _ref.onMouseDown,
    onMouseDown = _ref$onMouseDown === void 0 ? null : _ref$onMouseDown,
    _ref$onMouseUp = _ref.onMouseUp,
    onMouseUp = _ref$onMouseUp === void 0 ? null : _ref$onMouseUp,
    _ref$onMouseEnter = _ref.onMouseEnter,
    onMouseEnter = _ref$onMouseEnter === void 0 ? null : _ref$onMouseEnter,
    _ref$onMouseLeave = _ref.onMouseLeave,
    onMouseLeave = _ref$onMouseLeave === void 0 ? null : _ref$onMouseLeave,
    _ref$onRemoveImage = _ref.onRemoveImage,
    onRemoveImage = _ref$onRemoveImage === void 0 ? null : _ref$onRemoveImage;
  var myInputId = "key".concat(Date.now() + Math.random().toString(36).substr(2, 9));
  var fileInputRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var _useState3 = (0, _react.useState)(value),
    _useState4 = _slicedToArray(_useState3, 2),
    myValue = _useState4[0],
    setMyValue = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    myEyeView = _useState6[0],
    setMyEyeView = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    myFileName = _useState8[0],
    setMyFileName = _useState8[1];
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    myTitleLite = _useState10[0],
    setMyTitleLite = _useState10[1];
  var _useState11 = (0, _react.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    filtertext = _useState12[0],
    setFiltertext = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isError = _useState14[0],
    setIsError = _useState14[1];
  var toBase64 = function toBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };
  var calculateFileSize = function calculateFileSize(sizeInBytes) {
    var units = ['B', 'KB', 'MB'];
    var size = sizeInBytes;
    var unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return "".concat(size.toFixed(2), " ").concat(units[unitIndex]);
  };
  var moneyFormat = function moneyFormat(_value) {
    var money = '';
    var inputValue = _value;
    if (inputValue == null || inputValue == undefined || inputValue == '') return money;
    try {
      inputValue = inputValue.toString();
      // Tüm virgülleri kaldır ve son girilen karakteri kontrol et
      money = inputValue.replace(/,/g, '');
      var lastChar = inputValue.slice(-1);
      if (lastChar === ',') {
        money = money + '.';
      }

      // Sadece sayılar ve tek bir nokta kalacak şekilde temizle
      money = money.replace(/[^0-9.]/g, '');

      // Birden fazla nokta varsa ilkini koru
      var parts = money.split('.');
      if (parts.length > 2) {
        money = parts[0] + '.' + parts[1];
      }

      // Noktadan sonra en fazla 2 basamak
      if (parts.length === 2 && parts[1].length > decimalCount) {
        money = parts[0] + '.' + parts[1].substring(0, decimalCount);
      }

      // Binlik ayracı için formatlama
      if (money) {
        var _numParts = money.split('.');
        if (_numParts[0]) {
          // Sayıyı önce tam sayıya çevir, sonra binlik ayracı ekle
          _numParts[0] = parseInt(_numParts[0], 10).toLocaleString('en-US');
        }
        money = _numParts.join('.');
      }
      var numParts = money.split('.');
      if (numParts[0]) {
        numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      money = numParts.join('.');
    } catch (error) {
      money = '';
      console.log(inputValue);
      console.error(error);
    }
    return money;
  };
  var onMyBlur = function onMyBlur(e) {
    setIsError(false);
    if (myValue != null && myValue != "") {
      switch (type) {
        case MyInputType.MAIL:
          if (!myValue.includes("@") || !myValue.includes(".")) {
            setIsError(true);
          }
          break;
        case MyInputType.PHONE:
          if (myValue.length < 10 || myValue.length > 15) {
            setIsError(true);
          }
          break;
        default:
          break;
      }
    }
    if (onBlur != null) onBlur(e);
  };
  var onMyFocus = function onMyFocus(e) {
    if (onFocus != null) onFocus(e);
  };
  var onMyKeyDown = function onMyKeyDown(e) {
    if (onKeyDown != null) onKeyDown(e);
  };
  var onMyKeyUp = function onMyKeyUp(e) {
    if (onKeyUp != null) onKeyUp(e);
  };
  var onMyKeyPress = function onMyKeyPress(e) {
    if (onKeyPress != null) onKeyPress(e);
  };
  var onMyMouseDown = function onMyMouseDown(e) {
    if (onMouseDown != null) onMouseDown(e);
  };
  var onMyMouseUp = function onMyMouseUp(e) {
    if (onMouseUp != null) onMouseUp(e);
  };
  var onMyMouseEnter = function onMyMouseEnter(e) {
    if (onMouseEnter != null) onMouseEnter(e);
  };
  var onMyMouseLeave = function onMyMouseLeave(e) {
    if (onMouseLeave != null) onMouseLeave(e);
  };
  var onRemoveImageClick = function onRemoveImageClick(e) {
    if (onRemoveImage != null) onRemoveImage();
  };
  var onMyChange = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var files, totalSize, i, file, number, numberParts, money, selectedDate;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = type;
            _context.next = _context.t0 === MyInputType.FILE ? 3 : _context.t0 === MyInputType.IMAGE ? 3 : _context.t0 === MyInputType.NUMBER ? 29 : _context.t0 === MyInputType.MONEY ? 34 : _context.t0 === MyInputType.DATE ? 37 : _context.t0 === MyInputType.DATETIME ? 37 : _context.t0 === MyInputType.TIME ? 37 : 40;
            break;
          case 3:
            files = [];
            if (!(e.target.files.length > 0)) {
              _context.next = 26;
              break;
            }
            totalSize = 0;
            i = 0;
          case 7:
            if (!(i < e.target.files.length)) {
              _context.next = 22;
              break;
            }
            file = e.target.files[i];
            totalSize += parseInt(file.size);
            _context.t1 = files;
            _context.next = 13;
            return toBase64(file);
          case 13:
            _context.t2 = _context.sent;
            _context.t3 = file.name;
            _context.t4 = file.size;
            _context.t5 = calculateFileSize(file.size);
            _context.t6 = {
              base64: _context.t2,
              filename: _context.t3,
              size: _context.t4,
              sizeText: _context.t5
            };
            _context.t1.push.call(_context.t1, _context.t6);
          case 19:
            i++;
            _context.next = 7;
            break;
          case 22:
            //for

            totalSize = calculateFileSize(totalSize);
            setMyFileName("<span>".concat(files.length == 1 ? files[0].filename : files.length + " Dosya Seçildi", "</span>\n                        <small>(").concat(totalSize, ")</small>"));
            _context.next = 27;
            break;
          case 26:
            setMyFileName("");
          case 27:
            setMyValue(files);
            return _context.abrupt("break", 42);
          case 29:
            number = e.target.value.replace(/[^0-9.]/g, ''); // Birden fazla nokta varsa ilkini koru
            numberParts = number.split('.');
            if (numberParts.length > 2) {
              number = numberParts[0] + '.' + numberParts[1];
            }
            setMyValue(number);
            return _context.abrupt("break", 42);
          case 34:
            money = moneyFormat(e.target.value);
            setMyValue(money);
            return _context.abrupt("break", 42);
          case 37:
            selectedDate = e.target.value;
            setMyValue(selectedDate);
            return _context.abrupt("break", 42);
          case 40:
            if (uppercase) setMyValue(e.target.value.toLocaleUpperCase("TR"));else if (lowercase) setMyValue(e.target.value.toLocaleLowerCase("TR"));else if (firstUppercase) setMyValue(e.target.value.split(' ').map(function (word) {
              return word.charAt(0).toLocaleUpperCase("TR") + word.slice(1).toLocaleLowerCase("TR");
            }).join(' '));else setMyValue(e.target.value);
            return _context.abrupt("break", 42);
          case 42:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onMyChange(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var mySelectFilterListClick = function mySelectFilterListClick(item) {
    var selectElement = document.getElementById("mySelectFilterHiddenSelect" + myInputId);
    selectElement.value = item.value;
    setMyValue(item.value);
    setFiltertext("");
  };
  var getMyValueText = function getMyValueText() {
    if (!myValue || myValue == 0) return "";
    if (!MyInputIsNumeric(myValue) || options == null) return myValue;
    var result = options.find(function (e) {
      return e.value.toString() == myValue.toString();
    });
    if (result) return result.text + (result[options_key_subtext] ? " - <span style=\"color: #73889d; font-style: italic; font-weight: 300;\">".concat(result[options_key_subtext], "</span>") : '');
    return "";
  };
  var filterSelectEvents = function filterSelectEvents() {
    var selectElement = document.getElementById("mySelectFilterSelected" + (id ? id : myInputId));
    var selectListElement = document.getElementById("mySelectFilterList" + (id ? id : myInputId));
    var filterInput = document.getElementById("mySelectFilterInput" + (id ? id : myInputId));
    if (!selectElement || !selectListElement || !filterInput) return;
    var isInputFocused = false;

    // Select'e tıklandığında seçim listesini aç
    selectElement.addEventListener('click', function () {
      if (!isInputFocused) {
        filterInput.style.display = 'block';
        selectListElement.style.display = 'block';
        setTimeout(function () {
          filterInput.focus();
        }, 100); // Gecikme, select listesi açılırken input'a odaklanması için
      }
    });

    // Input odaklandığında flag'i true yap
    filterInput.addEventListener('focus', function () {
      isInputFocused = true;
    });

    // Input odaktan çıktığında ve select'in blur olayında input'u gizle
    filterInput.addEventListener('blur', function () {
      isInputFocused = false;
      setTimeout(function () {
        setFiltertext("");
        filterInput.style.display = 'none';
        selectListElement.style.display = 'none';
      }, 150); // Gecikme ile select kapanmasını sağla
    });
  };
  var getFilterOptions = function getFilterOptions() {
    var rv = options.filter(function () {
      return true;
    });
    if (filtertext != "") {
      rv = rv.filter(function (e) {
        return e.text.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase());
      });
    }
    return rv;
  };
  var getFileImageControl = function getFileImageControl(filename) {
    if (!filename) return false;
    if (filename.includes(";base64,")) return true;
    var validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    return validExtensions.some(function (ext) {
      return filename.toString().toLocaleLowerCase().includes(ext);
    });
  };
  (0, _react.useEffect)(function () {
    if (loaded) {
      var vl = value;
      if (value == undefined) vl = null;
      if (vl == null && (type == MyInputType.TEXT || type == MyInputType.MAIL || type == MyInputType.TEXTAREA || type == MyInputType.PASSWORD)) vl = "";
      // if (vl != myValue) setMyValue(vl);
      if (vl == null) setMyFileName(null);
    }
  }, [value]);
  (0, _react.useEffect)(function () {
    if (myValue != value && onChange != null) {
      onChange({
        value: myValue,
        target: {
          value: myValue
        }
      });
    }
  }, [myValue]);
  (0, _react.useEffect)(function () {
    if (title) {
      setMyTitleLite(title.replace(/<\/?[^>]+(>|$)/g, ""));
    }
  }, [title]);
  (0, _react.useEffect)(function () {
    setLoaded(true);
    if (type == MyInputType.SELECTFILTER) filterSelectEvents();
    if (type == MyInputType.DATE) {
      var dateInput = document.getElementById("myDate" + myInputId);
      dateInput.addEventListener('click', function () {
        var _dateInput$showPicker;
        // Tarih seçiciyi göstermek için odaklanma
        (_dateInput$showPicker = dateInput.showPicker) === null || _dateInput$showPicker === void 0 || _dateInput$showPicker.call(dateInput); // Eğer destekliyorsa
      });
    }
    if (type == MyInputType.DATETIME) {
      var dateTimeInput = document.getElementById("myDateTime" + myInputId);
      dateTimeInput.addEventListener('click', function () {
        var _dateTimeInput$showPi;
        // Tarih seçiciyi göstermek için odaklanma
        (_dateTimeInput$showPi = dateTimeInput.showPicker) === null || _dateTimeInput$showPi === void 0 || _dateTimeInput$showPi.call(dateTimeInput); // Eğer destekliyorsa
      });
    }
    if (type == MyInputType.TIME) {
      var timeInput = document.getElementById("myTime" + myInputId);
      timeInput.addEventListener('click', function () {
        var _timeInput$showPicker;
        // Saat seçiciyi göstermek için odaklanma
        (_timeInput$showPicker = timeInput.showPicker) === null || _timeInput$showPicker === void 0 || _timeInput$showPicker.call(timeInput); // Eğer destekliyorsa
      });
    }
  }, []);
  var renderInput = function renderInput() {
    var _inputTypes, _inputTypes$type;
    if (disabled || type === MyInputType.READONLY) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: _MyInputModule["default"].disabledInput,
        dangerouslySetInnerHTML: dangerouslySetInnerHTML ? dangerouslySetInnerHTML : {
          __html: getMyValueText()
        },
        style: rows > 0 ? _objectSpread(_objectSpread({}, style ? style : {}), {}, {
          height: rows * 30 + 'px',
          alignItems: "flex-start"
        }) : style
      });
    }
    var inputTypes = (_inputTypes = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inputTypes, MyInputType.TEXT, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: myValue,
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          autoComplete: "off",
          style: style,
          maxLength: maxlength,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.MAIL, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: myValue === null || myValue === void 0 ? void 0 : myValue.toLowerCase(),
          onChange: function onChange(e) {
            return onMyChange(_objectSpread(_objectSpread({}, e), {}, {
              target: _objectSpread(_objectSpread({}, e.target), {}, {
                value: e.target.value.toLowerCase().replace(/\s/g, '')
              })
            }));
          },
          placeholder: placeholder || myTitleLite,
          autoComplete: "off",
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.PHONE, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: myValue,
          onChange: function onChange(e) {
            var value = e.target.value.replace(/[^0-9()-]/g, '');
            onMyChange(_objectSpread(_objectSpread({}, e), {}, {
              target: _objectSpread(_objectSpread({}, e.target), {}, {
                value: value
              })
            }));
          },
          placeholder: placeholder || myTitleLite,
          autoComplete: "off",
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.MONEY, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: moneyFormat(myValue),
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          autoComplete: "off",
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.NUMBER, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "number",
          value: myValue,
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          autoComplete: "off",
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.DATE, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          type: "date",
          id: "myDate" + myInputId,
          value: myValue || '',
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          min: minDate,
          max: maxDate,
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.DATETIME, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          type: "datetime-local",
          id: "myDateTime" + myInputId,
          value: myValue || '',
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          min: minDate,
          max: maxDate,
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.TIME, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          type: "time",
          id: "myTime" + myInputId,
          value: myValue || '',
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), MyInputType.PASSWORD, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: myEyeView ? "text" : "password",
          value: myValue,
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          autoComplete: "new-password",
          style: style,
          maxLength: maxlength,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          className: _MyInputModule["default"].eye,
          onClick: function onClick() {
            return setMyEyeView(!myEyeView);
          },
          children: myEyeView ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiEyeSlash, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiEye, {})
        })]
      });
    }), MyInputType.COLOR, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "color",
          value: myValue,
          onChange: onMyChange,
          placeholder: placeholder || myTitleLite,
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        })
      });
    }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_inputTypes, MyInputType.TEXTAREA, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
        ref: ref,
        id: id,
        onChange: onMyChange,
        rows: rows,
        placeholder: placeholder || myTitleLite,
        value: myValue,
        style: style,
        maxLength: maxlength,
        onBlur: onMyBlur,
        onFocus: onMyFocus,
        onKeyDown: onMyKeyDown,
        onKeyUp: onMyKeyUp,
        onKeyPress: onMyKeyPress,
        onMouseDown: onMyMouseDown,
        onMouseUp: onMyMouseUp,
        onMouseEnter: onMyMouseEnter,
        onMouseLeave: onMyMouseLeave
      });
    }), MyInputType.SELECT, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
          ref: ref,
          id: id,
          onChange: function onChange(e) {
            return onMyChange(e);
          },
          value: myValue && !isNaN(myValue) ? MyInputIsNumeric(myValue) ? parseInt(myValue) : myValue : "",
          style: style,
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave,
          children: options && options.map(function (e) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: MyInputIsNumeric(e[options_key_value]) ? parseInt(e[options_key_value]) : e[options_key_value],
              children: e[options_key_text] || e["label"]
            }, e[options_key_value]);
          })
        }), !myValue && !options && (placeholder || myTitleLite) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyInputModule["default"].placeholder,
          children: placeholder ? placeholder : myTitleLite
        })]
      });
    }), MyInputType.SELECTFILTER, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: "mySelectFilterInput" + (id ? id : myInputId),
          type: "text",
          className: _MyInputModule["default"].filterInput,
          style: style,
          value: filtertext,
          onChange: function onChange(e) {
            return setFiltertext(e.target.value);
          },
          placeholder: placeholdersearchtext && placeholdersearchtext != "" ? placeholdersearchtext : (placeholder ? placeholder : myTitleLite) + " ...",
          onBlur: onMyBlur,
          onFocus: onMyFocus,
          onKeyDown: onMyKeyDown,
          onKeyUp: onMyKeyUp,
          onKeyPress: onMyKeyPress,
          onMouseDown: onMyMouseDown,
          onMouseUp: onMyMouseUp,
          onMouseEnter: onMyMouseEnter,
          onMouseLeave: onMyMouseLeave
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: _MyInputModule["default"].filterInputSelectedContainer + " " + (myValue ? _MyInputModule["default"].filterInputSelectedContainerSelected : ''),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            id: "mySelectFilterSelected" + (id ? id : myInputId),
            className: _MyInputModule["default"].filterInputSelected,
            dangerouslySetInnerHTML: {
              __html: getMyValueText()
            }
          }), myValue && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _MyInputModule["default"].filterInputSelectedX,
            onClick: function onClick() {
              return setMyValue(null);
            },
            title: t("Seçimi Kaldır"),
            children: "x"
          }) || "", /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCaretDownBold, {
            className: _MyInputModule["default"].caretdown
          })]
        }), !myValue && (placeholder || myTitleLite) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyInputModule["default"].placeholder,
          children: placeholder ? placeholder : myTitleLite
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
          id: "mySelectFilterList" + (id ? id : myInputId),
          className: _MyInputModule["default"].filterInputList,
          children: options && getFilterOptions().map(function (item) {
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
              value: MyInputIsNumeric(item[options_key_value]) ? parseInt(item[options_key_value]) : item[options_key_value],
              onClick: function onClick() {
                return mySelectFilterListClick(item);
              },
              className: item[options_key_subtext] ? _MyInputModule["default"].subtextli : '',
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                dangerouslySetInnerHTML: {
                  __html: item[options_key_text] || item["label"]
                }
              }), item[options_key_subtext] && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: _MyInputModule["default"].subtext,
                children: item[options_key_subtext]
              })]
            }, item[options_key_value]);
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: "none"
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
            id: "mySelectFilterHiddenSelect" + myInputId,
            onChange: function onChange(e) {
              return onMyChange(e);
            },
            value: myValue && !isNaN(myValue) ? MyInputIsNumeric(myValue) ? parseInt(myValue) : myValue : "",
            children: options && options.map(function (item) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                value: MyInputIsNumeric(item[options_key_value]) ? parseInt(item[options_key_value]) : item[options_key_value],
                children: item[options_key_text] || item["label"]
              }, item[options_key_value]);
            })
          })
        })]
      });
    }), MyInputType.FILE, function () {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _MyInputModule["default"].fileinput,
        children: [function () {
          // Dosya önizleme gösterimi için kontrol
          if (myValue && (type === MyInputType.IMAGE || accept === '.jpg,.jpeg,.png')) {
            if (Array.isArray(myValue) && myValue.length === 1 && getFileImageControl(myValue[0].filename)) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: myValue[0].base64,
                className: _MyInputModule["default"].fileImagePreview,
                alt: "Preview"
              });
            } else if (getFileImageControl(myValue)) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: myValue,
                className: _MyInputModule["default"].fileImagePreview,
                alt: "Preview"
              });
            }
          }
          return null;
        }(), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _MyInputModule["default"].filename + " " + (myFileName && _MyInputModule["default"].selected),
          dangerouslySetInnerHTML: {
            __html: myFileName || (placeholder ? placeholder : t(type === MyInputType.IMAGE ? "Görsel Seçiniz" : "Dosya Seçiniz"))
          }
        }), function () {
          if (onRemoveImage && myValue && type === MyInputType.IMAGE && (Array.isArray(myValue) && myValue.length === 1 && getFileImageControl(myValue[0].filename) || getFileImageControl(myValue) && !(myValue.includes("nologo") || myValue.includes("noimage")))) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              type: "button",
              onClick: onRemoveImageClick,
              className: _MyInputModule["default"].filebuttonremove,
              title: t("Kaldır"),
              children: "x"
            });
          }
          return null;
        }(), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: function onClick() {
            return fileInputRef.current.click();
          },
          className: _MyInputModule["default"].filebutton,
          children: type === MyInputType.IMAGE ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiImage, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_md.MdOutlineAttachFile, {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", _objectSpread(_objectSpread({
          type: "file",
          ref: fileInputRef,
          onChange: function onChange(e) {
            return onMyChange(e);
          },
          placeholder: placeholder || myTitleLite,
          style: {
            display: "none"
          }
        }, multiple ? {
          multiple: true
        } : {}), {}, {
          accept: type === MyInputType.IMAGE ? '.jpg,.jpeg,.png' : accept
        }))]
      });
    }), MyInputType.IMAGE, function () {
      return this[MyInputType.FILE]();
    }));
    return ((_inputTypes$type = inputTypes[type]) === null || _inputTypes$type === void 0 ? void 0 : _inputTypes$type.call(inputTypes)) || null;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "myinput" + myInputId,
    className: _MyInputModule["default"].container + " " + (className != null ? className : '') + " " + (isError ? _MyInputModule["default"].error : ''),
    title: title && myTitleLite || placeholder && placeholder,
    style: style && style.width && {
      display: 'inline-block'
    } || {
      width: '100%'
    },
    children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
      dangerouslySetInnerHTML: {
        __html: title
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _MyInputModule["default"].inputblock + " " + (disabled || type === MyInputType.READONLY ? _MyInputModule["default"].inputblockdisabled : '') + " " + (icon || type === MyInputType.IMAGE ? _MyInputModule["default"].inputblockicon : ''),
      style: style && _objectSpread({}, style.backgroundColor && {
        backgroundColor: style.backgroundColor
      }),
      children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "".concat(_MyInputModule["default"].icon, " ").concat(type === MyInputType.TEXTAREA || rows > 0 ? _MyInputModule["default"].icontextarea : ''),
        children: icon
      }), renderInput()]
    }), description && /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
      className: _MyInputModule["default"].description,
      children: description
    })]
  });
}
var _default = exports["default"] = MyInput;