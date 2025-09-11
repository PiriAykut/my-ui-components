"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MyTableIsNumeric = exports.CountBlock = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MyTableModule = _interopRequireDefault(require("./MyTable.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyTableIsNumeric = value => {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
};
exports.MyTableIsNumeric = MyTableIsNumeric;
const CountBlock = ({
  count,
  t
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _MyTableModule.default.rowsCount,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: count
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
      children: t ? t("kayıt listelendi") : "Records Listed"
    })]
  });
};
exports.CountBlock = CountBlock;
function MyTable({
  columns = [],
  //
  data = null,
  emptyText = "",
  children,
  height = null,
  totalCount = null,
  onSearchText = null,
  searchable = false,
  showCount = false,
  pageSize = 0,
  selectedRow = null,
  onRowClick = null,
  onPageChange = null,
  t = null
}) {
  const tableid = `key${Date.now() + Math.random().toString(36).substr(2, 9)}`;
  const [curEmptyText, setCurEmptyText] = (0, _react.useState)(emptyText);
  const [curTotalCount, setCurTotalCount] = (0, _react.useState)(data ? data.length : totalCount);
  const [searchTerm, setSearchTerm] = (0, _react.useState)("");
  const [filteredRows, setFilteredRows] = (0, _react.useState)([]);
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  const [totalPages, setTotalPages] = (0, _react.useState)(0);
  const [sortConfig, setSortConfig] = (0, _react.useState)({
    key: null,
    direction: "asc"
  });
  const [displayData, setDisplayData] = (0, _react.useState)([]);
  const arrChild = _react.default.Children.toArray(children);
  let childHeader = null;
  let childBody = null;
  if (arrChild.length > 0) {
    for (let i = 0; i < arrChild.length; i++) {
      const el = arrChild[i];
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
  (0, _react.useEffect)(() => {
    let processedData = Array.isArray(data) ? [...data] : [];

    // Arama işlemi
    if (searchTerm != "") {
      processedData = processedData.filter(record => {
        let _status = false;
        Object.keys(record).forEach(key => {
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
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (MyTableIsNumeric(aValue) && MyTableIsNumeric(bValue)) {
          return sortConfig.direction === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        }
        return sortConfig.direction === "asc" ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
      });
    }

    // Sayfalama
    if (pageSize > 0) {
      const startIndex = (currentPage - 1) * pageSize;
      processedData = processedData.slice(startIndex, startIndex + pageSize);
    }
    setDisplayData(processedData);
    if (data) {
      setCurTotalCount(data.length);
    } else {
      setCurTotalCount(0);
    }
  }, [data, searchTerm, sortConfig, currentPage, pageSize]);
  (0, _react.useEffect)(() => {
    if (emptyText == "") {
      setCurEmptyText(t ? t("Henüz bir kayıt mevcut değil!") : "No records found!");
    }
    if (t) {}
    return () => {};
  }, [tableid]);

  // Arama işlevi
  const filterRows = row => {
    if (!searchTerm) return true;
    const cells = row.props.children;
    return _react.default.Children.toArray(cells).some(cell => {
      const cellText = cell.props.children ? cell.props.children.toString().trim().toLocaleLowerCase() : "";
      const cleanCellText = cellText.replace(/[^a-zA-Z0-9\s]/g, ""); // Virgül ve diğer özel karakterleri temizle
      const cleanSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, "").toLocaleLowerCase(); // Aynı şekilde arama terimini temizle

      return cleanCellText.includes(cleanSearchTerm);
    });
  };

  // Sıralama işleyicisi
  const handleSort = key => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc"
    }));
  };

  // Sütun başlığı render fonksiyonu
  const renderColumnHeader = column => {
    const isSorted = sortConfig.key === column.key;
    const sortDirection = isSorted ? sortConfig.direction : null;
    let style = {};
    if (column.style) style = {
      ...style,
      ...column.style
    };
    if (column.width) style = {
      ...style,
      width: column.width
    };

    //style = { ...style, minWidth: column.width || "150px" };

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
      onClick: column.sortable ? () => handleSort(column.key) : undefined,
      className: `
                        ${_MyTableModule.default.th}
                        ${column.className && column.className || ""}
                        ${column.sortable ? _MyTableModule.default.sortable : ""}
                        ${isSorted ? _MyTableModule.default[`sort-${sortDirection}`] : ""}
                        `,
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: `${_MyTableModule.default.thContainer}`,
        children: column.title
      })
    }, "head" + column.key + btoa(Math.random().toString(36).substr(2, 9)));
  };

  // Hücre render fonksiyonu
  const renderCell = (item, column, index) => {
    const value = item[column.key];
    const content = column.render ? column.render(value, item, index, currentPage) : value;
    const key = "cell" + column.key + btoa(Math.random().toString(36).substr(2, 9));

    // If the content is already a React element (like from a render function that returns MathJax),
    // just return it directly in the cell
    if (/*#__PURE__*/_react.default.isValidElement(content)) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        style: column.tdStyle,
        className: `${_MyTableModule.default.td} ${column.tdClassName && column.tdClassName || ""}`,
        "data-row-index": index,
        children: content
      }, key);
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      style: column.tdStyle,
      className: `${_MyTableModule.default.td} ${column.tdClassName && column.tdClassName || ""}`,
      "data-row-index": index,
      children: typeof content === "string" ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        dangerouslySetInnerHTML: {
          __html: content
        }
      }) : content
    }, key);
  };

  // Filtrelenen satırları güncelle
  (0, _react.useEffect)(() => {
    if (onSearchText == null) {
      if (childBody) {
        const rows = _react.default.Children.toArray(childBody.props.children);
        const filtered = rows.filter(row => filterRows(row));
        setFilteredRows(filtered);
      }
    } else {
      onSearchText(searchTerm);
    }
  }, [searchTerm, children]);

  // Sayfa değiştirme işleyicisi
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  // Sayfalama render fonksiyonu
  const renderPagination = () => {
    if (pageSize == 0 || totalPages <= 1) return null;
    const maxVisiblePages = 10;
    let pagesToShow = [];
    if (totalPages <= maxVisiblePages) {
      // Toplam sayfa sayısı 10 veya daha az ise hepsini göster
      pagesToShow = Array.from({
        length: totalPages
      }, (_, i) => i + 1);
    } else {
      // Her zaman ilk ve son sayfayı göster
      // Aktif sayfanın etrafında dengeli dağılım yap
      const sidePages = 4; // Aktif sayfanın her iki yanında kaç sayfa gösterileceği

      if (currentPage <= sidePages + 1) {
        // Başlangıçtayız
        pagesToShow = [...Array(maxVisiblePages - 1).keys()].map(i => i + 1);
        pagesToShow.push(totalPages);
      } else if (currentPage >= totalPages - sidePages) {
        // Sondayız
        pagesToShow = [1];
        pagesToShow.push(...Array.from({
          length: maxVisiblePages - 1
        }, (_, i) => totalPages - (maxVisiblePages - 2) + i));
      } else {
        // Ortadayız
        pagesToShow = [1];
        const start = currentPage - Math.floor((maxVisiblePages - 4) / 2);
        const end = currentPage + Math.floor((maxVisiblePages - 4) / 2);
        pagesToShow.push(...Array.from({
          length: end - start + 1
        }, (_, i) => start + i));
        pagesToShow.push(totalPages);
      }
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _MyTableModule.default.pagination,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => handlePageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: _MyTableModule.default.pageButton,
        children: "<"
      }), pagesToShow.map((page, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
        children: [index > 0 && pagesToShow[index] - pagesToShow[index - 1] > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: _MyTableModule.default.pageEllipsis,
          children: "..."
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: () => handlePageChange(page),
          className: `${_MyTableModule.default.pageButton} ${currentPage === page ? _MyTableModule.default.activePage : ""}`,
          children: page
        })]
      }, page)), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: () => handlePageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: _MyTableModule.default.pageButton,
        children: ">"
      })]
    });
  };
  const headerCellsCount = columns.filter(column => column.title).length > 0 ? columns.filter(column => column.title).length : childBody ? _react.default.Children.count(childBody.props.children.props.children) : 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: tableid,
    className: `${_MyTableModule.default.myTableContainer} ${searchable && _MyTableModule.default.searchable} ${totalPages > 0 && _MyTableModule.default.myTablePagination}`,
    style: {
      height: height
    },
    children: [searchable && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: _MyTableModule.default.searchContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "text"
        // placeholder={t("Ara")}
        ,
        placeholder: t ? t("Listede Ara") : "Search",
        value: searchTerm,
        className: _MyTableModule.default.searchInput,
        onChange: e => setSearchTerm(e.target.value)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CountBlock, {
        count: curTotalCount && curTotalCount || childBody && childBody.props.children.length || 0,
        t: t
      })]
    }) || showCount && /*#__PURE__*/(0, _jsxRuntime.jsx)(CountBlock, {
      count: curTotalCount && curTotalCount || childBody && childBody.props.children.length || 0
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: _MyTableModule.default.myTable,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
        className: _MyTableModule.default.table,
        children: [columns.filter(column => column.title).length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
          className: _MyTableModule.default.thead,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
            className: _MyTableModule.default.tr,
            children: columns.filter(column => column.title).map(renderColumnHeader)
          })
        }) : childHeader, /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
          children: onSearchText && childBody && childBody.props.children.length > 0 && childBody.props.children || filteredRows && filteredRows.length > 0 && filteredRows || displayData.length > 0 && displayData.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
            onClick: () => onRowClick && onRowClick(item),
            className: `
                    ${_MyTableModule.default.tr}
                    ${onRowClick ? _MyTableModule.default.clickable : ""}
                    ${selectedRow === item ? _MyTableModule.default.selected : ""}
                  `,
            children: [columns.filter(column => column.title).map(column => renderCell(item, column, index)), children && /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: typeof children === "function" ? children(item) : children
            })]
          }, index)) || /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
            className: _MyTableModule.default.noData + " " + _MyTableModule.default.tr,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              colSpan: headerCellsCount,
              className: _MyTableModule.default.td,
              children: searchTerm != "" && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                dangerouslySetInnerHTML: {
                  __html: `${t ? t("Aradığınız kriterlere uygun kayıt bulunamadı!") : "No records found for the criteria you searched for!"}<br/><b>(${searchTerm})</b>`
                }
              }) || curEmptyText
            })
          })
        })]
      })
    }), totalPages > 0 && renderPagination()]
  });
}
var _default = exports.default = MyTable;