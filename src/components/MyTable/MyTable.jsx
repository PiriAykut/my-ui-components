import React, { useEffect, useState } from "react";
import styles from "./MyTable.module.css";

export const MyTableIsNumeric = (value) => {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const CountBlock = ({ count, t }) => {
  return (
    <div className={styles.rowsCount}>
      <span>{count}</span>
      <small>{t ? t("kayıt listelendi") : "Records Listed"}</small>
    </div>
  );
};

function MyTable({
  columns = [], //
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

  t = null,
}) {
  const tableid = `key${Date.now() + Math.random().toString(36).substr(2, 9)}`;

  const [curEmptyText, setCurEmptyText] = useState(emptyText);
  const [curTotalCount, setCurTotalCount] = useState(
    data ? data.length : totalCount
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [displayData, setDisplayData] = useState([]);

  const arrChild = React.Children.toArray(children);

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
  useEffect(() => {
    let processedData = Array.isArray(data) ? [...data] : [];

    // Arama işlemi
    if (searchTerm != "") {
      processedData = processedData.filter((record) => {
        let _status = false;

        Object.keys(record).forEach((key) => {
          if (
            record[key] &&
            record[key]
              .toString()
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          ) {
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
          return sortConfig.direction === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        return sortConfig.direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
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

  useEffect(() => {
    if (emptyText == "") {
      setCurEmptyText(
        t ? t("Henüz bir kayıt mevcut değil!") : "No records found!"
      );
    }

    if (t) {
    }

    return () => {};
  }, [tableid]);

  // Arama işlevi
  const filterRows = (row) => {
    if (!searchTerm) return true;

    const cells = row.props.children;
    return React.Children.toArray(cells).some((cell) => {
      const cellText = cell.props.children
        ? cell.props.children.toString().trim().toLocaleLowerCase()
        : "";

      const cleanCellText = cellText.replace(/[^a-zA-Z0-9\s]/g, ""); // Virgül ve diğer özel karakterleri temizle
      const cleanSearchTerm = searchTerm
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .toLocaleLowerCase(); // Aynı şekilde arama terimini temizle

      return cleanCellText.includes(cleanSearchTerm);
    });
  };

  // Sıralama işleyicisi
  const handleSort = (key) => {
    setSortConfig((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Sütun başlığı render fonksiyonu
  const renderColumnHeader = (column) => {
    const isSorted = sortConfig.key === column.key;
    const sortDirection = isSorted ? sortConfig.direction : null;
    let style = {};

    if (column.style) style = { ...style, ...column.style };

    if (column.width) style = { ...style, width: column.width };

    //style = { ...style, minWidth: column.width || "150px" };

    return (
      <th
        key={
          "head" + column.key + btoa(Math.random().toString(36).substr(2, 9))
        }
        onClick={column.sortable ? () => handleSort(column.key) : undefined}
        className={`
                        ${styles.th}
                        ${(column.className && column.className) || ""}
                        ${column.sortable ? styles.sortable : ""}
                        ${isSorted ? styles[`sort-${sortDirection}`] : ""}
                        `}
        style={style}
      >
        <div className={`${styles.thContainer}`}>{column.title}</div>
      </th>
    );
  };

  // Hücre render fonksiyonu
  const renderCell = (item, column, index) => {
    const value = item[column.key];
    const content = column.render
      ? column.render(value, item, index, currentPage)
      : value;
    const key =
      "cell" + column.key + btoa(Math.random().toString(36).substr(2, 9));

    // If the content is already a React element (like from a render function that returns MathJax),
    // just return it directly in the cell
    if (React.isValidElement(content)) {
      return (
        <td
          key={key}
          style={column.tdStyle}
          className={`${styles.td} ${
            (column.tdClassName && column.tdClassName) || ""
          }`}
          data-row-index={index}
        >
          {content}
        </td>
      );
    }

    return (
      <td
        key={key}
        style={column.tdStyle}
        className={`${styles.td} ${
          (column.tdClassName && column.tdClassName) || ""
        }`}
        data-row-index={index}
      >
        {typeof content === "string" ? (
          <span dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          content
        )}
      </td>
    );
  };

  // Filtrelenen satırları güncelle
  useEffect(() => {
    if (onSearchText == null) {
      if (childBody) {
        const rows = React.Children.toArray(childBody.props.children);
        const filtered = rows.filter((row) => filterRows(row));

        setFilteredRows(filtered);
      }
    } else {
      onSearchText(searchTerm);
    }
  }, [searchTerm, children]);

  // Sayfa değiştirme işleyicisi
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Sayfalama render fonksiyonu
  const renderPagination = () => {
    if (pageSize == 0 || totalPages <= 1) return null;

    const maxVisiblePages = 10;
    let pagesToShow = [];

    if (totalPages <= maxVisiblePages) {
      // Toplam sayfa sayısı 10 veya daha az ise hepsini göster
      pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Her zaman ilk ve son sayfayı göster
      // Aktif sayfanın etrafında dengeli dağılım yap
      const sidePages = 4; // Aktif sayfanın her iki yanında kaç sayfa gösterileceği

      if (currentPage <= sidePages + 1) {
        // Başlangıçtayız
        pagesToShow = [...Array(maxVisiblePages - 1).keys()].map((i) => i + 1);
        pagesToShow.push(totalPages);
      } else if (currentPage >= totalPages - sidePages) {
        // Sondayız
        pagesToShow = [1];
        pagesToShow.push(
          ...Array.from(
            { length: maxVisiblePages - 1 },
            (_, i) => totalPages - (maxVisiblePages - 2) + i
          )
        );
      } else {
        // Ortadayız
        pagesToShow = [1];
        const start = currentPage - Math.floor((maxVisiblePages - 4) / 2);
        const end = currentPage + Math.floor((maxVisiblePages - 4) / 2);
        pagesToShow.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
        );
        pagesToShow.push(totalPages);
      }
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          &lt;
        </button>

        {pagesToShow.map((page, index) => (
          <React.Fragment key={page}>
            {index > 0 && pagesToShow[index] - pagesToShow[index - 1] > 1 && (
              <span className={styles.pageEllipsis}>...</span>
            )}
            <button
              onClick={() => handlePageChange(page)}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.activePage : ""
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>
    );
  };

  const headerCellsCount =
    columns.filter((column) => column.title).length > 0
      ? columns.filter((column) => column.title).length
      : childBody
      ? React.Children.count(childBody.props.children.props.children)
      : 0;

  return (
    <div
      id={tableid}
      className={`${styles.myTableContainer} ${
        searchable && styles.searchable
      } ${totalPages > 0 && styles.myTablePagination}`}
      style={{ height: height }}
    >
      {(searchable && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            // placeholder={t("Ara")}
            placeholder={t ? t("Listede Ara") : "Search"}
            value={searchTerm}
            className={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CountBlock
            count={
              (curTotalCount && curTotalCount) ||
              (childBody && childBody.props.children.length) ||
              0
            }
            t={t}
          />
        </div>
      )) ||
        (showCount && (
          <CountBlock
            count={
              (curTotalCount && curTotalCount) ||
              (childBody && childBody.props.children.length) ||
              0
            }
          />
        ))}

      <div className={styles.myTable}>
        <table className={styles.table}>
          {columns.filter((column) => column.title).length > 0 ? (
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                {columns
                  .filter((column) => column.title)
                  .map(renderColumnHeader)}
              </tr>
            </thead>
          ) : (
            childHeader
          )}

          <tbody>
            {(onSearchText &&
              childBody &&
              childBody.props.children.length > 0 &&
              childBody.props.children) ||
              (filteredRows && filteredRows.length > 0 && filteredRows) ||
              (displayData.length > 0 &&
                displayData.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`
                    ${styles.tr}
                    ${onRowClick ? styles.clickable : ""}
                    ${selectedRow === item ? styles.selected : ""}
                  `}
                  >
                    {columns
                      .filter((column) => column.title)
                      .map((column) => renderCell(item, column, index))}
                    {children && (
                      <td>
                        {typeof children === "function"
                          ? children(item)
                          : children}
                      </td>
                    )}
                  </tr>
                ))) || (
                <tr className={styles.noData + " " + styles.tr}>
                  <td colSpan={headerCellsCount} className={styles.td}>
                    {(searchTerm != "" && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${
                            t
                              ? t(
                                  "Aradığınız kriterlere uygun kayıt bulunamadı!"
                                )
                              : "No records found for the criteria you searched for!"
                          }<br/><b>(${searchTerm})</b>`,
                        }}
                      ></span>
                    )) ||
                      curEmptyText}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      {totalPages > 0 && renderPagination()}
    </div>
  );
}

export default MyTable;
