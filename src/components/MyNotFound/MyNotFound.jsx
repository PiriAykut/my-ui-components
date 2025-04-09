import React from 'react';
import './MyNotFound.css'; // Modal için CSS dosyası

export default function MyNotFound({ message = "Kayıt Mevcut Değil!", className = null, style = null, icon = null }) {
  return (
    <div className={"my-nodata " + (className ? className : '')} style={style}>
      {icon && <div className="icon">{icon}</div>}
      <span dangerouslySetInnerHTML={{ __html: message }}></span>
    </div>
  )
}