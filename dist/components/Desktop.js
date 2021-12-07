"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcSlider = _interopRequireWildcard(require("rc-slider"));

require("rc-slider/assets/index.css");

var _ri = require("react-icons/ri");

var _knossysUiCore = require("@knossys/knossys-ui-core");

var _DataTools = _interopRequireDefault(require("./utils/DataTools"));

var _cookiestorage = _interopRequireDefault(require("./utils/cookiestorage"));

var _DesktopIcon = _interopRequireDefault(require("./DesktopIcon"));

var _WindowTools = _interopRequireDefault(require("./utils/WindowTools"));

require("./css/desktop.css");

var _app = _interopRequireDefault(require("./css/images/app.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var marginX = 4;
var marginY = 4;
var paddingX = 12;
var paddingY = 12;
var iconDim = 32;
/**
 *
 */

var Desktop = /*#__PURE__*/function (_Component) {
  _inherits(Desktop, _Component);

  var _super = _createSuper(Desktop);

  /**
   * @param {any} props
   */
  function Desktop(props) {
    var _this;

    _classCallCheck(this, Desktop);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onIconSizeChange", function (value) {
      _this.setState({
        iconDim: value
      }, function (e) {
        if (_this.state.autoLayout == true) {
          _this.onLayout(null);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAutolayoutChange", function (event, layout) {
      console.log("onAutolayoutChange ()");

      _this.setState({
        autoLayout: true,
        layout: layout
      }, function (e) {
        _this.onLayout(null);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSnapChange", function (event) {
      console.log("onSnapChange ()");

      _this.setState({
        snap: event.target.checked
      });
    });

    _this.dataTools = new _DataTools["default"]();
    _this.windowTools = new _WindowTools["default"]();
    _this.cookieStorage = new _cookiestorage["default"]();
    var snapIcons = false;

    if (props.snap) {
      snapIcons = props.snap;
    }

    var prepped = _this.prep(_this.props.icons);

    _this.state = {
      iconDim: iconDim,
      autoLayout: true,
      layout: Desktop.LAYOUT_HORIZONTAL,
      snap: false,
      snapIcons: snapIcons,
      showGrid: false,
      mouseDown: false,
      mouseXOld: 0,
      mouseYOld: 0,
      mouseX: 0,
      mouseY: 0,
      icons: prepped
    }; //this.loadSettings ();

    _this.saveState = _this.saveState.bind(_assertThisInitialized(_this));
    _this.onLayout = _this.onLayout.bind(_assertThisInitialized(_this));
    _this.onDesktopIconClick = _this.onDesktopIconClick.bind(_assertThisInitialized(_this));
    _this.onMouseDownIcon = _this.onMouseDownIcon.bind(_assertThisInitialized(_this));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onIconSizeChange = _this.onIconSizeChange.bind(_assertThisInitialized(_this));
    _this.onAutolayoutChange = _this.onAutolayoutChange.bind(_assertThisInitialized(_this));
    _this.onShowGrid = _this.onShowGrid.bind(_assertThisInitialized(_this));
    document.addEventListener('mousedown', _this.onMouseDown);
    document.addEventListener('mousemove', _this.onMouseMove);
    document.addEventListener('mouseup', _this.onMouseUp);
    return _this;
  }
  /**
   * 
   */


  _createClass(Desktop, [{
    key: "loadSettings",
    value: function loadSettings() {
      if (this.cookieStorage.getCookie("marginX") == "") {
        this.cookieStorage.setCookie("marginX", marginX, 10);
      } else {
        marginX = this.cookieStorage.getCookie("marginX");
      }

      if (this.cookieStorage.getCookie("marginY") == "") {
        this.cookieStorage.setCookie("marginY", marginY, 10);
      } else {
        marginY = this.cookieStorage.getCookie("marginY");
      }

      if (this.cookieStorage.getCookie("paddingX") == "") {
        this.cookieStorage.setCookie("paddingX", paddingX, 10);
      } else {
        paddingX = this.cookieStorage.getCookie("paddingX");
      }

      if (this.cookieStorage.getCookie("paddingY") == "") {
        this.cookieStorage.setCookie("paddingY", paddingY, 10);
      } else {
        paddingY = this.cookieStorage.getCookie("paddingY");
      }

      if (this.cookieStorage.getCookie("iconDim") == "") {
        this.cookieStorage.setCookie("iconDim", iconDim, 10);
      } else {
        iconDim = this.cookieStorage.getCookie("iconDim");
      }
    }
    /**
     * 
     */

  }, {
    key: "saveState",
    value: function saveState() {
      for (var i = 0; i < this.state.icons.length; i++) {
        var icon = this.state.icons[i];
        this.cookieStorage.setCookie(icon.id, icon.x + "," + icon.y, 10);
      }
    }
    /**
     * 
     */

  }, {
    key: "prep",
    value: function prep(anIconList) {
      console.log("prep ()");
      var updatedIconList = this.dataTools.deepCopy(anIconList);

      for (var i = 0; i < updatedIconList.length; i++) {
        updatedIconList[i].uuid = this.dataTools.uuidv4();
        updatedIconList[i].moving = false;

        if (!updatedIconList[i].icon) {
          updatedIconList[i].icon = _app["default"];
        }
      }

      var index = 0;
      var xIndex = marginX;
      var yIndex = marginY;

      for (var j = 0; j < updatedIconList.length; j++) {
        var icon = updatedIconList[j];
        var coords = this.cookieStorage.getCookie(updatedIconList[j].id);

        if (coords != "") {
          var pos = coords.split(",");

          if (pos.length > 1) {
            updatedIconList[j].x = parseInt(pos[0]);
            updatedIconList[j].y = parseInt(pos[1]);
          }
        } else {
          var xPos = xIndex;
          var yPos = yIndex;
          index++;

          if (index > 10) {
            index = 0;
            xIndex = marginX;
            yIndex += iconDim + paddingY;
          } else {
            xIndex += iconDim + paddingX;
          }

          icon.x = xPos;
          icon.y = yPos;
        }
      }

      return updatedIconList;
    }
    /**
     * 
     */

  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var oldX = this.state.mouseX;
      var oldY = this.state.mouseY;
      var newMouseX = e.pageX;
      var newMouseY = e.pageY;

      if (this.state.mouseDown == true) {
        var deltaX = newMouseX - this.state.mouseX;
        var deltaY = newMouseY - this.state.mouseY;
        var updatedIconList = this.dataTools.deepCopy(this.state.icons);

        for (var i = 0; i < updatedIconList.length; i++) {
          var icon = updatedIconList[i];

          if (icon.moving == true) {
            if (deltaX != 0 || deltaY != 0) {
              this.setState({
                autoLayout: false
              });
            }

            icon.x = icon.x + deltaX;
            icon.y = icon.y + deltaY;
          }
        }

        this.setState({
          autoLayout: false,
          mouseXOld: oldX,
          mouseYOld: oldY,
          mouseX: newMouseX,
          mouseY: newMouseY,
          icons: updatedIconList
        });
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      this.setState({
        mouseXOld: oldX,
        mouseYOld: oldY,
        mouseX: newMouseX,
        mouseY: newMouseY
      });
      e.preventDefault();
      e.stopPropagation();
    }
    /**
     * 
     */

  }, {
    key: "onMouseDownIcon",
    value: function onMouseDownIcon(e, uuid) {
      //console.log ("onMouseDownIcon ("+uuid+")");
      var updatedIconList = this.dataTools.deepCopy(this.state.icons);

      for (var i = 0; i < updatedIconList.length; i++) {
        var icon = updatedIconList[i];
        icon.moving = false;

        if (icon.uuid == uuid) {
          icon.moving = true;
        }
      }

      this.setState({
        icons: updatedIconList
      });
    }
    /**
     * 
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      //console.log ("onMouseDown ()");
      var newMouseX = e.pageX;
      var newMouseY = e.pageY;
      this.setState({
        mouseDown: true,
        mouseXOld: newMouseX,
        mouseYOld: newMouseY,
        mouseX: newMouseX,
        mouseY: newMouseY
      });
      e.preventDefault();
      e.stopPropagation();
    }
    /**
     * 
     */

  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      var _this2 = this;

      //console.log ("onMouseUp ()");
      var newMouseX = e.pageX;
      var newMouseY = e.pageY;
      var updatedIconList = this.dataTools.deepCopy(this.state.icons);

      for (var i = 0; i < updatedIconList.length; i++) {
        var icon = updatedIconList[i];
        icon.moving = false;
      }

      this.setState({
        mouseDown: false,
        icons: updatedIconList
      }, function (e) {
        _this2.saveState();
      });
      e.preventDefault();
      e.stopPropagation();
    }
    /**
     *
     */

  }, {
    key: "launchInternal",
    value: function launchInternal(anIcon) {
      var result = false;

      if (anIcon.type == "knossys:url") {
        window.open(anIcon.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        result = true;
      }

      return result;
    }
    /**
     * @param {any} e
     */

  }, {
    key: "onDesktopIconClick",
    value: function onDesktopIconClick(e, uuid) {
      //console.log ("onDesktopIconClick ("+uuid+")");
      for (var i = 0; i < this.state.icons.length; i++) {
        var icon = this.state.icons[i];

        if (icon.uuid == uuid) {
          if (icon.type == "knossys:application") {
            if (this.props.launch) {
              this.props.launch(icon.id);
            }
          }

          if (icon.type == "knossys:url") {
            if (this.launchInternal(icon) == false) {
              if (this.props.launch) {
                this.props.launch(icon);
              }
            }
          }

          return;
        }
      }
    }
    /**
     * @param {any} e
     */

  }, {
    key: "onLayout",
    value: function onLayout(e) {
      var _this3 = this;

      console.log("onLayout ()");
      var updatedIconList = this.dataTools.deepCopy(this.state.icons);

      if (this.state.layout == Desktop.LAYOUT_HORIZONTAL) {
        var index = 0;
        var xIndex = marginX;
        var yIndex = marginY;
        var separation = this.state.iconDim;

        if (separation < 64) {
          separation = 64;
        }

        for (var j = 0; j < updatedIconList.length; j++) {
          var xPos = xIndex;
          var yPos = yIndex;
          index++;

          if (index > 10) {
            index = 0;
            xIndex = marginX;
            yIndex += separation + paddingY;
          } else {
            xIndex += separation + paddingX;
          }

          updatedIconList[j].x = xPos;
          updatedIconList[j].y = yPos;
        }
      }

      if (this.state.layout == Desktop.LAYOUT_VERTICAL) {
        var _index = 0;
        var _xIndex = marginX;
        var _yIndex = marginY;
        var _separation = this.state.iconDim;

        if (_separation < 64) {
          _separation = 64;
        }

        for (var _j = 0; _j < updatedIconList.length; _j++) {
          var xPos = _xIndex;
          var yPos = _yIndex;
          _index++;

          if (_index > 10) {
            _index = 0;
            _yIndex = marginY;
            _xIndex += _separation + paddingX;
          } else {
            _yIndex += _separation + paddingY;
          }

          updatedIconList[_j].x = xPos;
          updatedIconList[_j].y = yPos;
        }
      }

      this.setState({
        icons: updatedIconList
      }, function (e) {
        _this3.saveState();
      });
    }
    /**
     *
     */

  }, {
    key: "onShowGrid",
    value:
    /**
     *
     */
    function onShowGrid(e) {
      console.log("onShowGrid ()");
      this.setState({
        showGrid: e.target.checked
      });
    }
    /**
     * 
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var grid;
      var icons = [];

      if (this.state.showGrid == true) {
        grid = this.windowTools.generateGrid();
      }

      var status = /*#__PURE__*/_react["default"].createElement("div", {
        className: "mousestatus"
      }, this.state.mouseX + ", " + this.state.mouseY);

      for (var i = 0; i < this.state.icons.length; i++) {
        var icon = this.state.icons[i];
        var face = null;

        if (typeof icon.face !== 'undefined') {
          face = this.props.faces[icon.face];
        }

        icons.push( /*#__PURE__*/_react["default"].createElement(_DesktopIcon["default"], {
          key: "icon-" + i,
          icon: icon,
          face: face,
          dim: this.state.iconDim,
          onDesktopIconClick: this.onDesktopIconClick,
          onMouseDown: this.onMouseDownIcon
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "desktop",
        className: "knossys-dark desktop"
      }, grid, icons, status, /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockpanel"
      }, /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        onClick: function onClick(e) {
          return _this4.onAutolayoutChange(e, _this4.state.layout);
        },
        style: {
          width: "100%"
        }
      }, "Layout"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockbox"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Snap to grid"), /*#__PURE__*/_react["default"].createElement("input", {
        type: "checkbox",
        checked: this.state.snap,
        onChange: this.onSnapChange
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockbox"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Arrange"), /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        classes: "desktop_button_icon",
        onClick: function onClick(e) {
          return _this4.onAutolayoutChange(e, Desktop.LAYOUT_HORIZONTAL);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ri.RiArrowLeftRightLine, null)), /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        classes: "desktop_button_icon",
        onClick: function onClick(e) {
          return _this4.onAutolayoutChange(e, Desktop.LAYOUT_VERTICAL);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ri.RiArrowUpDownFill, null))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockbox"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Show Grid"), /*#__PURE__*/_react["default"].createElement("input", {
        type: "checkbox",
        checked: this.state.showGrid,
        onChange: function onChange(e) {
          return _this4.onShowGrid(e);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockbox"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Icon Size: ", this.state.iconDim, "px"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockconstrictor"
      }, /*#__PURE__*/_react["default"].createElement(_rcSlider["default"], {
        min: 32,
        max: 128,
        defaultValue: 32,
        value: this.state.iconDim,
        onChange: this.onIconSizeChange
      })))), this.props.children);
    }
  }]);

  return Desktop;
}(_react.Component);

_defineProperty(Desktop, "LAYOUT_HORIZONTAL", 0);

_defineProperty(Desktop, "LAYOUT_VERTICAL", 1);

var _default = Desktop;
exports["default"] = _default;