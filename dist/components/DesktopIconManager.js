"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _DataTools = _interopRequireDefault(require("./utils/DataTools"));
var _CookieStorage = _interopRequireDefault(require("./utils/CookieStorage"));
var _app = _interopRequireDefault(require("./css/images/app.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 *
 */
var DesktopIconManager = /*#__PURE__*/function () {
  /**
   * 
   */
  function DesktopIconManager() {
    _classCallCheck(this, DesktopIconManager);
    this.icons = [];
    this.dataTools = new _DataTools["default"]();
    this.cookieStorage = new _CookieStorage["default"]();
    this.updateDesktop = null;
  }

  /**
   * 
   */
  _createClass(DesktopIconManager, [{
    key: "addApp",
    value: function addApp(aLabel, anId, aType, aFaceId) {
      var newApp = {
        id: anId,
        uuid: this.dataTools.uuidv4(),
        label: aLabel,
        type: aType,
        face: aFaceId,
        visible: true,
        multiple: false,
        moving: false,
        disabled: false,
        icon: _app["default"]
      };
      var coords = this.cookieStorage.getCookie(anId);
      if (coords != "") {
        var pos = coords.split(",");
        if (pos.length > 1) {
          newApp.x = parseInt(pos[0]);
          newApp.y = parseInt(pos[1]);
        }
      } else {
        newApp.x = 10;
        newApp.y = 10;
      }
      this.icons.push(newApp);
      if (this.updateDesktop != null) {
        this.updateDesktop();
      }
      return newApp;
    }

    /**
     * 
     */
    /* 
    prep (anIconList) {
      console.log ("prep ()");
       let updatedIconList=this.dataTools.deepCopy (anIconList);
       for (let i=0;i<updatedIconList.length;i++) {
        updatedIconList [i].uuid=this.dataTools.uuidv4();
        updatedIconList [i].moving=false;
        if (!updatedIconList [i].icon) {
          updatedIconList [i].icon=defaultIcon;
        }
      }
       let index=0;
      let xIndex=marginX;
      let yIndex=marginY;
     
      for (let j=0;j<updatedIconList.length;j++) {
        let icon=updatedIconList [j];
         let coords=this.cookieStorage.getCookie (updatedIconList [j].id);
        if (coords!="") {
          let pos=coords.split (",");      
          if(pos.length>1) {
            updatedIconList [j].x=parseInt(pos [0]);
            updatedIconList [j].y=parseInt(pos [1]);
          }
        } else {
          var xPos=xIndex;
          var yPos=yIndex;
          
          index++;
          
          if (index>10) {
            index=0;
            xIndex=marginX;
            yIndex+=(iconDim+paddingY);
          } else {
            xIndex+=(iconDim+paddingX);
          }
           icon.x=xPos;
          icon.y=yPos;
        }
      }    
       return (updatedIconList);
    }
    */

    /**
     * 
     */
  }, {
    key: "getIcons",
    value: function getIcons() {
      return this.icons;
    }

    /**
     * 
     */
  }, {
    key: "getIcon",
    value: function getIcon(anId) {
      for (var j = 0; j < this.icons.length; j++) {
        var icon = this.icons[j];
        if (icon.id == anId) {
          return icon;
        }
      }
      return null;
    }

    /**
     * 
     */
  }, {
    key: "setIcons",
    value: function setIcons(anAppList) {
      this.icons = anAppList;
      for (var i = 0; i < this.icons.length; i++) {
        var icon = this.icons[i];
        this.cookieStorage.setCookie(icon.id, icon.x + "," + icon.y, 10);
      }
      if (this.updateDesktop != null) {
        this.updateDesktop();
      }
    }

    /**
     * 
     */
  }, {
    key: "disableIcon",
    value: function disableIcon(anId, aValue) {
      for (var j = 0; j < this.icons.length; j++) {
        var icon = this.icons[j];
        if (icon.id == anId) {
          icon.disabled = aValue;
        }
      }
    }

    /**
     * 
     */
  }, {
    key: "setUpdateDesktop",
    value: function setUpdateDesktop(anUpdater) {
      this.updateDesktop = anUpdater;
    }
  }]);
  return DesktopIconManager;
}();
var _default = DesktopIconManager;
exports["default"] = _default;