"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MyTableIsNumeric = exports.CountBlock = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MyTableModule = _interopRequireDefault(require("./MyTable.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MyTableIsNumeric = exports.MyTableIsNumeric = function MyTableIsNumeric(value) {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
};
var CountBlock = exports.CountBlock = function CountBlock(_ref) {
  var count = _ref.count;
  var _useTranslation = useTranslation(),
    t = _useTranslation.t;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _MyTableModule["default"].rowsCount,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: count
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
      children: t("kayıt listelendi")
    })]
  });
};
function MyTable(_ref2) {
  var _ref2$columns = _ref2.columns,
    columns = _ref2$columns === void 0 ? [] : _ref2$columns,
    _ref2$data = _ref2.data,
    data = _ref2$data === void 0 ? null : _ref2$data,
    _ref2$emptyText = _ref2.emptyText,
    emptyText = _ref2$emptyText === void 0 ? "" : _ref2$emptyText,
    children = _ref2.children,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? null : _ref2$height,
    _ref2$totalCount = _ref2.totalCount,
    totalCount = _ref2$totalCount === void 0 ? null : _ref2$totalCount,
    _ref2$onSearchText = _ref2.onSearchText,
    onSearchText = _ref2$onSearchText === void 0 ? null : _ref2$onSearchText,
    _ref2$searchable = _ref2.searchable,
    searchable = _ref2$searchable === void 0 ? false : _ref2$searchable,
    _ref2$showCount = _ref2.showCount,
    showCount = _ref2$showCount === void 0 ? false : _ref2$showCount,
    _ref2$pageSize = _ref2.pageSize,
    pageSize = _ref2$pageSize === void 0 ? 0 : _ref2$pageSize,
    _ref2$selectedRow = _ref2.selectedRow,
    selectedRow = _ref2$selectedRow === void 0 ? null : _ref2$selectedRow,
    _ref2$onRowClick = _ref2.onRowClick,
    onRowClick = _ref2$onRowClick === void 0 ? null : _ref2$onRowClick,
    _ref2$onPageChange = _ref2.onPageChange,
    onPageChange = _ref2$onPageChange === void 0 ? null : _ref2$onPageChange;
  var tableid = "key".concat(Date.now() + Math.random().toString(36).substr(2, 9));
  var _useState = (0, _react.useState)(emptyText),
    _useState2 = _slicedToArray(_useState, 2),
    curEmptyText = _useState2[0],
    setCurEmptyText = _useState2[1];
  var _useState3 = (0, _react.useState)(data ? data.length : totalCount),
    _useState4 = _slicedToArray(_useState3, 2),
    curTotalCount = _useState4[0],
    setCurTotalCount = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    searchTerm = _useState6[0],
    setSearchTerm = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    filteredRows = _useState8[0],
    setFilteredRows = _useState8[1];
  var _useState9 = (0, _react.useState)(1),
    _useState10 = _slicedToArray(_useState9, 2),
    currentPage = _useState10[0],
    setCurrentPage = _useState10[1];
  var _useState11 = (0, _react.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    totalPages = _useState12[0],
    setTotalPages = _useState12[1];
  var _useState13 = (0, _react.useState)({
      key: null,
      direction: "asc"
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    sortConfig = _useState14[0],
    setSortConfig = _useState14[1];
  var _useState15 = (0, _react.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    displayData = _useState16[0],
    setDisplayData = _useState16[1];
  var arrChild = _react["default"].Children.toArray(children);
  var childHeader = null;
  var childBody = null;
  if (arrChild.length > 0) {
    for (var i = 0; i < arrChild.length; i++) {
      var el = arrChild[i];
      if (el.type.toString().includes("MyTableTagHead")) {
        childHeader = el;
      } else if (el.type.toString().includes("MyTableTagBody")) {
        childBody = el;
      } else if (childBody == null) {
        childBody = el;
      }
    }
  }

  // Veri işleme ve sıralama
  (0, _react.useEffect)(function () {
    var processedData = Array.isArray(data) ? _toConsumableArray(data) : [];

    // Arama işlemi
    if (searchTerm != "") {
      processedData = processedData.filter(function (record) {
        var _status = false;
        Object.keys(record).forEach(function (key) {
          if (record[key] && record[key].toString().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            _status = true;
          }
        });
        return _status;
      });
    }
    setTotalPages(Math.ceil(processedData.length / pageSize));

    // Sıralama işlemi
    if (sortConfig.key) {
      processedData.sort(function (a, b) {
        var aValue = a[sortConfig.key];
        var bValue = b[sortConfig.key];
        if (MyTableIsNumeric(aValue) && MyTableIsNumeric(bValue)) {
          return sortConfig.direction === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        }
        return sortConfig.direction === "asc" ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
      });
    }

    // Sayfalama
    if (pageSize > 0) {
      var startIndex = (currentPage - 1) * pageSize;
      processedData = processedData.slice(startIndex, startIndex + pageSize);
    }
    setDisplayData(processedData);
    if (data) {
      setCurTotalCount(data.length);
    } else {
      setCurTotalCount(0);
    }
  }, [data, searchTerm, sortConfig, currentPage, pageSize]);
  (0, _react.useEffect)(function () {
    if (emptyText == "") {
      // setCurEmptyText(t("Henüz bir kayıt mevcut değil!"));
      setCurEmptyText("No records found!");
    }
    return function () {};
  }, [tableid]);

  // Arama işlevi
  var filterRows = function filterRows(row) {
    if (!searchTerm) return true;
    var cells = row.props.children;
    return _react["default"].Children.toArray(cells).some(function (cell) {
      var cellText = cell.props.children ? cell.props.children.toString().trim().toLocaleLowerCase() : "";
      var cleanCellText = cellText.replace(/[^a-zA-Z0-9\s]/g, ""); // Virgül ve diğer özel karakterleri temizle
      var cleanSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, "").toLocaleLowerCase(); // Aynı şekilde arama terimini temizle

      return cleanCellText.includes(cleanSearchTerm);
    });
  };

  // Sıralama işleyicisi
  var handleSort = function handleSort(key) {
    setSortConfig(function (prevSort) {
      return {
        key: key,
        direction: prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc"
      };
    });
  };

  // Sütun başlığı render fonksiyonu
  var renderColumnHeader = function renderColumnHeader(column) {
    var isSorted = sortConfig.key === column.key;
    var sortDirection = isSorted ? sortConfig.direction : null;
    var style = {};
    if (column.style) style = _objectSpread(_objectSpread({}, style), column.style);
    if (column.width) style = _objectSpread(_objectSpread({}, style), {}, {
      width: column.width
    });

    //style = { ...style, minWidth: column.width || "150px" };

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
      onClick: column.sortable ? function () {
        return handleSort(column.key);
      } : undefined,
      className: "\n                        ".concat(_MyTableModule["default"].th, "\n                        ").concat(column.className && column.className || "", "\n                        ").concat(column.sortable ? _MyTableModule["default"].sortable : "", "\n                        ").concat(isSorted ? _MyTableModule["default"]["sort-".concat(sortDirection)] : "", "\n                        "),
      style: style,
      children: column.title
    }, "head" + column.key + btoa(Math.random().toString(36).substr(2, 9)));
  };

  // Hücre render fonksiyonu
  var renderCell = function renderCell(item, column, index) {
    var value = item[column.key];
    var content = column.render ? column.render(value, item, index, currentPage) : value;
    var key = "cell" + column.key + btoa(Math.random().toString(36).substr(2, 9));

    // If the content is already a React element (like from a render function that returns MathJax),
    // just return it directly in the cell
    if (/*#__PURE__*/_react["default"].isValidElement(content)) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        style: column.tdStyle,
        className: "".concat(_MyTableModule["default"].td, " ").concat(column.tdClassName && column.tdClassName || ""),
        "data-row-index": index,
        children: content
      }, key);
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      style: column.tdStyle,
      className: "".concat(_MyTableModule["default"].td, " ").concat(column.tdClassName && column.tdClassName || ""),
      "data-row-index": index,
      children: typeof content === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        dangerouslySetInnerHTML: {
          __html: content
        }
      }) : content
    }, key);
  };

  // Filtrelenen satırları güncelle
  (0, _react.useEffect)(function () {
    if (onSearchText == null) {
      if (childBody) {
        var rows = _react["default"].Children.toArray(childBody.props.children);
        var filtered = rows.filter(function (row) {
          return filterRows(row);
        });
        setFilteredRows(filtered);
      }
    } else {
      onSearchText(searchTerm);
    }
  }, [searchTerm, children]);

  // Sayfa değiştirme işleyicisi
  var handlePageChange = function handlePageChange(page) {
    setCurrentPage(page);
  };
  // Sayfalama render fonksiyonu
  var renderPagination = function renderPagination() {
    if (pageSize == 0 || totalPages <= 1) return null;
    var maxVisiblePages = 10;
    var pagesToShow = [];
    if (totalPages <= maxVisiblePages) {
      // Toplam sayfa sayısı 10 veya daha az ise hepsini göster
      pagesToShow = Array.from({
        length: totalPages
      }, function (_, i) {
        return i + 1;
      });
    } else {
      // Her zaman ilk ve son sayfayı göster
      // Aktif sayfanın etrafında dengeli dağılım yap
      var sidePages = 4; // Aktif sayfanın her iki yanında kaç sayfa gösterileceği

      if (currentPage <= sidePages + 1) {
        // Başlangıçtayız
        pagesToShow = _toConsumableArray(Array(maxVisiblePages - 1).keys()).map(function (i) {
          return i + 1;
        });
        pagesToShow.push(totalPages);
      } else if (currentPage >= totalPages - sidePages) {
        var _pagesToShow;
        // Sondayız
        pagesToShow = [1];
        (_pagesToShow = pagesToShow).push.apply(_pagesToShow, _toConsumableArray(Array.from({
          length: maxVisiblePages - 1
        }, function (_, i) {
          return totalPages - (maxVisiblePages - 2) + i;
        })));
      } else {
        var _pagesToShow2;
        // Ortadayız
        pagesToShow = [1];
        var start = currentPage - Math.floor((maxVisiblePages - 4) / 2);
        var end = currentPage + Math.floor((maxVisiblePages - 4) / 2);
        (_pagesToShow2 = pagesToShow).push.apply(_pagesToShow2, _toConsumableArray(Array.from({
          length: end - start + 1
        }, function (_, i) {
          return start + i;
        })));
        pagesToShow.push(totalPages);
      }
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _MyTableModule["default"].pagination,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: function onClick() {
          return handlePageChange(currentPage - 1);
        },
        disabled: currentPage === 1,
        className: _MyTableModule["default"].pageButton,
        children: "<"
      }), pagesToShow.map(function (page, index) {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react["default"].Fragment, {
          children: [index > 0 && pagesToShow[index] - pagesToShow[index - 1] > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: _MyTableModule["default"].pageEllipsis,
            children: "..."
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            onClick: function onClick() {
              return handlePageChange(page);
            },
            className: "".concat(_MyTableModule["default"].pageButton, " ").concat(currentPage === page ? _MyTableModule["default"].activePage : ""),
            children: page
          })]
        }, page);
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: function onClick() {
          return handlePageChange(currentPage + 1);
        },
        disabled: currentPage === totalPages,
        className: _MyTableModule["default"].pageButton,
        children: ">"
      })]
    });
  };
  var headerCellsCount = columns.filter(function (column) {
    return column.title;
  }).length > 0 ? columns.filter(function (column) {
    return column.title;
  }).length : childBody ? _react["default"].Children.count(childBody.props.children.props.children) : 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: tableid,
    className: "".concat(_MyTableModule["default"].myTableContainer, " ").concat(searchable && _MyTableModule["default"].searchable, " ").concat(totalPages > 0 && _MyTableModule["default"].myTablePagination),
    style: {
      height: height
    },
    children: [searchable && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _MyTableModule["default"].searchContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "text"
        // placeholder={t("Ara")}
        ,
        placeholder: "Search",
        value: searchTerm,
        className: _MyTableModule["default"].searchInput,
        onChange: function onChange(e) {
          return setSearchTerm(e.target.value);
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CountBlock, {
        count: curTotalCount && curTotalCount || childBody && childBody.props.children.length || 0
      })]
    }) || showCount && /*#__PURE__*/(0, _jsxRuntime.jsx)(CountBlock, {
      count: curTotalCount && curTotalCount || childBody && childBody.props.children.length || 0
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: _MyTableModule["default"].myTable,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
        className: _MyTableModule["default"].table,
        children: [columns.filter(function (column) {
          return column.title;
        }).length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
          className: _MyTableModule["default"].thead,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
            className: _MyTableModule["default"].tr,
            children: columns.filter(function (column) {
              return column.title;
            }).map(renderColumnHeader)
          })
        }) : childHeader, /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
          children: onSearchText && childBody && childBody.props.children.length > 0 && childBody.props.children || filteredRows && filteredRows.length > 0 && filteredRows || displayData.length > 0 && displayData.map(function (item, index) {
            return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
              onClick: function onClick() {
                return onRowClick && onRowClick(item);
              },
              className: "\n                    ".concat(_MyTableModule["default"].tr, "\n                    ").concat(onRowClick ? _MyTableModule["default"].clickable : "", "\n                    ").concat(selectedRow === item ? _MyTableModule["default"].selected : "", "\n                  "),
              children: [columns.filter(function (column) {
                return column.title;
              }).map(function (column) {
                return renderCell(item, column, index);
              }), children && /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                children: typeof children === "function" ? children(item) : children
              })]
            }, index);
          }) || /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
            className: _MyTableModule["default"].noData + " " + _MyTableModule["default"].tr,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              colSpan: headerCellsCount,
              className: _MyTableModule["default"].td,
              children: searchTerm != "" && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                dangerouslySetInnerHTML: {
                  __html:
                  // t("Aradığınız kriterlere uygun kayıt bulunamadı!")
                  "No records found for the criteria you searched for!".concat("<br/><b>(", searchTerm, ")</b>")
                }
              }) || curEmptyText
            })
          })
        })]
      })
    }), totalPages > 0 && renderPagination()]
  });
}
var _default = exports["default"] = MyTable;