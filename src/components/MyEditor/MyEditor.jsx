import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import Quill from "quill";
import QuillTable from "quill-table";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./MyEditor.scss";

// KaTeX'i global hale getir
window.katex = katex;

// Özel font listesini tanımla
const fonts = [
  { label: "Arial", value: "arial" },
  { label: "Comic Sans MS", value: "comic-sans" },
  { label: "Courier New", value: "courier-new" },
  { label: "Georgia", value: "georgia" },
  { label: "Helvetica", value: "helvetica" },
  { label: "Times New Roman", value: "times-new-roman" },
  { label: "Verdana", value: "verdana" },
  { label: "Trebuchet MS", value: "trebuchet-ms" },
  { label: "Garamond", value: "garamond" },
  { label: "Palatino Linotype", value: "palatino-linotype" },
  { label: "Consolas", value: "consolas" },
  { label: "Lucida Console", value: "lucida-console" },
  { label: "Impact", value: "impact" },
  { label: "Brush Script MT", value: "brush-script-mt" },
  { label: "Tahoma", value: "tahoma" },
  { label: "Gill Sans", value: "gill-sans" },
  { label: "Franklin Gothic Medium", value: "franklin-gothic-medium" },
  { label: "Century Gothic", value: "century-gothic" },
  { label: "Bookman Old Style", value: "bookman-old-style" },
  { label: "Candara", value: "candara" },
  { label: "Didot", value: "didot" },
  { label: "Futura", value: "futura" },
  { label: "Rockwell", value: "rockwell" },
  { label: "Baskerville", value: "baskerville" },
  { label: "Bodoni MT", value: "bodoni-mt" },
  { label: "Copperplate", value: "copperplate" },
  { label: "Perpetua", value: "perpetua" },
  { label: "Monaco", value: "monaco" },
  { label: "Century Schoolbook", value: "century-schoolbook" },
  { label: "Segoe UI", value: "segoe-ui" }
];

// Quill font formatını genişlet
const Font = Quill.import("formats/font");
Font.whitelist = fonts.map(f => f.value);
Quill.register(Font, true);

// Quill modüllerini kaydet
Quill.register("modules/imageResize", ImageResize);
Quill.register(QuillTable.TableCell);
Quill.register(QuillTable.TableRow);
Quill.register(QuillTable.Table);
Quill.register(QuillTable.Contain);
Quill.register("modules/table", QuillTable.TableModule);

// Formula Embed için düzeltme
const Embed = Quill.import("blots/embed");

class FormulaEmbed extends Embed {
  static create(value) {
    let node = super.create();
    if (value) {
      node.setAttribute("data-value", value);
      try {
        window.katex.render(value, node, { throwOnError: false });
      } catch (err) {
        console.error("KaTeX render error:", err);
      }
    }
    return node;
  }

  static value(node) {
    return node.getAttribute("data-value");
  }
}

FormulaEmbed.blotName = "formula";
FormulaEmbed.tagName = "SPAN";
FormulaEmbed.className = "ql-formula";
Quill.register("formats/formula", FormulaEmbed);

function MyEditor({ value, onChange, style = { height: "300px" } }) {
  const [editorValue, setEditorValue] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef(null);
  const timeoutRef = useRef(null);
  const isFirstRender = useRef(true);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Custom buton tanımı
  useEffect(() => {
    const icons = Quill.import('ui/icons');
    icons['fullscreen'] = `<svg viewbox="0 0 18 18">
      <path d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M6,14H0v2h4v4h2V14z M14,18h2v-4h4v-2h-6V18z"/>
    </svg>`;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setEditorValue(value || "");
    } else if (value !== editorValue) {
      const editor = editorRef.current?.getEditor();
      if (editor) {
        editor.setContents(editor.clipboard.convert(value || ""));
      }
    }
  }, [value]);

  const handleChange = (content, delta, source, editor) => {
    const html = editor.getHTML();
    setEditorValue(html);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (onChange) onChange({ value: html });
    }, 500);
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "table",
    "table-cell",
    "table-row",
    "table-header",
    "table-body",
    "formula"
  ];

  const maxRows = 10;
  const maxCols = 5;
  const tableOptions = [];
  for (let r = 1; r <= maxRows; r++) {
    for (let c = 1; c <= maxCols; c++) {
      tableOptions.push("newtable_" + r + "_" + c);
    }
  }

  const modules = {
    toolbar: {
      container: [
        [{ font: fonts.map(f => f.value) }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", "normal", "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["image"],
        // [{ table: tableOptions }, { table: "append-row" }, { table: "append-col" }],
        // ["formula"]
      ]
    },
    table: {
      operationMenu: true,
      resizable: true,
      tableCellMinWidth: 50,
      tableHeaderRows: 1
    },
    clipboard: {
      matchVisual: false
    },
    imageResize: {
      modules: ["Resize", "DisplaySize"],
      displaySize: true,
      handleStyles: {
        backgroundColor: '#000',
        border: 'none',
        color: '#fff'
      }
    }
  };

  // Font adlarını gerçek isimleriyle göstermek için toolbar'ı güncelle
  const fontPicker = document.querySelector(".ql-font");
  if (fontPicker) {
    const items = fontPicker.querySelectorAll(".ql-picker-item");
    items.forEach((item, index) => {
      if (fonts[index]) {
        item.innerText = fonts[index].label; // Gerçek font adını göster
      }
    });

    const pickerLabel = fontPicker.querySelector(".ql-picker-label");
    if (pickerLabel) {
      pickerLabel.innerText = fonts[0].label; // Varsayılan font ismi
    }
  }

  return (
    <div className={'myEditorContainer ' + (isFullscreen ? 'fullscreen' : '')}>
      <div className="myEditorContainerContent">
        <button
          onClick={handleFullscreen}
          className="myEditorContainerFullscreenButton"
          title={isFullscreen ? "Minimize" : "Maximize"}
        >
          {isFullscreen ? (
            <svg viewBox="0 0 18 18" width="18" height="18">
              <path d="M4,4h2v6H0V8h4V4z M14,4v4h4v2h-6V4H14z M6,14H4v-4H0v-2h6V14z M14,14h-2v-6h6v2h-4V14z" />
            </svg>
          ) : (
            <svg viewBox="0 0 18 18" width="18" height="18">
              <path d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M6,14H0v2h4v4h2V14z M14,18h2v-4h4v-2h-6V18z" />
            </svg>
          )}
        </button>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={editorValue}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={style}
          preserveWhitespace={true}
        />
      </div>
    </div>
  );
}

export default MyEditor;