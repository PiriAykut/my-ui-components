import React, { useEffect, useState } from 'react';

function MyTabPane({ children, label = null, title = null, description = null, badge = null, name = null, icon = null, className = null, style = null, tabClassName = null, tabStyle = null }) {
  return <div>
    {children}
  </div>
}

export default MyTabPane;