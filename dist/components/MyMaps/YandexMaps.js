"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Global olarak ymaps yükleyicisi
let ymapsLoader;
const loadYandexMapsAPI = APIKEY => {
  if (ymapsLoader) {
    return ymapsLoader;
  }
  ymapsLoader = new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolve(window.ymaps);
    } else {
      const script = document.getElementById("yandexmapapi");
      if (!script) {
        const newScript = document.createElement('script');
        newScript.id = "yandexmapapi";
        newScript.src = `https://api-maps.yandex.com/2.1/?apikey=${APIKEY}&lang=tr_TR`;
        newScript.async = true;
        document.head.appendChild(newScript);
        newScript.onload = () => {
          window.ymaps.ready(() => resolve(window.ymaps));
        };
        newScript.onerror = reject;
      } else {
        script.onload = () => {
          window.ymaps.ready(() => resolve(window.ymaps));
        };
      }
    }
  });
  return ymapsLoader;
};
const YandexMap = ({
  className = "",
  value = null,
  address = null,
  addressSearch = false,
  onChange = null,
  onAddress = null,
  style = null,
  APIKEY = null
}) => {
  const [loaded, setLoaded] = (0, _react.useState)(false);
  const [position, setPosition] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [componentKey] = (0, _react.useState)(Date.now() + '' + (Math.floor(Math.random() * (10 - 1)) + 1));
  const markerRef = (0, _react.useRef)(null); // Marker için referans

  const currentLocation = () => {
    if (value) {
      maps_load(parseFloat(value.coords[0]), parseFloat(value.coords[1]), parseInt(value.zoom));
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        maps_load(position.coords.latitude, position.coords.longitude, 12);
      }, error => {
        console.error(error.message);
        maps_load(40.32110315567054, 32.199745873178124, 8);
      });
    } else {
      maps_load(40.32110315567054, 32.199745873178124, 8);
      setError("Geolocation is not supported by this browser.");
    }
  };
  const maps_load = (coorX, coorY, zoom = 10) => {
    document.getElementById("map" + componentKey).innerHTML = "";
    const myMap = new ymaps.Map("map" + componentKey, {
      center: [coorX, coorY],
      zoom: zoom
    });
    createMarker(myMap, [coorX, coorY], zoom);
    myMap.events.add('click', e => {
      const coords = e.get('coords');
      let curzoom = myMap.getZoom();
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
  const createMarker = (myMap, coords, curzoom) => {
    if (markerRef.current) {
      myMap.geoObjects.remove(markerRef.current); // Önceki marker'ı kaldır
    }
    const newMarker = new ymaps.Placemark(coords, {
      balloonContent: `Yeni Koordinatlar: ${coords[0]}, ${coords[1]}`
    });
    myMap.geoObjects.add(newMarker);
    markerRef.current = newMarker;
    // myMap.setCenter(coords, curzoom);
  };
  const getAddress = coords => {
    if (!onAddress) return;
    ymaps.geocode(coords).then(res => {
      const firstGeoObject = res.geoObjects.get(0);
      if (firstGeoObject) {
        const address = firstGeoObject.getAddressLine();
        onAddress(address);
      }
    });
  };
  const getAddressCoor = () => {
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?geocode=${encodeURIComponent(address)}&format=json&apikey=${APIKEY}`;
    fetch(geocodeUrl).then(response => response.json()).then(data => {
      if (data.response.GeoObjectCollection.featureMember.length > 0) {
        const firstResult = data.response.GeoObjectCollection.featureMember[0].GeoObject;
        const pos = firstResult.Point.pos.split(' ');
        maps_load(parseFloat(pos[1]), parseFloat(pos[0]), 17);
      }
    }).catch(err => {
      setError(`Hata: ${err.message}`);
    });
  };
  (0, _react.useEffect)(() => {
    if (addressSearch && !markerRef.current && address && address != "") {
      getAddressCoor();
    }
  }, [addressSearch]);
  (0, _react.useEffect)(() => {
    if (onChange && loaded) {
      onChange(position);
    }
  }, [position]);
  const opened = () => {
    currentLocation();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };
  (0, _react.useEffect)(() => {
    if (loaded && value) {
      maps_load(parseFloat(value.coords[0]), parseFloat(value.coords[1]), parseInt(value.zoom));
    }
  }, [value]);
  (0, _react.useEffect)(() => {
    // if (loaded && value) {
    //   maps_load(parseFloat(value.coords[0]), parseFloat(value.coords[1]), parseInt(value.zoom));
    // }
  }, [loaded]);
  (0, _react.useEffect)(() => {
    if (!APIKEY) {
      APIKEY = "0d21dc94-68eb-4245-871f-a56081b703b3";
    }
    loadYandexMapsAPI(APIKEY).then(() => {
      opened(); // Harita işlevselliğinizi başlatın
    }).catch(err => console.error("Yandex Maps API yüklenemedi", err));
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: "map" + componentKey,
    className: "w-full h-72 " + className,
    style: style
  });
};
var _default = exports.default = YandexMap;