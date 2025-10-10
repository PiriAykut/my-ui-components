import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./MyInput.module.css"
import { PiCaretDownBold, PiEye, PiEyeSlash } from "react-icons/pi";

export const MyInputType = Object.freeze({
    TEXT: 'text',
    PASSWORD: 'password',
    SELECT: 'select',
    SELECTFILTER: 'selectfilter',
    FILE: 'file',
    IMAGE: 'image',
    TEXTAREA: 'textarea',
    COLOR: 'color',
    READONLY: 'readonly',
    DATE: 'date',
    DATETIME: 'datetime',
    TIME: 'time',
    MONEY: 'money',
    NUMBER: 'number',
    MAIL: 'mail',
    PHONE: 'phone'
});


export const MyInputIsNumeric = (value) => {
    if (value === null || value === undefined || value === '') return false;
    return !isNaN(value) && !isNaN(parseFloat(value));
}

function MyInput({
    id = null,
    ref = null,
    title = "",
    placeholder = null,
    placeholdersearchtext = "",
    description = null,
    type = MyInputType.TEXT,
    className = null,
    rows = 0,
    icon = null,
    options = null,

    options_key_value = "value",
    options_key_text = "text",
    options_key_subtext = "subtext",

    multiple = false,
    disabled = false,
    value = null,
    decimalCount = 2,
    buttonText = "",
    accept = ".jpg,.jpeg,.png",
    minDate = null,
    maxDate = null,
    style = null,
    maxlength = null,
    dangerouslySetInnerHTML = null,

    uppercase = false,
    lowercase = false,
    firstUppercase = false,

    min = null,
    max = null,

    onChange = null,
    onBlur = null,
    onFocus = null,
    onKeyDown = null,
    onKeyUp = null,
    onKeyPress = null,
    onMouseDown = null,
    onMouseUp = null,
    onMouseEnter = null,
    onMouseLeave = null,
    onRemoveImage = null
}) {

    const myInputId = `key${Date.now() + Math.random().toString(36).substr(2, 9)}`;

    const fileInputRef = useRef(null);

    const [loaded, setLoaded] = useState(false);

    const [myValue, setMyValue] = useState(value);
    const [myEyeView, setMyEyeView] = useState(false);
    const [myFileName, setMyFileName] = useState(null);
    const [myTitleLite, setMyTitleLite] = useState("");

    const [filtertext, setFiltertext] = useState("");

    const [isError, setIsError] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    // MONEY input için display value (formatlanmış hali)
    const [displayValue, setDisplayValue] = useState(null);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const calculateFileSize = (sizeInBytes) => {
        const units = ['B', 'KB', 'MB'];
        let size = sizeInBytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }


    const moneyFormat = (_value) => {
        if (_value == null || _value == undefined || _value == '') return '';

        try {
            let inputValue = _value.toString();

            // Sadece sayılar ve nokta
            inputValue = inputValue.replace(/[^0-9.]/g, '');

            // Birden fazla nokta varsa ilkini koru
            const parts = inputValue.split('.');
            if (parts.length > 2) {
                inputValue = parts[0] + '.' + parts.slice(1).join('');
            }

            // Noktadan sonra maksimum decimal count
            if (parts.length === 2 && parts[1].length > decimalCount) {
                inputValue = parts[0] + '.' + parts[1].substring(0, decimalCount);
            }

            // Binlik ayıracı ekle (sadece tam sayı kısmına)
            const finalParts = inputValue.split('.');
            if (finalParts[0]) {
                finalParts[0] = finalParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

            return finalParts.join('.');
        } catch (error) {
            console.error('Money format error:', error);
            return '';
        }
    }

    const onMyBlur = (e) => {
        setIsError(false);

        if (myValue != null && myValue != "") {
            switch (type) {
                case MyInputType.MAIL:
                    if (!myValue.includes("@") || !myValue.includes(".")) {
                        setIsError(true);
                    }
                    break;
                case MyInputType.PHONE:
                    if (myValue.length < 10 || myValue.length > 15) {
                        setIsError(true);
                    }
                    break;
                default:
                    break;
            }
        }

        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            // Çıkışta decimal kısmını düzenle (sadece görsel)
            let formattedValue = myValue;
            if (formattedValue && formattedValue !== '') {
                const numValue = parseFloat(formattedValue);
                if (!isNaN(numValue)) {
                    formattedValue = numValue.toFixed(decimalCount);
                    // Sadece display value'yu güncelle, myValue'yu değiştirme
                    setDisplayValue(formattedValue);
                }
            }
            const finalFormattedValue = moneyFormat(formattedValue);
            e.target.value = finalFormattedValue;
            e.value = finalFormattedValue;
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onBlur != null) onBlur(e);
    }

    const onMyFocus = (e) => {
        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            // Focus'ta displayValue'yu temizle, orijinal değere dön
            setDisplayValue(null);
            e.target.value = moneyFormat(myValue);
            e.value = moneyFormat(myValue);
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onFocus != null) onFocus(e);
    }

    const onMyKeyDown = (e) => {
        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            e.target.value = moneyFormat(myValue);
            e.value = moneyFormat(myValue);
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onKeyDown != null) onKeyDown(e);
    }

    const onMyKeyUp = (e) => {
        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            e.target.value = moneyFormat(myValue);
            e.value = moneyFormat(myValue);
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onKeyUp != null) onKeyUp(e);
    }

    const onMyKeyPress = (e) => {
        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            e.target.value = moneyFormat(myValue);
            e.value = moneyFormat(myValue);
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onKeyPress != null) onKeyPress(e);
    }

    const onMyMouseDown = (e) => {
        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            e.target.value = moneyFormat(myValue);
            e.value = moneyFormat(myValue);
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onMouseDown != null) onMouseDown(e);
    }

    const onMyMouseUp = (e) => {
        // MONEY input için formatlanmış değeri kullan
        if (type === MyInputType.MONEY) {
            e.target.value = moneyFormat(myValue);
            e.value = moneyFormat(myValue);
        } else {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onMouseUp != null) onMouseUp(e);
    }

    const onMyMouseEnter = (e) => {
        // MONEY input için displayValue'yu koru, sadece diğer tipler için değer ata
        if (type !== MyInputType.MONEY) {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onMouseEnter != null) onMouseEnter(e);
    }

    const onMyMouseLeave = (e) => {
        // MONEY input için displayValue'yu koru, sadece diğer tipler için değer ata
        if (type !== MyInputType.MONEY) {
            e.target.value = myValue;
            e.value = myValue;
        }

        if (onMouseLeave != null) onMouseLeave(e);
    }

    const onRemoveImageClick = (e) => {
        if (onRemoveImage != null) onRemoveImage();
    }

    const handleChange = useCallback((e) => {
        let newValue = e.target.value;

        // Eğer değer değişmediyse güncelleme yapma
        if (newValue === myValue) return;

        if (type === MyInputType.NUMBER && newValue) {
            // Sadece 0-9 arası rakamlara izin ver
            newValue = newValue.replace(/[^0-9]/g, '');

            // min ve max kontrolü
            if (min && newValue < min) newValue = min;
            else if (max && newValue > max) newValue = max;
        }

        if (type === MyInputType.TEXT || type === MyInputType.TEXTAREA) {
            newValue = newValue.trim();
            if (uppercase) newValue = newValue.toLocaleUpperCase("TR");
            else if (lowercase) newValue = newValue.toLocaleLowerCase("TR");
            else if (firstUppercase) newValue = newValue.split(' ').map(word => word.charAt(0).toLocaleUpperCase("TR") + word.slice(1).toLocaleLowerCase("TR")).join(' ');
        }

        // Typing durumunu güncelle
        setIsTyping(true);

        // Önceki timeout'u temizle
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Yeni timeout ayarla
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            if (onChange) {

                onChange({ value: newValue, target: { value: newValue } });
            }
        }, 300); // 300ms gecikme

        // State'i güncelle
        setMyValue(newValue);
    }, [myValue, onChange]);

    // MONEY input için özel change handler
    const handleMoneyChange = useCallback((e) => {
        const input = e.target;
        const cursorPos = input.selectionStart;
        const oldValue = input.value;
        let newValue = e.target.value;

        // Yazarken displayValue'yu temizle
        setDisplayValue(null);

        // Virgülleri kaldır
        newValue = newValue.replace(/,/g, '');

        // Sadece sayılar ve tek nokta
        newValue = newValue.replace(/[^0-9.]/g, '');

        // Birden fazla nokta varsa sadece ilkini koru
        const parts = newValue.split('.');
        if (parts.length > 2) {
            newValue = parts[0] + '.' + parts.slice(1).join('');
        }

        // Noktadan sonra maksimum decimal count
        if (parts.length === 2 && parts[1].length > decimalCount) {
            newValue = parts[0] + '.' + parts[1].substring(0, decimalCount);
        }

        // State'i güncelle
        setMyValue(newValue);

        // Cursor pozisyonunu koru
        setTimeout(() => {
            if (input && input.setSelectionRange) {
                // Yeni formatlanmış değerdeki virgül sayısını hesapla
                const newFormattedValue = moneyFormat(newValue);
                const oldCommaCount = (oldValue.match(/,/g) || []).length;
                const newCommaCount = (newFormattedValue.match(/,/g) || []).length;
                const commaChange = newCommaCount - oldCommaCount;

                let newCursorPos = cursorPos + commaChange;
                newCursorPos = Math.max(0, Math.min(newCursorPos, newFormattedValue.length));

                input.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);

        // Typing durumunu güncelle
        setIsTyping(true);

        // Önceki timeout'u temizle
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Yeni timeout ayarla
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            if (onChange) {
                onChange({ value: newValue, target: { value: newValue } });
            }
        }, 300);
    }, [onChange, decimalCount]);

    const onMyChange = async (e) => {
        if (type === MyInputType.FILE || type === MyInputType.IMAGE) {
            let files = [];
            if (e.target.files.length > 0) {
                let totalSize = 0;
                for (let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    totalSize += parseInt(file.size);
                    files.push({
                        base64: await toBase64(file),
                        filename: file.name,
                        size: file.size,
                        sizeText: calculateFileSize(file.size)
                    });
                }
                totalSize = calculateFileSize(totalSize);
                setMyFileName(`<span>${files.length == 1 ? files[0].filename : files.length + " Dosya Seçildi"}</span>
                    <small>(${totalSize})</small>`);
            } else {
                setMyFileName("");
            }
            setMyValue(files);
            if (onChange) {
                onChange({ value: files, target: { value: files } });
            }
        } else {
            handleChange(e);
        }
    };

    const mySelectFilterListClick = (item) => {
        const selectElement = document.getElementById("mySelectFilterHiddenSelect" + myInputId);
        selectElement.value = item.value;

        setMyValue(item.value);
        setFiltertext("");
    }

    const getMyValueText = () => {
        if (!myValue || myValue == 0) return "";

        if (!MyInputIsNumeric(myValue) || options == null) return myValue;

        let result = options.find((e) => e.value.toString() == myValue.toString());

        if (result) return result.text + (result[options_key_subtext] ? ` - <span style="color: #73889d; font-style: italic; font-weight: 300;">${result[options_key_subtext]}</span>` : '');

        return "";
    }

    const filterSelectEvents = () => {
        const selectElement = document.getElementById("mySelectFilterSelected" + (id ? id : myInputId));
        const selectListElement = document.getElementById("mySelectFilterList" + (id ? id : myInputId));
        const filterInput = document.getElementById("mySelectFilterInput" + (id ? id : myInputId));

        if (!selectElement || !selectListElement || !filterInput) return;

        let isInputFocused = false;

        // Select'e tıklandığında seçim listesini aç
        selectElement.addEventListener('click', function () {
            if (!isInputFocused) {
                filterInput.style.display = 'block';
                selectListElement.style.display = 'block';

                setTimeout(() => {
                    filterInput.focus();
                }, 100); // Gecikme, select listesi açılırken input'a odaklanması için
            }
        });

        // Input odaklandığında flag'i true yap
        filterInput.addEventListener('focus', function () {
            isInputFocused = true;
        });

        // Input odaktan çıktığında ve select'in blur olayında input'u gizle
        filterInput.addEventListener('blur', function () {
            isInputFocused = false;

            setTimeout(() => {
                setFiltertext("");
                filterInput.style.display = 'none';
                selectListElement.style.display = 'none';
            }, 150); // Gecikme ile select kapanmasını sağla
        });
    }

    const getFilterOptions = () => {
        let rv = options.filter(() => true);

        if (filtertext != "") {
            rv = rv.filter((e) => e.text.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()));
        }

        return rv;
    }

    const getFileImageControl = (filename) => {
        if (!filename) return false;

        if (filename.includes(";base64,")) return true;

        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

        return validExtensions.some(ext => filename.toString().toLocaleLowerCase().includes(ext));
    }

    useEffect(() => {
        if (loaded) {
            let vl = value;
            if (value == undefined) vl = null;
            if (vl == null && (type == MyInputType.TEXT || type == MyInputType.MAIL || type == MyInputType.TEXTAREA || type == MyInputType.PASSWORD)) vl = "";
            if (vl != myValue) setMyValue(vl);
            if (vl == null) setMyFileName(null);
        }
    }, [value, loaded, type]);

    useEffect(() => {
        if (!isTyping && value !== myValue) {
            setMyValue(value);
        }
    }, [value, isTyping]);

    useEffect(() => {
        if (title) {
            setMyTitleLite(title.replace(/<\/?[^>]+(>|$)/g, ""));
        }
    }, [title])

    useEffect(() => {
        setLoaded(true);

        if (type == MyInputType.SELECTFILTER)
            filterSelectEvents();


        if (type == MyInputType.DATE) {
            const dateInput = document.getElementById("myDate" + myInputId);
            dateInput.addEventListener('click', () => {
                // Tarih seçiciyi göstermek için odaklanma
                dateInput.showPicker?.(); // Eğer destekliyorsa
            });
        }
        if (type == MyInputType.DATETIME) {
            const dateTimeInput = document.getElementById("myDateTime" + myInputId);
            dateTimeInput.addEventListener('click', () => {
                // Tarih seçiciyi göstermek için odaklanma
                dateTimeInput.showPicker?.(); // Eğer destekliyorsa
            });
        }
        if (type == MyInputType.TIME) {
            const timeInput = document.getElementById("myTime" + myInputId);
            timeInput.addEventListener('click', () => {
                // Saat seçiciyi göstermek için odaklanma
                timeInput.showPicker?.(); // Eğer destekliyorsa
            });
        }
    }, [])

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);


    const renderInput = () => {
        if (disabled || type === MyInputType.READONLY) {
            return (
                <span
                    className={styles.disabledInput}
                    dangerouslySetInnerHTML={dangerouslySetInnerHTML ? dangerouslySetInnerHTML : { __html: getMyValueText() }}
                    style={rows > 0 ? { ...(style ? style : {}), height: rows * 30 + 'px', alignItems: "flex-start" } : style}
                />
            );
        }

        const inputTypes = {
            [MyInputType.TEXT]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type="text"
                        value={myValue || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        autoComplete="off"
                        style={style}
                        maxLength={maxlength}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.MAIL]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type="text"
                        value={myValue?.toLowerCase()}
                        onChange={(e) => onMyChange({ ...e, target: { ...e.target, value: e.target.value.toLowerCase().replace(/\s/g, '') } })}
                        placeholder={placeholder}
                        autoComplete="off"
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.PHONE]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type="text"
                        value={myValue}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9()-]/g, '');

                            onMyChange({ ...e, target: { ...e.target, value } });
                        }}

                        placeholder={placeholder}
                        autoComplete="off"
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.MONEY]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type="text"
                        value={moneyFormat(displayValue || myValue)}
                        onChange={handleMoneyChange}
                        placeholder={placeholder}
                        autoComplete="off"
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.NUMBER]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type="text"
                        value={myValue}
                        onChange={handleChange}
                        placeholder={placeholder}
                        autoComplete="off"
                        min={min}
                        max={max}
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.DATE]: () => (
                <div>
                    <input
                        ref={ref}
                        type="date"
                        id={"myDate" + myInputId}
                        value={myValue || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        min={minDate}
                        max={maxDate}
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.DATETIME]: () => (
                <div>
                    <input
                        ref={ref}
                        type="datetime-local"
                        id={"myDateTime" + myInputId}
                        value={myValue || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        min={minDate}
                        max={maxDate}
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.TIME]: () => (
                <div>
                    <input
                        ref={ref}
                        type="time"
                        id={"myTime" + myInputId}
                        value={myValue || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.PASSWORD]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type={myEyeView ? "text" : "password"}
                        value={myValue}
                        onChange={handleChange}
                        placeholder={placeholder}
                        autoComplete="new-password"
                        style={style}
                        maxLength={maxlength}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                    <button type="button" className={styles.eye} onClick={() => setMyEyeView(!myEyeView)}>
                        {myEyeView ? <PiEyeSlash /> : <PiEye />}
                    </button>
                </div>
            ),

            [MyInputType.COLOR]: () => (
                <div>
                    <input
                        ref={ref}
                        id={id}
                        type="color"
                        value={myValue}
                        onChange={handleChange}
                        placeholder={placeholder}
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                </div>
            ),

            [MyInputType.TEXTAREA]: () => (
                <textarea
                    ref={ref}
                    id={id}
                    onChange={handleChange}
                    rows={rows}
                    placeholder={placeholder}
                    value={myValue}
                    style={style}
                    maxLength={maxlength}
                    onBlur={onMyBlur}
                    onFocus={onMyFocus}
                    onKeyDown={onMyKeyDown}
                    onKeyUp={onMyKeyUp}
                    onKeyPress={onMyKeyPress}
                    onMouseDown={onMyMouseDown}
                    onMouseUp={onMyMouseUp}
                    onMouseEnter={onMyMouseEnter}
                    onMouseLeave={onMyMouseLeave}
                />
            ),

            [MyInputType.SELECT]: () => (
                <div>
                    <select
                        ref={ref}
                        id={id}
                        onChange={handleChange}
                        value={myValue && !isNaN(myValue) ? (MyInputIsNumeric(myValue) ? parseInt(myValue) : myValue) : ""}
                        style={style}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    >
                        {options && options.map((e) => {
                            return <option
                                key={e[options_key_value]}
                                value={MyInputIsNumeric(e[options_key_value]) ? parseInt(e[options_key_value]) : e[options_key_value]}

                                dangerouslySetInnerHTML={{ __html: e[options_key_text] || e["label"] }}
                            >
                            </option>;
                        })}
                    </select>
                    {!myValue && !options && (placeholder || myTitleLite) && <span className={styles.placeholder}>{placeholder ? placeholder : myTitleLite}</span>}
                </div>
            ),

            [MyInputType.SELECTFILTER]: () => (
                <div>
                    <input
                        ref={ref}
                        id={"mySelectFilterInput" + (id ? id : myInputId)}
                        type="text"
                        className={styles.filterInput}
                        style={style}
                        value={filtertext}
                        onChange={(e) => setFiltertext(e.target.value)}
                        placeholder={placeholdersearchtext && placeholdersearchtext != "" ? placeholdersearchtext : (placeholder ? placeholder : myTitleLite) + " Ara"}
                        onBlur={onMyBlur}
                        onFocus={onMyFocus}
                        onKeyDown={onMyKeyDown}
                        onKeyUp={onMyKeyUp}
                        onKeyPress={onMyKeyPress}
                        onMouseDown={onMyMouseDown}
                        onMouseUp={onMyMouseUp}
                        onMouseEnter={onMyMouseEnter}
                        onMouseLeave={onMyMouseLeave}
                    />
                    <div className={styles.filterInputSelectedContainer + " " + (myValue ? styles.filterInputSelectedContainerSelected : '')}>

                        <span
                            id={"mySelectFilterSelected" + (id ? id : myInputId)}
                            className={styles.filterInputSelected}
                            dangerouslySetInnerHTML={{ __html: getMyValueText() }}
                        >
                        </span>
                        {(myValue && <span className={styles.filterInputSelectedX} onClick={() => setMyValue(null)} title="Seçimi Kaldır">x</span>) || ""}
                        <PiCaretDownBold className={styles.caretdown} />
                    </div>

                    {!myValue && (placeholder || myTitleLite) && <span className={styles.placeholder}>{placeholder ? placeholder : myTitleLite}</span>}

                    <ul id={"mySelectFilterList" + (id ? id : myInputId)} className={styles.filterInputList}>
                        {options && getFilterOptions().map((item) => {
                            return <li
                                key={item[options_key_value]}
                                value={MyInputIsNumeric(item[options_key_value]) ? parseInt(item[options_key_value]) : item[options_key_value]}
                                onClick={() => mySelectFilterListClick(item)}
                                className={item[options_key_subtext] ? styles.subtextli : ''}
                            >
                                <span dangerouslySetInnerHTML={{ __html: item[options_key_text] || item["label"] }}></span>
                                {item[options_key_subtext] && <span className={styles.subtext}>{item[options_key_subtext]}</span>}
                            </li>;
                        })}
                    </ul>
                    <div style={{ display: "none" }}>
                        <select
                            id={"mySelectFilterHiddenSelect" + myInputId}
                            onChange={handleChange}
                            value={myValue && !isNaN(myValue) ? (MyInputIsNumeric(myValue) ? parseInt(myValue) : myValue) : ""}
                        >
                            {options && options.map((item) => {
                                return <option
                                    key={item[options_key_value]}
                                    value={MyInputIsNumeric(item[options_key_value]) ? parseInt(item[options_key_value]) : item[options_key_value]}
                                >
                                    {item[options_key_text] || item["label"]}
                                </option>;
                            })}
                        </select>
                    </div>
                </div>
            ),

            [MyInputType.FILE]: () => (
                <div className={styles.fileinput}>
                    {(() => {
                        // Dosya önizleme gösterimi için kontrol
                        if (myValue && (type === MyInputType.IMAGE || accept === '.jpg,.jpeg,.png')) {
                            if (Array.isArray(myValue) && myValue.length === 1 && getFileImageControl(myValue[0].filename)) {
                                return <img src={myValue[0].base64} className={styles.fileImagePreview} alt="Preview" />;
                            } else if (getFileImageControl(myValue)) {
                                return <img src={myValue} className={styles.fileImagePreview} alt="Preview" />;
                            }
                        }
                        return null;
                    })()}

                    <div
                        className={styles.filename + " " + (myFileName && styles.selected)}
                        dangerouslySetInnerHTML={{
                            __html: myFileName || (placeholder ? placeholder : type === MyInputType.IMAGE ? "Görsel Seçiniz" : "Dosya Seçiniz")
                        }}
                    />

                    {(() => {
                        if (onRemoveImage && myValue && type === MyInputType.IMAGE &&
                            (
                                (Array.isArray(myValue) && myValue.length === 1 && getFileImageControl(myValue[0].filename)) ||
                                (getFileImageControl(myValue) && !(myValue.includes("nologo") || myValue.includes("noimage")))
                            )
                        ) {
                            return <button type="button" onClick={onRemoveImageClick} className={styles.filebuttonremove} title="Kaldır">x</button>;
                        }
                        return null;
                    })()}

                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className={styles.filebutton}
                    >
                        {type === MyInputType.IMAGE ? "Görsel Seç" : "Dosya Seç"}
                    </button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => onMyChange(e)}
                        placeholder={placeholder}
                        style={{ display: "none" }}
                        {... (multiple ? { multiple: true } : {})}
                        accept={type === MyInputType.IMAGE ? '.jpg,.jpeg,.png' : accept}
                    />
                </div>
            ),

            [MyInputType.IMAGE]: function () {
                return this[MyInputType.FILE]();
            },
        };

        return inputTypes[type]?.() || null;
    };

    return (
        <div id={"myinput" + myInputId}
            className={styles.container + " " + (className != null ? className : '') + " " + (isError ? styles.error : '')}
            title={title && myTitleLite || (placeholder && placeholder)}
            style={style && style.width && { display: 'inline-block' } || { width: '100%' }}>
            {title && <small dangerouslySetInnerHTML={{ __html: title }}></small>}

            <div className={styles.inputblock + " " + (disabled || type === MyInputType.READONLY ? styles.inputblockdisabled : '') + " " + (icon || type === MyInputType.IMAGE ? styles.inputblockicon : '')}
                style={style &&
                    (
                        {
                            ...(style.backgroundColor && { backgroundColor: style.backgroundColor })
                        }
                    )
                }>
                {icon && (
                    <div className={`${styles.icon} ${type === MyInputType.TEXTAREA || rows > 0 ? styles.icontextarea : ''}`}>
                        {icon}
                    </div>
                )}

                {renderInput()}
            </div>

            {description && <small className={styles.description}>{description}</small>}

        </div>
    )
}
export default MyInput