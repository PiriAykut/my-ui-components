import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./MyMenu.module.css"
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';

function MenuItem({ children = null, to = "", text = "", className = null, badge = null, icon = null, title = "", defaultOpen=false, defaultRoute = "", isShortMenu = false }) {
  // let selected = window.location.pathname == to || (window.location.pathname == defaultRoute);


  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(children ? false : (window.location.pathname == to || (window.location.pathname == defaultRoute || window.location.pathname.includes(to))));
  }, [window.location.pathname]);


  return (
    <>
      {children &&

        <div className={styles.menuItemOwner}>
          <div
            className={
              styles.menuItem + " " +
              (className != null ? className : "") + " " +
              (selected ? styles.selected : '') + " " +
              (open ? styles.menuItemOpen : '') + " " +
              (isShortMenu ? styles.menuItemShortMenu : '')
            } title={title == "" ? text : title}
            onClick={() => setOpen(!open)}
          >
            {icon && <div className={styles.menuItemIcon}>{icon}</div>}
            <span className={styles.menuItemText + " " + (badge != null ? styles.menuItemTextBadge : '')}>
              {text}
              {badge != null && typeof badge !== 'object' ? <span className={styles.menuItemBadge}>{badge.toString()}</span> : badge}
            </span>

            {open &&
              <PiCaretUp className={`font-bold text-2xl ${styles.menuItemIconSubMenu} ${open ? styles.menuItemIconSubMenuOpen : ''}`} />
              ||
              <PiCaretDown className={`font-bold text-2xl ${styles.menuItemIconSubMenu} ${open ? styles.menuItemIconSubMenuOpen : ''}`} />}
          </div>

          <div className={styles.menuItemChildren + " " + (open ? styles.menuItemChildrenOpen : '')}>
            {children}
          </div>
        </div> ||
        <Link to={to} className={styles.menuItem + " " + (className != null ? className : "") + " " + (selected ? styles.selected : '') + " " + (isShortMenu ? styles.menuItemShortMenu : '')} title={title == "" ? text : title}>
          {icon && <div className={styles.menuItemIcon}>{icon}</div> || <GoDotFill />}
          <span className={styles.menuItemText + " " + (badge != null ? styles.menuItemTextBadge : '')}>
            {text}
            {badge != null && typeof badge !== 'object' ? <span className={styles.menuItemBadge}>{badge.toString()}</span> : badge}
          </span>
        </Link>
      }
    </>
  )
}

export default MenuItem