"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
var _DesktopIcon = _interopRequireDefault(require("./DesktopIcon"));
var _WindowTools = _interopRequireDefault(require("./utils/WindowTools"));
require("./css/desktop.css");
var _app = _interopRequireDefault(require("./css/images/app.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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
        _this.sessionStorage.setIntegerValue("direction", _this.state.layout);
        _this.onLayout(null);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onSnapChange", function (event) {
      console.log("onSnapChange ()");
      _this.setState({
        snap: event.target.checked
      });
    });
    _this.sessionStorage = new _knossysUiCore.KSessionStorage("kdesktop");
    _this.dataTools = new _DataTools["default"]();
    _this.windowTools = new _WindowTools["default"]();
    var snapIcons = false;
    if (props.snap) {
      snapIcons = props.snap;
    }
    _this.state = {
      iconDim: iconDim,
      autoLayout: true,
      layout: _this.sessionStorage.getIntegerValue("direction", Desktop.LAYOUT_HORIZONTAL),
      snap: true,
      snapIcons: snapIcons,
      showGrid: false,
      mouseDown: false,
      mouseXOld: 0,
      mouseYOld: 0,
      mouseX: 0,
      mouseY: 0
    };

    //this.loadSettings ();

    //this.saveState = this.saveState.bind (this);
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
   * Do we still need this?
   */
  /* 
  saveState () {
    //for (let i=0;i<this.state.icons.length;i++) {
    //  let icon=this.state.icons [i];     
    //  this.cookieStorage.setCookie (icon.id,icon.x+","+icon.y,10); 
    //}
     this.sessionStorage.setJSONObject ("icons",this.state.icons);
  } 
  */

  /**
   * 
   */
  _createClass(Desktop, [{
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var oldX = this.state.mouseX;
      var oldY = this.state.mouseY;
      var newMouseX = e.pageX;
      var newMouseY = e.pageY;
      if (this.state.mouseDown == true) {
        var deltaX = newMouseX - this.state.mouseX;
        var deltaY = newMouseY - this.state.mouseY;
        var icons = this.props.iconManager.getIcons();
        var updatedIconList = this.dataTools.deepCopy(icons);
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
          mouseY: newMouseY
        });
        e.preventDefault();
        e.stopPropagation();
        if (this.props.iconManager) {
          this.props.iconManager.setIcons(updatedIconList);
        }
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

      var icons = this.props.iconManager.getIcons();
      var updatedIconList = this.dataTools.deepCopy(icons);
      for (var i = 0; i < updatedIconList.length; i++) {
        var icon = updatedIconList[i];
        icon.moving = false;
        if (icon.uuid == uuid) {
          icon.moving = true;
        }
      }

      /*
      this.setState({
       icons: updatedIconList      
      });    
      */

      if (this.props.iconManager) {
        this.props.iconManager.setIcons(updatedIconList);
      }
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
      var icons = this.props.iconManager.getIcons();
      var updatedIconList = this.dataTools.deepCopy(icons);
      for (var i = 0; i < updatedIconList.length; i++) {
        var icon = updatedIconList[i];
        icon.moving = false;
      }
      this.setState({
        mouseDown: false
      }, function (e) {
        //this.saveState (updatedIconList);
        if (_this2.props.iconManager) {
          _this2.props.iconManager.setIcons(updatedIconList);
        }
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

      var icons = this.props.iconManager.getIcons();
      for (var i = 0; i < icons.length; i++) {
        var icon = icons[i];
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
      console.log("onLayout ()");
      var icons = this.props.iconManager.getIcons();
      var updatedIconList = this.dataTools.deepCopy(icons);
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

      //this.saveState (updatedIconList);

      if (this.props.iconManager) {
        this.props.iconManager.setIcons(updatedIconList);
      } else {}

      /*
      this.setState ({icons: updatedIconList}, (e) => {
        this.saveState ();
      });
      */
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
    key: "onDebug",
    value: function onDebug(e) {
      var icons = this.props.iconManager.getIcons();
      console.log(icons);
    }

    /**
     * 
     */
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var grid;
      var activeicons = [];
      if (this.state.showGrid == true) {
        grid = this.windowTools.generateGrid();
      }
      var status = /*#__PURE__*/_react["default"].createElement("div", {
        className: "mousestatus"
      }, this.state.mouseX + ", " + this.state.mouseY);
      var icons = this.props.iconManager.getIcons();
      for (var i = 0; i < icons.length; i++) {
        var icon = icons[i];
        if (icon.visible == true) {
          var face = null;
          if (typeof icon.face !== 'undefined') {
            face = this.props.faces[icon.face];
          }
          activeicons.push( /*#__PURE__*/_react["default"].createElement(_DesktopIcon["default"], {
            key: "icon-" + i,
            icon: icon,
            face: face,
            dim: this.state.iconDim,
            onDesktopIconClick: this.onDesktopIconClick,
            onMouseDown: this.onMouseDownIcon
          }));
        }
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: "desktop",
        className: "knossys-dark desktop"
      }, grid, activeicons, status, /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockpanel"
      }, /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        onClick: function onClick(e) {
          return _this3.onAutolayoutChange(e, _this3.state.layout);
        },
        style: {
          width: "100%"
        }
      }, "Layout"), /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        onClick: function onClick(e) {
          return _this3.onDebug(e);
        },
        style: {
          width: "100%"
        }
      }, "Debug"), /*#__PURE__*/_react["default"].createElement("div", {
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
          return _this3.onAutolayoutChange(e, Desktop.LAYOUT_HORIZONTAL);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ri.RiArrowLeftRightLine, null)), /*#__PURE__*/_react["default"].createElement(_knossysUiCore.KButton, {
        classes: "desktop_button_icon",
        onClick: function onClick(e) {
          return _this3.onAutolayoutChange(e, Desktop.LAYOUT_VERTICAL);
        }
      }, /*#__PURE__*/_react["default"].createElement(_ri.RiArrowUpDownFill, null))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "drydockbox"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Show Grid"), /*#__PURE__*/_react["default"].createElement("input", {
        type: "checkbox",
        checked: this.state.showGrid,
        onChange: function onChange(e) {
          return _this3.onShowGrid(e);
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