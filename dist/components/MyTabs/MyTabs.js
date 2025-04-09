import React, { useEffect, useState } from 'react';
import "./MyTabs.css";
function MyTabs({
  children,
  className = null,
  style = null,
  onChange = null,
  activePaneIndex = -1,
  activePaneName = null
}) {
  const [activei, setActivei] = useState(activePaneIndex > -1 ? activePaneIndex : 0);
  const arrChild = React.Children.toArray(children);
  useEffect(() => {
    if (onChange) {
      onChange({
        index: activei,
        name: arrChild[activei].props.name,
        label: arrChild[activei].props.label && arrChild[activei].props.label || arrChild[activei].props.title
      });
    }
  }, [activei]);
  useEffect(() => {
    if (activePaneName) {
      const index = arrChild.findIndex(item => item.props.name === activePaneName);
      if (index > -1) {
        setActivei(index);
      }
    }
  }, [activePaneName]);
  return /*#__PURE__*/React.createElement("div", {
    className: "my-TabsContainer " + (className ? className : ''),
    style: style
  }, /*#__PURE__*/React.createElement("ul", {
    className: "my-TabsTabList"
  }, arrChild.map((item, i) => {
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      className: (i == activei && 'active') + ' ' + (item.props.tabClassName ? item.props.tabClassName : ''),
      style: item.props.tabStyle,
      onClick: () => setActivei(i),
      title: item.props.title
    }, item.props.icon != undefined && /*#__PURE__*/React.createElement("div", {
      className: "icon"
    }, item.props.icon), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col gap-0 text-start"
    }, item.props.label != undefined ? /*#__PURE__*/React.createElement("span", {
      className: "title"
    }, item.props.label) : /*#__PURE__*/React.createElement("span", {
      className: "title"
    }, item.props.title), item.props.description != undefined && /*#__PURE__*/React.createElement("div", {
      className: "description"
    }, item.props.description)), item.props.badge != undefined && /*#__PURE__*/React.createElement("div", {
      className: "badge"
    }, item.props.badge));
  })), /*#__PURE__*/React.createElement("div", {
    className: "my-TabsTabBody"
  }, arrChild.map((item, i) => {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "my-TabsTabContainer " + (i == activei && 'active') + ' ' + (item.props.className ? item.props.className : ''),
      style: item.props.style,
      onClick: () => setActivei(i)
    }, item.props.children);
  })));
}
export default MyTabs;