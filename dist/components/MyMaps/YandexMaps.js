"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Global olarak ymaps yükleyicisi
var ymapsLoader;
var loadYandexMapsAPI = function loadYandexMapsAPI(APIKEY) {
  if (ymapsLoader) {
    return ymapsLoader;
  }
  ymapsLoader = new Promise(function (resolve, reject) {
    if (window.ymaps) {
      resolve(window.ymaps);
    } else {
      var script = document.getElementById("yandexmapapi");
      if (!script) {
        var newScript = document.createElement('script');
        newScript.id = "yandexmapapi";
        newScript.src = "https://api-maps.yandex.com/2.1/?apikey=".concat(APIKEY, "&lang=tr_TR");
        newScript.async = true;
        document.head.appendChild(newScript);
        newScript.onload = function () {
          window.ymaps.ready(function () {
            return resolve(window.ymaps);
          });
        };
        newScript.onerror = reject;
      } else {
        script.onload = function () {
          window.ymaps.ready(function () {
            return resolve(window.ymaps);
          });
        };
      }
    }
  });
  return ymapsLoader;
};
var YandexMap = function YandexMap(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? null : _ref$value,
    _ref$address = _ref.address,
    address = _ref$address === void 0 ? null : _ref$address,
    _ref$addressSearch = _ref.addressSearch,
    addressSearch = _ref$addressSearch === void 0 ? false : _ref$addressSearch,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$onAddress = _ref.onAddress,
    onAddress = _ref$onAddress === void 0 ? null : _ref$onAddress,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? null : _ref$style,
    _ref$APIKEY = _ref.APIKEY,
    APIKEY = _ref$APIKEY === void 0 ? null : _ref$APIKEY;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loaded = _useState2[0],
    setLoaded = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    position = _useState4[0],
    setPosition = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0, _react.useState)(Date.now() + '' + (Math.floor(Math.random() * (10 - 1)) + 1)),
    _useState8 = _slicedToArray(_useState7, 1),
    componentKey = _useState8[0];
  var markerRef = (0, _react.useRef)(null); // Marker için referans

  var currentLocation = function currentLocation() {
    if (value) {
      maps_load(parseFloat(value.coords[0]), parseFloat(value.coords[1]), parseInt(value.zoom));
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        maps_load(position.coords.latitude, position.coords.longitude, 12);
      }, function (error) {
        console.error(error.message);
        maps_load(40.32110315567054, 32.199745873178124, 8);
      });
    } else {
      maps_load(40.32110315567054, 32.199745873178124, 8);
      setError("Geolocation is not supported by this browser.");
    }
  };
  var maps_load = function maps_load(coorX, coorY) {
    var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    document.getElementById("map" + componentKey).innerHTML = "";
    var myMap = new ymaps.Map("map" + componentKey, {
      center: [coorX, coorY],
      zoom: zoom
    });
    createMarker(myMap, [coorX, coorY], zoom);
    myMap.events.add('click', function (e) {
      var coords = e.get('coords');
      var curzoom = myMap.getZoom();
      // if (curzoom < 17) {
      //   curzoom = 17;
      //   myMap.setZoom(curzoom);
      // }

      setPosition({
        coords: coords,
        zoom: curzoom
      });
      getAddress(coords);
      createMarker(myMap, coords, curzoom);
    });
  };
  var createMarker = function createMarker(myMap, coords, curzoom) {
    if (markerRef.current) {
      myMap.geoObjects.remove(markerRef.current); // Önceki marker'ı kaldır
    }
    var newMarker = new ymaps.Placemark(coords, {
      balloonContent: "Yeni Koordinatlar: ".concat(coords[0], ", ").concat(coords[1])
    });
    myMap.geoObjects.add(newMarker);
    markerRef.current = newMarker;
    // myMap.setCenter(coords, curzoom);
  };
  var getAddress = function getAddress(coords) {
    if (!onAddress) return;
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        var _address = firstGeoObject.getAddressLine();
        onAddress(_address);
      }
    });
  };
  var getAddressCoor = function getAddressCoor() {
    var geocodeUrl = "https://geocode-maps.yandex.ru/1.x/?geocode=".concat(encodeURIComponent(address), "&format=json&apikey=").concat(APIKEY);
    fetch(geocodeUrl).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.response.GeoObjectCollection.featureMember.length > 0) {
        var firstResult = data.response.GeoObjectCollection.featureMember[0].GeoObject;
        var pos = firstResult.Point.pos.split(' ');
        maps_load(parseFloat(pos[1]), parseFloat(pos[0]), 17);
      }
    })["catch"](function (err) {
      setError("Hata: ".concat(err.message));
    });
  };
  (0, _react.useEffect)(function () {
    if (addressSearch && !markerRef.current && address && address != "") {
      getAddressCoor();
    }
  }, [addressSearch]);
  (0, _react.useEffect)(function () {
    if (onChange && loaded) {
      onChange(position);
    }
  }, [position]);
  var opened = function opened() {
    currentLocation();
    setTimeout(function () {
      setLoaded(true);
    }, 1000);
  };
  (0, _react.useEffect)(function () {
    if (loaded && value) {
      maps_load(parseFloat(value.coords[0]), parseFloat(value.coords[1]), parseInt(value.zoom));
    }
  }, [value]);
  (0, _react.useEffect)(function () {
    // if (loaded && value) {
    //   maps_load(parseFloat(value.coords[0]), parseFloat(value.coords[1]), parseInt(value.zoom));
    // }
  }, [loaded]);
  (0, _react.useEffect)(function () {
    if (!APIKEY) {
      APIKEY = "0d21dc94-68eb-4245-871f-a56081b703b3";
    }
    loadYandexMapsAPI(APIKEY).then(function () {
      opened(); // Harita işlevselliğinizi başlatın
    })["catch"](function (err) {
      return console.error("Yandex Maps API yüklenemedi", err);
    });
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: "map" + componentKey,
    className: "w-full h-72 " + className,
    style: style
  });
};
var _default = exports["default"] = YandexMap;