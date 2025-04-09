import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./MyMenu.module.css";
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
function MenuItem({
  children = null,
  to = "",
  text = "",
  className = null,
  badge = null,
  icon = null,
  title = "",
  defaultOpen = false,
  defaultRoute = "",
  isShortMenu = false
}) {
  // let selected = window.location.pathname == to || (window.location.pathname == defaultRoute);

  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    setSelected(children ? false : window.location.pathname == to || window.location.pathname == defaultRoute || window.location.pathname.includes(to));
  }, [window.location.pathname]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children && /*#__PURE__*/React.createElement("div", {
    className: styles.menuItemOwner
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.menuItem + " " + (className != null ? className : "") + " " + (selected ? styles.selected : '') + " " + (open ? styles.menuItemOpen : '') + " " + (isShortMenu ? styles.menuItemShortMenu : ''),
    title: title == "" ? text : title,
    onClick: () => setOpen(!open)
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: styles.menuItemIcon
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: styles.menuItemText + " " + (badge != null ? styles.menuItemTextBadge : '')
  }, text, badge != null && typeof badge !== 'object' ? /*#__PURE__*/React.createElement("span", {
    className: styles.menuItemBadge
  }, badge.toString()) : badge), open && /*#__PURE__*/React.createElement(PiCaretUp, {
    className: `font-bold text-2xl ${styles.menuItemIconSubMenu} ${open ? styles.menuItemIconSubMenuOpen : ''}`
  }) || /*#__PURE__*/React.createElement(PiCaretDown, {
    className: `font-bold text-2xl ${styles.menuItemIconSubMenu} ${open ? styles.menuItemIconSubMenuOpen : ''}`
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.menuItemChildren + " " + (open ? styles.menuItemChildrenOpen : '')
  }, children)) || /*#__PURE__*/React.createElement(Link, {
    to: to,
    className: styles.menuItem + " " + (className != null ? className : "") + " " + (selected ? styles.selected : '') + " " + (isShortMenu ? styles.menuItemShortMenu : ''),
    title: title == "" ? text : title
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: styles.menuItemIcon
  }, icon) || /*#__PURE__*/React.createElement(GoDotFill, null), /*#__PURE__*/React.createElement("span", {
    className: styles.menuItemText + " " + (badge != null ? styles.menuItemTextBadge : '')
  }, text, badge != null && typeof badge !== 'object' ? /*#__PURE__*/React.createElement("span", {
    className: styles.menuItemBadge
  }, badge.toString()) : badge)));
}
export default MenuItem;