"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MyInputType = exports.MyInputIsNumeric = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MyInputModule = _interopRequireDefault(require("./MyInput.module.css"));
var _pi = require("react-icons/pi");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyInputType = exports.MyInputType = Object.freeze({
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
const MyInputIsNumeric = value => {
  if (value === null || value === undefined || value === '') return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
};
exports.MyInputIsNumeric = MyInputIsNumeric;
function MyInput({
  id = null,
  ref = null,
  title = "",
  placeholder = "",
  placeholdersearchtext = "",
  description = null,
  type = MyInputType.TEXT,
  className = null,
  rows = 0,
  icon = null,
  options = null,
  options_key_value = "value",
  options_key_text = "text",
  options_key_subtext = "subtext",
  multiple = false,
  disabled = false,
  value = null,
  decimalCount = 2,
  buttonText = "",
  accept = ".jpg,.jpeg,.png",
  minDate = null,
  maxDate = null,
  style = null,
  maxlength = null,
  dangerouslySetInnerHTML = null,
  uppercase = false,
  lowercase = false,
  firstUppercase = false,
  onChange = null,
  onBlur = null,
  onFocus = null,
  onKeyDown = null,
  onKeyUp = null,
  onKeyPress = null,
  onMouseDown = null,
  onMouseUp = null,
  onMouseEnter = null,
  onMouseLeave = null,
  onRemoveImage = null
}) {
  const myInputId = `key${Date.now() + Math.random().toString(36).substr(2, 9)}`;
  const fileInputRef = (0, _react.useRef)(null);
  const [loaded, setLoaded] = (0, _react.useState)(false);
  const [myValue, setMyValue] = (0, _react.useState)(value);
  const [myEyeView, setMyEyeView] = (0, _react.useState)(false);
  const [myFileName, setMyFileName] = (0, _react.useState)(null);
  const [myTitleLite, setMyTitleLite] = (0, _react.useState)("");
  const [filtertext, setFiltertext] = (0, _react.useState)("");
  const [isError, setIsError] = (0, _react.useState)(false);
  const [isTyping, setIsTyping] = (0, _react.useState)(false);
  const typingTimeoutRef = (0, _react.useRef)(null);
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  const calculateFileSize = sizeInBytes => {
    const units = ['B', 'KB', 'MB'];
    let size = sizeInBytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };
  const moneyFormat = _value => {
    let money = '';
    let inputValue = _value;
    if (inputValue == null || inputValue == undefined || inputValue == '') return money;
    try {
      inputValue = inputValue.toString();
      // Tüm virgülleri kaldır ve son girilen karakteri kontrol et
      money = inputValue.replace(/,/g, '');
      const lastChar = inputValue.slice(-1);
      if (lastChar === ',') {
        money = money + '.';
      }

      // Sadece sayılar ve tek bir nokta kalacak şekilde temizle
      money = money.replace(/[^0-9.]/g, '');

      // Birden fazla nokta varsa ilkini koru
      const parts = money.split('.');
      if (parts.length > 2) {
        money = parts[0] + '.' + parts[1];
      }

      // Noktadan sonra en fazla 2 basamak
      if (parts.length === 2 && parts[1].length > decimalCount) {
        money = parts[0] + '.' + parts[1].substring(0, decimalCount);
      }

      // Binlik ayracı için formatlama
      if (money) {
        const numParts = money.split('.');
        if (numParts[0]) {
          // Sayıyı önce tam sayıya çevir, sonra binlik ayracı ekle
          numParts[0] = parseInt(numParts[0], 10).toLocaleString('en-US');
        }
        money = numParts.join('.');
      }
      const numParts = money.split('.');
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
  const onMyBlur = e => {
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
  const onMyFocus = e => {
    if (onFocus != null) onFocus(e);
  };
  const onMyKeyDown = e => {
    if (onKeyDown != null) onKeyDown(e);
  };
  const onMyKeyUp = e => {
    if (onKeyUp != null) onKeyUp(e);
  };
  const onMyKeyPress = e => {
    if (onKeyPress != null) onKeyPress(e);
  };
  const onMyMouseDown = e => {
    if (onMouseDown != null) onMouseDown(e);
  };
  const onMyMouseUp = e => {
    if (onMouseUp != null) onMouseUp(e);
  };
  const onMyMouseEnter = e => {
    if (onMouseEnter != null) onMouseEnter(e);
  };
  const onMyMouseLeave = e => {
    if (onMouseLeave != null) onMouseLeave(e);
  };
  const onRemoveImageClick = e => {
    if (onRemoveImage != null) onRemoveImage();
  };
  const handleChange = (0, _react.useCallback)(e => {
    const newValue = e.target.value;

    // Eğer değer değişmediyse güncelleme yapma
    if (newValue === myValue) return;

    // Typing durumunu güncelle
    setIsTyping(true);

    // Önceki timeout'u temizle
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Yeni timeout ayarla
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (onChange) {
        onChange({
          value: newValue,
          target: {
            value: newValue
          }
        });
      }
    }, 300); // 300ms gecikme

    // State'i güncelle
    setMyValue(newValue);
  }, [myValue, onChange]);
  const onMyChange = async e => {
    if (type === MyInputType.FILE || type === MyInputType.IMAGE) {
      let files = [];
      if (e.target.files.length > 0) {
        let totalSize = 0;
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i];
          totalSize += parseInt(file.size);
          files.push({
            base64: await toBase64(file),
            filename: file.name,
            size: file.size,
            sizeText: calculateFileSize(file.size)
          });
        }
        totalSize = calculateFileSize(totalSize);
        setMyFileName(`<span>${files.length == 1 ? files[0].filename : files.length + " Dosya Seçildi"}</span>
                    <small>(${totalSize})</small>`);
      } else {
        setMyFileName("");
      }
      setMyValue(files);
      if (onChange) {
        onChange({
          value: files,
          target: {
            value: files
          }
        });
      }
    } else {
      handleChange(e);
    }
  };
  const mySelectFilterListClick = item => {
    const selectElement = document.getElementById("mySelectFilterHiddenSelect" + myInputId);
    selectElement.value = item.value;
    setMyValue(item.value);
    setFiltertext("");
  };
  const getMyValueText = () => {
    if (!myValue || myValue == 0) return "";
    if (!MyInputIsNumeric(myValue) || options == null) return myValue;
    let result = options.find(e => e.value.toString() == myValue.toString());
    if (result) return result.text + (result[options_key_subtext] ? ` - <span style="color: #73889d; font-style: italic; font-weight: 300;">${result[options_key_subtext]}</span>` : '');
    return "";
  };
  const filterSelectEvents = () => {
    const selectElement = document.getElementById("mySelectFilterSelected" + (id ? id : myInputId));
    const selectListElement = document.getElementById("mySelectFilterList" + (id ? id : myInputId));
    const filterInput = document.getElementById("mySelectFilterInput" + (id ? id : myInputId));
    if (!selectElement || !selectListElement || !filterInput) return;
    let isInputFocused = false;

    // Select'e tıklandığında seçim listesini aç
    selectElement.addEventListener('click', function () {
      if (!isInputFocused) {
        filterInput.style.display = 'block';
        selectListElement.style.display = 'block';
        setTimeout(() => {
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
      setTimeout(() => {
        setFiltertext("");
        filterInput.style.display = 'none';
        selectListElement.style.display = 'none';
      }, 150); // Gecikme ile select kapanmasını sağla
    });
  };
  const getFilterOptions = () => {
    let rv = options.filter(() => true);
    if (filtertext != "") {
      rv = rv.filter(e => e.text.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()));
    }
    return rv;
  };
  const getFileImageControl = filename => {
    if (!filename) return false;
    if (filename.includes(";base64,")) return true;
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    return validExtensions.some(ext => filename.toString().toLocaleLowerCase().includes(ext));
  };
  (0, _react.useEffect)(() => {
    if (loaded) {
      let vl = value;
      if (value == undefined) vl = null;
      if (vl == null && (type == MyInputType.TEXT || type == MyInputType.MAIL || type == MyInputType.TEXTAREA || type == MyInputType.PASSWORD)) vl = "";
      if (vl != myValue) setMyValue(vl);
      if (vl == null) setMyFileName(null);
    }
  }, [value, loaded, type]);
  (0, _react.useEffect)(() => {
    if (!isTyping && value !== myValue) {
      setMyValue(value);
    }
  }, [value, isTyping]);
  (0, _react.useEffect)(() => {
    if (title) {
      setMyTitleLite(title.replace(/<\/?[^>]+(>|$)/g, ""));
    }
  }, [title]);
  (0, _react.useEffect)(() => {
    setLoaded(true);
    if (type == MyInputType.SELECTFILTER) filterSelectEvents();
    if (type == MyInputType.DATE) {
      const dateInput = document.getElementById("myDate" + myInputId);
      dateInput.addEventListener('click', () => {
        // Tarih seçiciyi göstermek için odaklanma
        dateInput.showPicker?.(); // Eğer destekliyorsa
      });
    }
    if (type == MyInputType.DATETIME) {
      const dateTimeInput = document.getElementById("myDateTime" + myInputId);
      dateTimeInput.addEventListener('click', () => {
        // Tarih seçiciyi göstermek için odaklanma
        dateTimeInput.showPicker?.(); // Eğer destekliyorsa
      });
    }
    if (type == MyInputType.TIME) {
      const timeInput = document.getElementById("myTime" + myInputId);
      timeInput.addEventListener('click', () => {
        // Saat seçiciyi göstermek için odaklanma
        timeInput.showPicker?.(); // Eğer destekliyorsa
      });
    }
  }, []);
  (0, _react.useEffect)(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  const renderInput = () => {
    if (disabled || type === MyInputType.READONLY) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: _MyInputModule.default.disabledInput,
        dangerouslySetInnerHTML: dangerouslySetInnerHTML ? dangerouslySetInnerHTML : {
          __html: getMyValueText()
        },
        style: rows > 0 ? {
          ...(style ? style : {}),
          height: rows * 30 + 'px',
          alignItems: "flex-start"
        } : style
      });
    }
    const inputTypes = {
      [MyInputType.TEXT]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: myValue || '',
          onChange: handleChange,
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
      }),
      [MyInputType.MAIL]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: myValue?.toLowerCase(),
          onChange: e => onMyChange({
            ...e,
            target: {
              ...e.target,
              value: e.target.value.toLowerCase().replace(/\s/g, '')
            }
          }),
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
      }),
      [MyInputType.PHONE]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: myValue,
          onChange: e => {
            const value = e.target.value.replace(/[^0-9()-]/g, '');
            onMyChange({
              ...e,
              target: {
                ...e.target,
                value
              }
            });
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
      }),
      [MyInputType.MONEY]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "text",
          value: moneyFormat(myValue),
          onChange: handleChange,
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
      }),
      [MyInputType.NUMBER]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "number",
          value: myValue,
          onChange: handleChange,
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
      }),
      [MyInputType.DATE]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          type: "date",
          id: "myDate" + myInputId,
          value: myValue || '',
          onChange: handleChange,
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
      }),
      [MyInputType.DATETIME]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          type: "datetime-local",
          id: "myDateTime" + myInputId,
          value: myValue || '',
          onChange: handleChange,
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
      }),
      [MyInputType.TIME]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          type: "time",
          id: "myTime" + myInputId,
          value: myValue || '',
          onChange: handleChange,
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
      }),
      [MyInputType.PASSWORD]: () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: myEyeView ? "text" : "password",
          value: myValue,
          onChange: handleChange,
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
          className: _MyInputModule.default.eye,
          onClick: () => setMyEyeView(!myEyeView),
          children: myEyeView ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiEyeSlash, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiEye, {})
        })]
      }),
      [MyInputType.COLOR]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: id,
          type: "color",
          value: myValue,
          onChange: handleChange,
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
      }),
      [MyInputType.TEXTAREA]: () => /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
        ref: ref,
        id: id,
        onChange: handleChange,
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
      }),
      [MyInputType.SELECT]: () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
          ref: ref,
          id: id,
          onChange: handleChange,
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
          children: options && options.map(e => {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: MyInputIsNumeric(e[options_key_value]) ? parseInt(e[options_key_value]) : e[options_key_value],
              children: e[options_key_text] || e["label"]
            }, e[options_key_value]);
          })
        }), !myValue && !options && (placeholder || myTitleLite) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyInputModule.default.placeholder,
          children: placeholder ? placeholder : myTitleLite
        })]
      }),
      [MyInputType.SELECTFILTER]: () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          ref: ref,
          id: "mySelectFilterInput" + (id ? id : myInputId),
          type: "text",
          className: _MyInputModule.default.filterInput,
          style: style,
          value: filtertext,
          onChange: e => setFiltertext(e.target.value),
          placeholder: placeholdersearchtext && placeholdersearchtext != "" ? placeholdersearchtext : (placeholder ? placeholder : myTitleLite) + " Ara",
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
          className: _MyInputModule.default.filterInputSelectedContainer + " " + (myValue ? _MyInputModule.default.filterInputSelectedContainerSelected : ''),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            id: "mySelectFilterSelected" + (id ? id : myInputId),
            className: _MyInputModule.default.filterInputSelected,
            dangerouslySetInnerHTML: {
              __html: getMyValueText()
            }
          }), myValue && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _MyInputModule.default.filterInputSelectedX,
            onClick: () => setMyValue(null),
            title: "Se\xE7imi Kald\u0131r",
            children: "x"
          }) || "", /*#__PURE__*/(0, _jsxRuntime.jsx)(_pi.PiCaretDownBold, {
            className: _MyInputModule.default.caretdown
          })]
        }), !myValue && (placeholder || myTitleLite) && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyInputModule.default.placeholder,
          children: placeholder ? placeholder : myTitleLite
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
          id: "mySelectFilterList" + (id ? id : myInputId),
          className: _MyInputModule.default.filterInputList,
          children: options && getFilterOptions().map(item => {
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
              value: MyInputIsNumeric(item[options_key_value]) ? parseInt(item[options_key_value]) : item[options_key_value],
              onClick: () => mySelectFilterListClick(item),
              className: item[options_key_subtext] ? _MyInputModule.default.subtextli : '',
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                dangerouslySetInnerHTML: {
                  __html: item[options_key_text] || item["label"]
                }
              }), item[options_key_subtext] && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: _MyInputModule.default.subtext,
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
            onChange: handleChange,
            value: myValue && !isNaN(myValue) ? MyInputIsNumeric(myValue) ? parseInt(myValue) : myValue : "",
            children: options && options.map(item => {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
                value: MyInputIsNumeric(item[options_key_value]) ? parseInt(item[options_key_value]) : item[options_key_value],
                children: item[options_key_text] || item["label"]
              }, item[options_key_value]);
            })
          })
        })]
      }),
      [MyInputType.FILE]: () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: _MyInputModule.default.fileinput,
        children: [(() => {
          // Dosya önizleme gösterimi için kontrol
          if (myValue && (type === MyInputType.IMAGE || accept === '.jpg,.jpeg,.png')) {
            if (Array.isArray(myValue) && myValue.length === 1 && getFileImageControl(myValue[0].filename)) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: myValue[0].base64,
                className: _MyInputModule.default.fileImagePreview,
                alt: "Preview"
              });
            } else if (getFileImageControl(myValue)) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                src: myValue,
                className: _MyInputModule.default.fileImagePreview,
                alt: "Preview"
              });
            }
          }
          return null;
        })(), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: _MyInputModule.default.filename + " " + (myFileName && _MyInputModule.default.selected),
          dangerouslySetInnerHTML: {
            __html: myFileName || (placeholder ? placeholder : type === MyInputType.IMAGE ? "Görsel Seçiniz" : "Dosya Seçiniz")
          }
        }), (() => {
          if (onRemoveImage && myValue && type === MyInputType.IMAGE && (Array.isArray(myValue) && myValue.length === 1 && getFileImageControl(myValue[0].filename) || getFileImageControl(myValue) && !(myValue.includes("nologo") || myValue.includes("noimage")))) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              type: "button",
              onClick: onRemoveImageClick,
              className: _MyInputModule.default.filebuttonremove,
              title: "Kald\u0131r",
              children: "x"
            });
          }
          return null;
        })(), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          type: "button",
          onClick: () => fileInputRef.current.click(),
          className: _MyInputModule.default.filebutton,
          children: type === MyInputType.IMAGE ? "Görsel Seç" : "Dosya Seç"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "file",
          ref: fileInputRef,
          onChange: handleChange,
          placeholder: placeholder || myTitleLite,
          style: {
            display: "none"
          },
          ...(multiple ? {
            multiple: true
          } : {}),
          accept: type === MyInputType.IMAGE ? '.jpg,.jpeg,.png' : accept
        })]
      }),
      [MyInputType.IMAGE]: function () {
        return this[MyInputType.FILE]();
      }
    };
    return inputTypes[type]?.() || null;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "myinput" + myInputId,
    className: _MyInputModule.default.container + " " + (className != null ? className : '') + " " + (isError ? _MyInputModule.default.error : ''),
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
      className: _MyInputModule.default.inputblock + " " + (disabled || type === MyInputType.READONLY ? _MyInputModule.default.inputblockdisabled : '') + " " + (icon || type === MyInputType.IMAGE ? _MyInputModule.default.inputblockicon : ''),
      style: style && {
        ...(style.backgroundColor && {
          backgroundColor: style.backgroundColor
        })
      },
      children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: `${_MyInputModule.default.icon} ${type === MyInputType.TEXTAREA || rows > 0 ? _MyInputModule.default.icontextarea : ''}`,
        children: icon
      }), renderInput()]
    }), description && /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
      className: _MyInputModule.default.description,
      children: description
    })]
  });
}
var _default = exports.default = MyInput;