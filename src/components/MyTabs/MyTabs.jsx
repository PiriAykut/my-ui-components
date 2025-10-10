import React, { useEffect, useState } from 'react';
import "./MyTabs.css";

function MyTabs({ children, className = null, style = null, onChange = null, activePaneIndex = -1, activePaneName = null }) {
  const [activei, setActivei] = useState( 0);

  const arrChild = React.Children.toArray(children);

  useEffect(() => {
    if (onChange) {
      onChange({ index: activei, name: arrChild[activei].props.name, label: arrChild[activei].props.label && arrChild[activei].props.label || arrChild[activei].props.title })
    }
  }, [activei])

    useEffect(() => {
    setActivei(activePaneIndex > -1 ? activePaneIndex : 0);
  }, [activePaneIndex])


  useEffect(() => {
    if (activePaneName) {
      const index = arrChild.findIndex(item => item.props.name === activePaneName);
      if (index > -1) {
        setActivei(index);
      }
    }
  }, [activePaneName])

  return <div className={"my-TabsContainer " + (className ? className : '')} style={style}>
    <ul className="my-TabsTabList">
      {
        arrChild.map((item, i) => {
          return <li
            key={i}
            className={(i == activei && 'active') + ' ' + (item.props.tabClassName ? item.props.tabClassName : '')}
            style={item.props.tabStyle}
            onClick={() => setActivei(i)}
            title={item.props.title}
          >
            {item.props.icon != undefined && <div className="icon">{item.props.icon}</div>}

            <div className="flex flex-col gap-0 text-start">
              {item.props.label != undefined ? <span className="title">{item.props.label}</span> : <span className="title">{item.props.title}</span>}
              {item.props.description != undefined && <div className="description">{item.props.description}</div>}
            </div>

            {item.props.badge != undefined && <div className="badge">{item.props.badge}</div>}
          </li>
        })
      }
    </ul>

    <div className="my-TabsTabBody">
      {
        arrChild.map((item, i) => {
          return <div
            key={i}
            className={"my-TabsTabContainer " + (i == activei && 'active') + ' ' + (item.props.className ? item.props.className : '')}
            style={item.props.style}
            onClick={() => setActivei(i)}
          >{item.props.children}</div>
        })
      }
    </div>

  </div>
}
export default MyTabs;