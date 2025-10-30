import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

// Custom Image Resize Module
class CustomImageResize {
  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
    this.handleResize = this.handleResize.bind(this);
    this.init();
  }

  init() {
    // Resme tek tıklamada handles göster
    this.quill.root.addEventListener('click', (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        e.stopPropagation();
        this.showResizeHandles(e.target);
      }
    });

    // Editör dışına tıklandığında resize handles'ı kaldır
    document.addEventListener('click', (e) => {
      const isInsideEditor = e.target.closest('.ql-editor');
      const isImage = e.target.tagName === 'IMG';
      const isHandle = e.target.classList.contains('resize-handle');

      if (!isInsideEditor && !isHandle) {
        this.hideResizeHandles();
      } else if (isInsideEditor && !isImage && !isHandle) {
        this.hideResizeHandles();
      }
    });
  }

  showResizeHandles(img) {
    this.hideResizeHandles();

    const box = document.createElement('div');
    box.className = 'image-resize-box';
    box.style.cssText = 'position: absolute; border: 2px solid #0066cc; z-index: 100;';

    const rect = img.getBoundingClientRect();
    const editorRect = this.quill.root.getBoundingClientRect();

    box.style.left = (rect.left - editorRect.left + this.quill.root.scrollLeft) + 'px';
    box.style.top = (rect.top - editorRect.top + this.quill.root.scrollTop) + 'px';
    box.style.width = rect.width + 'px';
    box.style.height = rect.height + 'px';

    // Resize handles
    const positions = ['nw', 'ne', 'sw', 'se'];
    positions.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `resize-handle resize-handle-${pos}`;
      handle.style.cssText = 'position: absolute; width: 12px; height: 12px; background: #0066cc; border: 2px solid white; cursor: ' + pos + '-resize;';

      if (pos === 'nw') { handle.style.top = '-6px'; handle.style.left = '-6px'; }
      if (pos === 'ne') { handle.style.top = '-6px'; handle.style.right = '-6px'; }
      if (pos === 'sw') { handle.style.bottom = '-6px'; handle.style.left = '-6px'; }
      if (pos === 'se') { handle.style.bottom = '-6px'; handle.style.right = '-6px'; }

      handle.addEventListener('mousedown', (e) => this.startResize(e, img, pos));
      box.appendChild(handle);
    });

    this.quill.root.style.position = 'relative';
    this.quill.root.appendChild(box);
    this.currentBox = box;
    this.currentImg = img;
  }

  startResize(e, img, position) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = img.width;
    const startHeight = img.height;
    const aspectRatio = startWidth / startHeight;

    const doResize = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (position === 'se') {
        newWidth = startWidth + deltaX;
      } else if (position === 'sw') {
        newWidth = startWidth - deltaX;
      } else if (position === 'ne') {
        newWidth = startWidth + deltaX;
      } else if (position === 'nw') {
        newWidth = startWidth - deltaX;
      }

      newHeight = newWidth / aspectRatio;

      if (newWidth > 50) {
        img.width = newWidth;
        img.height = newHeight;
        this.updateBoxSize(img);
      }
    };

    const stopResize = () => {
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  }

  updateBoxSize(img) {
    if (this.currentBox) {
      const rect = img.getBoundingClientRect();
      const editorRect = this.quill.root.getBoundingClientRect();
      this.currentBox.style.left = (rect.left - editorRect.left + this.quill.root.scrollLeft) + 'px';
      this.currentBox.style.top = (rect.top - editorRect.top + this.quill.root.scrollTop) + 'px';
      this.currentBox.style.width = rect.width + 'px';
      this.currentBox.style.height = rect.height + 'px';
    }
  }

  hideResizeHandles() {
    const boxes = this.quill.root.querySelectorAll('.image-resize-box');
    boxes.forEach(box => box.remove());
    this.currentBox = null;
    this.currentImg = null;
  }
}

// Custom Image Resize modülünü kaydet
try {
  Quill.register("modules/imageResize", CustomImageResize, true);
} catch (error) {
  console.log('CustomImageResize registration skipped:', error.message);
}

try {
  // Table modüllerini kaydet
  Quill.register({
    'modules/table': QuillTable.TableModule,
    'formats/table': QuillTable.Table,
    'formats/table-cell': QuillTable.TableCell,
    'formats/table-row': QuillTable.TableRow,
    'formats/table-container': QuillTable.Contain
  }, true);
} catch (error) {
  // Zaten kayıtlı, sorun yok
}

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
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageAlignment, setImageAlignment] = useState('none');

  const editorRef = useRef(null);
  const timeoutRef = useRef(null);
  const isFirstRender = useRef(true);
  const selectedImageRef = useRef(null);
  const imageDataRef = useRef({ width: 0, height: 0 });

  // Manuel double-click için
  const lastClickTimeRef = useRef(0);
  const lastClickedImageRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const imageWidthInputRef = useRef(null);
  const imageHeightInputRef = useRef(null);

  // findDOMNode uyarılarını bastır
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('findDOMNode') || args[0].includes('DOMNodeInserted'))
      ) {
        return;
      }
      originalError.call(console, ...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Custom buton tanımı - React 19 uyumlu
  useEffect(() => {
    try {
      const icons = Quill.import('ui/icons');
      icons['fullscreen'] = `<svg viewbox="0 0 18 18">
        <path d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M6,14H0v2h4v4h2V14z M14,18h2v-4h4v-2h-6V18z"/>
      </svg>`;
    } catch (error) {
      console.warn('Icon registration failed:', error);
    }
  }, []);


  // Resize handles göster/gizle fonksiyonları
  const showResizeHandlesCallback = useCallback((img, editor) => {
    showResizeHandles(img, editor);
  }, []);

  const hideResizeHandlesCallback = useCallback(() => {
    hideResizeHandles();
  }, []);

  // Resimlere tıklama event'i ekle (Manuel double-click)
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      if (editor && editor.root) {
        // Manuel double-click mantığı (timeout ile)
        const handleImageClick = (e) => {
          if (e.target.tagName === 'IMG') {
            e.stopPropagation();

            const now = Date.now();
            const timeSinceLastClick = now - lastClickTimeRef.current;
            const isSameImage = lastClickedImageRef.current === e.target;

            // Double-click algıla (400ms içinde aynı resme tıklandıysa)
            if (timeSinceLastClick < 400 && timeSinceLastClick > 0 && isSameImage) {

              // Pending timeout'u iptal et
              if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
                clickTimeoutRef.current = null;
              }

              // Modal aç
              hideResizeHandles();

              const img = e.target;

              // Resmin GERÇEK güncel boyutlarını al
              const computedStyle = window.getComputedStyle(img);
              let currentWidth = parseInt(computedStyle.width);
              let currentHeight = parseInt(computedStyle.height);

              // Eğer computedStyle'dan alamadıysak
              if (!currentWidth || isNaN(currentWidth)) {
                currentWidth = img.clientWidth || img.width || img.naturalWidth;
              }
              if (!currentHeight || isNaN(currentHeight)) {
                currentHeight = img.clientHeight || img.height || img.naturalHeight;
              }

              // Mevcut hizalamayı tespit et
              const currentStyle = img.style.cssText;
              let alignment = 'none';
              if (currentStyle.includes('float: left')) {
                alignment = 'left';
              } else if (currentStyle.includes('float: right')) {
                alignment = 'right';
              } else if (currentStyle.includes('display: block') && currentStyle.includes('margin') && currentStyle.includes('auto')) {
                alignment = 'center';
              }

              // Ref'e kaydet
              selectedImageRef.current = img;
              imageDataRef.current = { width: currentWidth, height: currentHeight };

              // State'e de kaydet
              setImageWidth(currentWidth);
              setImageHeight(currentHeight);
              setImageAlignment(alignment);
              setShowImageModal(true);

              // Reset
              lastClickTimeRef.current = 0;
              lastClickedImageRef.current = null;
            } else {
              // Single click olabilir - bekle

              // Önceki timeout'u iptal et
              if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
              }

              const clickedImage = e.target;

              // 250ms bekle, eğer ikinci tıklama gelmezse resize handles göster
              clickTimeoutRef.current = setTimeout(() => {
                showResizeHandlesCallback(clickedImage, editor);
                clickTimeoutRef.current = null;
              }, 250);

              // Zamanı ve resmi kaydet
              lastClickTimeRef.current = now;
              lastClickedImageRef.current = e.target;
            }
          } else if (!e.target.classList.contains('resize-handle')) {
            hideResizeHandlesCallback();
            lastClickTimeRef.current = 0;
            lastClickedImageRef.current = null;
            if (clickTimeoutRef.current) {
              clearTimeout(clickTimeoutRef.current);
              clickTimeoutRef.current = null;
            }
          }
        };

        // Editör dışına tıklama - Handles gizle
        const handleOutsideClick = (e) => {
          if (!e.target.closest('.ql-editor') && !e.target.classList.contains('resize-handle')) {
            hideResizeHandlesCallback();
            lastClickTimeRef.current = 0;
            lastClickedImageRef.current = null;
          }
        };

        editor.root.addEventListener('click', handleImageClick);
        document.addEventListener('click', handleOutsideClick);

        return () => {
          editor.root.removeEventListener('click', handleImageClick);
          document.removeEventListener('click', handleOutsideClick);
        };
      }
    }
  }, [showResizeHandlesCallback, hideResizeHandlesCallback]);

  // Resize handles göster
  const showResizeHandles = (img, editor) => {
    hideResizeHandles();

    // Resme data attribute ekle (Quill'i tetiklemeyen yöntem)
    img.setAttribute('data-selected', 'true');
    img.style.outline = '2px solid #0066cc';
    img.style.outlineOffset = '2px';
    img.style.boxShadow = '0 0 0 4px rgba(0, 102, 204, 0.1)';

    const wrapper = document.createElement('div');
    wrapper.className = 'image-resize-wrapper';
    wrapper.style.cssText = 'position: fixed; z-index: 10000;';

    const rect = img.getBoundingClientRect();

    wrapper.style.left = rect.left + 'px';
    wrapper.style.top = rect.top + 'px';
    wrapper.style.width = rect.width + 'px';
    wrapper.style.height = rect.height + 'px';

    // 8 handle ekle: 4 köşe (orantılı) + 4 kenar (serbest)
    const positions = [
      // Köşeler (orantılı resize)
      { name: 'nw', cursor: 'nw-resize', top: '-8px', left: '-8px', type: 'corner' },
      { name: 'ne', cursor: 'ne-resize', top: '-8px', right: '-8px', type: 'corner' },
      { name: 'sw', cursor: 'sw-resize', bottom: '-8px', left: '-8px', type: 'corner' },
      { name: 'se', cursor: 'se-resize', bottom: '-8px', right: '-8px', type: 'corner' },
      // Kenarlar (serbest resize)
      { name: 'n', cursor: 'n-resize', top: '-8px', left: '50%', type: 'edge' },
      { name: 's', cursor: 's-resize', bottom: '-8px', left: '50%', type: 'edge' },
      { name: 'w', cursor: 'w-resize', top: '50%', left: '-8px', type: 'edge' },
      { name: 'e', cursor: 'e-resize', top: '50%', right: '-8px', type: 'edge' }
    ];

    positions.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `resize-handle resize-handle-${pos.name}`;

      // Köşeler yuvarlak, kenarlar kare
      const borderRadius = pos.type === 'corner' ? '50%' : '4px';

      handle.style.cssText = `position: absolute; width: 16px; height: 16px; background: #ffffff;
        border: 3px solid #0066cc; cursor: ${pos.cursor}; border-radius: ${borderRadius};
        box-shadow: 0 2px 6px rgba(0,0,0,0.3); z-index: 10001;`;

      Object.assign(handle.style, {
        top: pos.top || 'auto',
        bottom: pos.bottom || 'auto',
        left: pos.left || 'auto',
        right: pos.right || 'auto'
      });

      // Kenarlar için margin-left ekle (ortalamak için)
      if (pos.left === '50%' || pos.right === '50%') {
        handle.style.marginLeft = '-8px';
      }
      // Kenarlar için margin-top ekle (ortalamak için)
      if (pos.top === '50%' || pos.bottom === '50%') {
        handle.style.marginTop = '-8px';
      }

      // Hover effect
      handle.addEventListener('mouseenter', () => {
        handle.style.transform = 'scale(1.2)';
        handle.style.background = '#0066cc';
        handle.style.borderColor = '#ffffff';
      });
      handle.addEventListener('mouseleave', () => {
        handle.style.transform = 'scale(1)';
        handle.style.background = '#ffffff';
        handle.style.borderColor = '#0066cc';
      });

      handle.addEventListener('mousedown', (e) => startResize(e, img, pos.name, wrapper, editor, pos.type));
      wrapper.appendChild(handle);
    });

    // Wrapper'ı body'ye ekle (editor'a değil)
    document.body.appendChild(wrapper);

    // Scroll ve resize eventleri için wrapper pozisyonunu güncelle
    const updateWrapperPosition = () => {
      const newRect = img.getBoundingClientRect();
      wrapper.style.left = newRect.left + 'px';
      wrapper.style.top = newRect.top + 'px';
      wrapper.style.width = newRect.width + 'px';
      wrapper.style.height = newRect.height + 'px';
    };

    editor.root.addEventListener('scroll', updateWrapperPosition);
    window.addEventListener('scroll', updateWrapperPosition);
    window.addEventListener('resize', updateWrapperPosition);

    wrapper.setAttribute('data-update-fn', 'true');
  };

  // Resize başlat
  const startResize = (e, img, position, wrapper, editor, type) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = img.width || img.naturalWidth;
    const startHeight = img.height || img.naturalHeight;
    const aspectRatio = startWidth / startHeight;

    let currentWidth = startWidth;
    let currentHeight = startHeight;

    const doResize = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (type === 'corner') {
        // Köşeler: Orantılı resize (aspect ratio korunur)
        if (position === 'se' || position === 'ne') {
          newWidth = startWidth + deltaX;
        } else if (position === 'sw' || position === 'nw') {
          newWidth = startWidth - deltaX;
        }
        newHeight = newWidth / aspectRatio;
      } else {
        // Kenarlar: Serbest resize
        if (position === 'e') {
          newWidth = startWidth + deltaX;
          newHeight = startHeight; // Height sabit
        } else if (position === 'w') {
          newWidth = startWidth - deltaX;
          newHeight = startHeight; // Height sabit
        } else if (position === 's') {
          newWidth = startWidth; // Width sabit
          newHeight = startHeight + deltaY;
        } else if (position === 'n') {
          newWidth = startWidth; // Width sabit
          newHeight = startHeight - deltaY;
        }
      }

      // Minimum boyut kontrolü
      if (newWidth > 50 && newHeight > 50) {
        currentWidth = Math.round(newWidth);
        currentHeight = Math.round(newHeight);

        // Mevcut inline style'ı koru (hizalama ayarları)
        const currentStyle = img.style.cssText;
        const hasFloat = currentStyle.includes('float');

        // Yeni style'ı oluştur (mevcut hizalama ayarlarını koru)
        let newStyle = `width: ${currentWidth}px; height: ${currentHeight}px; max-width: 100%;`;

        if (hasFloat && currentStyle.includes('float: left')) {
          newStyle = `float: left; margin: 0 15px 10px 0; ${newStyle}`;
        } else if (hasFloat && currentStyle.includes('float: right')) {
          newStyle = `float: right; margin: 0 0 10px 15px; ${newStyle}`;
        } else if (currentStyle.includes('display: block') && currentStyle.includes('margin') && currentStyle.includes('auto')) {
          newStyle = `display: block; margin: 10px auto; ${newStyle}`;
        } else if (!hasFloat) {
          newStyle = `display: inline-block; ${newStyle}`;
        }

        // Boyutları uygula (inline style ile)
        img.width = currentWidth;
        img.height = currentHeight;
        img.setAttribute('width', currentWidth.toString());
        img.setAttribute('height', currentHeight.toString());
        img.style.cssText = newStyle;

        // Wrapper'ı güncelle (fixed position)
        const newRect = img.getBoundingClientRect();
        wrapper.style.left = newRect.left + 'px';
        wrapper.style.top = newRect.top + 'px';
        wrapper.style.width = newRect.width + 'px';
        wrapper.style.height = newRect.height + 'px';
      }
    };

    const stopResize = () => {
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);

      // Handles'ı kaldır ama boyutu koru
      hideResizeHandles();
    };

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  };

  // Resize handles gizle
  const hideResizeHandles = () => {
    // Resize wrapper'ları kaldır
    const wrappers = document.querySelectorAll('.image-resize-wrapper');
    wrappers.forEach(wrapper => wrapper.remove());

    // Seçili resmin border'ını kaldır
    const selectedImages = document.querySelectorAll('[data-selected="true"]');
    selectedImages.forEach(img => {
      img.removeAttribute('data-selected');
      img.style.outline = '';
      img.style.outlineOffset = '';
      img.style.boxShadow = '';
    });
  };

  // Resim boyutunu güncelle (Modal'dan)
  const handleImageResize = () => {
    const img = selectedImageRef.current;

    if (!img) {
      return;
    }

    // State'ten güncel değerleri al
    const finalWidth = imageWidth;
    const finalHeight = imageHeight;

    // Mevcut boyutları al
    const currentWidth = img.width || parseInt(img.style.width) || parseInt(img.getAttribute('width'));
    const currentHeight = img.height || parseInt(img.style.height) || parseInt(img.getAttribute('height'));

    // Eğer boyutlar değişmediyse, sadece modal'ı kapat
    if (currentWidth === finalWidth && currentHeight === finalHeight) {
      setShowImageModal(false);
      selectedImageRef.current = null;
      return;
    }

    if (finalWidth <= 0 || finalHeight <= 0) {
      return;
    }

    // Editörü al
    const editor = editorRef.current?.getEditor();

    // Mevcut inline style'ı koru (float, margin vs.)
    const currentStyle = img.style.cssText;
    const hasFloat = currentStyle.includes('float');
    const hasMargin = currentStyle.includes('margin');
    const hasDisplay = currentStyle.includes('display');

    // Yeni style'ı oluştur (mevcut hizalama ayarlarını koru)
    let newStyle = `width: ${finalWidth}px; height: ${finalHeight}px; max-width: 100%;`;

    if (hasFloat && currentStyle.includes('float: left')) {
      newStyle = `float: left; margin: 0 15px 10px 0; ${newStyle}`;
    } else if (hasFloat && currentStyle.includes('float: right')) {
      newStyle = `float: right; margin: 0 0 10px 15px; ${newStyle}`;
    } else if (hasDisplay && currentStyle.includes('display: block')) {
      newStyle = `display: block; margin: 10px auto; ${newStyle}`;
    } else {
      newStyle = `display: inline-block; ${newStyle}`;
    }

    // Boyutları uygula (inline style ile)
    img.width = finalWidth;
    img.height = finalHeight;
    img.setAttribute('width', finalWidth.toString());
    img.setAttribute('height', finalHeight.toString());
    img.style.cssText = newStyle;

    // Modal'ı kapat
    setShowImageModal(false);
    selectedImageRef.current = null;

    // İçeriği güncelle
    if (editor) {
      setTimeout(() => {
        const content = editor.root.innerHTML;
        setEditorValue(content);
        if (onChange) {
          onChange({ value: content });
        }
      }, 50);
    }
  };

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
        ["link", "image"],
        ["formula"],
        [{ table: tableOptions }, { table: "append-row" }, { table: "append-col" }]
      ]
    },
    table: {
      operationMenu: {
        items: {
          insertColumnRight: {
            text: 'Sağa Sütun Ekle'
          },
          insertColumnLeft: {
            text: 'Sola Sütun Ekle'
          },
          insertRowUp: {
            text: 'Yukarı Satır Ekle'
          },
          insertRowDown: {
            text: 'Aşağı Satır Ekle'
          },
          mergeCells: {
            text: 'Hücreleri Birleştir'
          },
          unmergeCells: {
            text: 'Hücreleri Ayır'
          },
          deleteColumn: {
            text: 'Sütunu Sil'
          },
          deleteRow: {
            text: 'Satırı Sil'
          },
          deleteTable: {
            text: 'Tabloyu Sil'
          }
        }
      }
    },
    clipboard: {
      matchVisual: false
    }
  };

  useEffect(() => {
    if (showImageModal && imageWidthInputRef.current) {
      imageWidthInputRef.current.focus();
    }
  }, [showImageModal]);



  // Font adlarını gerçek isimleriyle göstermek için toolbar'ı güncelle - React 19 uyumlu
  useEffect(() => {
    const updateFontPicker = () => {
      try {
        const fontPicker = document.querySelector(".ql-font");
        if (fontPicker) {
          const items = fontPicker.querySelectorAll(".ql-picker-item");
          items.forEach((item, index) => {
            if (fonts[index]) {
              item.textContent = fonts[index].label; // React 19'da textContent kullan
            }
          });

          const pickerLabel = fontPicker.querySelector(".ql-picker-label");
          if (pickerLabel) {
            pickerLabel.textContent = fonts[0].label; // Varsayılan font ismi
          }
        }
      } catch (error) {
        console.warn('Font picker update failed:', error);
      }
    };

    // DOM yüklendikten sonra çalıştır
    const timer = setTimeout(updateFontPicker, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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

      {/* Resim Boyutlandırma Modal'ı */}
      {showImageModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Resim Ayarları</h3>

            {/* Hizalama Butonları */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Hizalama:</label>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    const img = selectedImageRef.current;
                    if (img) {
                      img.className = '';
                      img.style.cssText = `float: left; margin: 0 15px 10px 0; max-width: 100%; width: ${img.width}px; height: ${img.height}px;`;
                      setImageAlignment('left');
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: imageAlignment === 'left' ? '#e3f2fd' : '#f8f9fa',
                    border: imageAlignment === 'left' ? '3px solid #0066cc' : '2px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    minWidth: '70px',
                    transition: 'all 0.2s'
                  }}
                  title="Sola Hizala"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="6" width="10" height="12" fill="#0066cc" opacity="0.3"/>
                    <line x1="16" y1="8" x2="20" y2="8" stroke="#333" strokeWidth="2"/>
                    <line x1="16" y1="12" x2="20" y2="12" stroke="#333" strokeWidth="2"/>
                    <line x1="16" y1="16" x2="20" y2="16" stroke="#333" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: imageAlignment === 'left' ? 'bold' : 'normal', color: '#333' }}>Sol</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const img = selectedImageRef.current;
                    if (img) {
                      img.className = '';
                      img.style.cssText = `display: block; margin: 10px auto; max-width: 100%; width: ${img.width}px; height: ${img.height}px;`;
                      setImageAlignment('center');
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: imageAlignment === 'center' ? '#e3f2fd' : '#f8f9fa',
                    border: imageAlignment === 'center' ? '3px solid #0066cc' : '2px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    minWidth: '70px',
                    transition: 'all 0.2s'
                  }}
                  title="Ortala"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="7" y="6" width="10" height="12" fill="#0066cc" opacity="0.3"/>
                    <line x1="4" y1="12" x2="6" y2="12" stroke="#333" strokeWidth="2"/>
                    <line x1="18" y1="12" x2="20" y2="12" stroke="#333" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: imageAlignment === 'center' ? 'bold' : 'normal', color: '#333' }}>Orta</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const img = selectedImageRef.current;
                    if (img) {
                      img.className = '';
                      img.style.cssText = `float: right; margin: 0 0 10px 15px; max-width: 100%; width: ${img.width}px; height: ${img.height}px;`;
                      setImageAlignment('right');
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: imageAlignment === 'right' ? '#e3f2fd' : '#f8f9fa',
                    border: imageAlignment === 'right' ? '3px solid #0066cc' : '2px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    minWidth: '70px',
                    transition: 'all 0.2s'
                  }}
                  title="Sağa Hizala"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="10" y="6" width="10" height="12" fill="#0066cc" opacity="0.3"/>
                    <line x1="4" y1="8" x2="8" y2="8" stroke="#333" strokeWidth="2"/>
                    <line x1="4" y1="12" x2="8" y2="12" stroke="#333" strokeWidth="2"/>
                    <line x1="4" y1="16" x2="8" y2="16" stroke="#333" strokeWidth="2"/>
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: imageAlignment === 'right' ? 'bold' : 'normal', color: '#333' }}>Sağ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const img = selectedImageRef.current;
                    if (img) {
                      img.className = '';
                      img.style.cssText = `display: inline-block; max-width: 100%; width: ${img.width}px; height: ${img.height}px;`;
                      setImageAlignment('none');
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: imageAlignment === 'none' ? '#f0f0f0' : '#f8f9fa',
                    border: imageAlignment === 'none' ? '3px solid #6c757d' : '2px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    minWidth: '70px',
                    transition: 'all 0.2s'
                  }}
                  title="Hizalama Yok"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="7" y="6" width="10" height="12" fill="#6c757d" opacity="0.3"/>
                  </svg>
                  <span style={{ fontSize: '12px', fontWeight: imageAlignment === 'none' ? 'bold' : 'normal', color: '#333' }}>Yok</span>
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Genişlik (px):</label>
                  <input
                    ref={imageWidthInputRef}
                    type="number"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(parseInt(e.target.value) || 0)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        imageHeightInputRef.current?.focus();
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Yükseklik (px):</label>
                  <input
                    type="number"
                    ref={imageHeightInputRef}
                    value={imageHeight}
                    onChange={(e) => setImageHeight(parseInt(e.target.value) || 0)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleImageResize();
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  selectedImageRef.current = null;
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                İptal
              </button>
              <button
                onClick={handleImageResize}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Uygula
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyEditor;