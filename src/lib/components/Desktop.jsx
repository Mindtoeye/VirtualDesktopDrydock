import React, { Component } from 'react';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { RiArrowLeftRightLine, RiArrowUpDownFill } from 'react-icons/ri';

import { KButton } from '@knossys/knossys-ui-core';

import DataTools from './utils/DataTools';
import CookieStorage from './utils/cookiestorage';
import DesktopIcon from './DesktopIcon';
import WindowTools from './utils/WindowTools';

import './css/desktop.css';

import defaultIcon from './css/images/app.png';

var marginX = 4;
var marginY = 4;
var paddingX = 12;
var paddingY = 12;
var iconDim = 32;

/**
 *
 */
class Desktop extends Component {

  /**
   * @param {any} props
   */  
  constructor (props){
    super (props);

    this.dataTools=new DataTools ();
    this.windowTools=new WindowTools ();
    this.cookieStorage=new CookieStorage ();

    let snapIcons=false;

    if (props.snap) {
      snapIcons=props.snap;
    }

    let prepped=this.prep (this.props.icons);

    this.state = {
      iconDim: iconDim,
      autoLayout: true,
      snap: false,
      snapIcons: snapIcons,
      showGrid: false,
      mouseDown: false,
      mouseXOld: 0,
      mouseYOld: 0,
      mouseX: 0,
      mouseY: 0,
      icons: prepped
    }

    //this.loadSettings ();

    this.saveState = this.saveState.bind (this);
    this.onLayout = this.onLayout.bind (this);
    this.onDesktopIconClick=this.onDesktopIconClick.bind (this);
    this.onMouseDownIcon=this.onMouseDownIcon.bind(this);
   
    this.onMouseMove=this.onMouseMove.bind(this);
    this.onMouseDown=this.onMouseDown.bind(this);
    this.onMouseUp=this.onMouseUp.bind(this);

    this.onIconSizeChange=this.onIconSizeChange.bind(this);
    this.onAutolayoutChange=this.onAutolayoutChange.bind(this);

    this.onShowGrid=this.onShowGrid.bind(this);

    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  /**
   * 
   */
  loadSettings () {
    if (this.cookieStorage.getCookie ("marginX")=="") {
      this.cookieStorage.setCookie ("marginX",marginX,10);
    } else {
      marginX=this.cookieStorage.getCookie ("marginX");
    }

    if (this.cookieStorage.getCookie ("marginY")=="") {
      this.cookieStorage.setCookie ("marginY",marginY,10);
    } else {
      marginY=this.cookieStorage.getCookie ("marginY");
    }

    if (this.cookieStorage.getCookie ("paddingX")=="") {
      this.cookieStorage.setCookie ("paddingX",paddingX,10);
    } else {
      paddingX=this.cookieStorage.getCookie ("paddingX");
    }

    if (this.cookieStorage.getCookie ("paddingY")=="") {
      this.cookieStorage.setCookie ("paddingY",paddingY,10);
    } else {
      paddingY=this.cookieStorage.getCookie ("paddingY");
    }

    if (this.cookieStorage.getCookie ("iconDim")=="") {
      this.cookieStorage.setCookie ("iconDim",iconDim,10);
    } else {
      iconDim=this.cookieStorage.getCookie ("iconDim");
    }  	
  }

  /**
   * 
   */
  saveState () {
  	for (let i=0;i<this.state.icons.length;i++) {
      let icon=this.state.icons [i];     
      this.cookieStorage.setCookie (icon.id,icon.x+","+icon.y,10); 
  	}
  }

  /**
   * 
   */
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

  /**
   * 
   */
  onMouseMove (e) {
  	var oldX = this.state.mouseX;
  	var oldY = this.state.mouseY;

    var newMouseX=e.pageX;
    var newMouseY=e.pageY;

  	if (this.state.mouseDown==true) {
      var deltaX = (newMouseX - this.state.mouseX);
      var deltaY = (newMouseY - this.state.mouseY);

  	  let updatedIconList=this.dataTools.deepCopy (this.state.icons);

  	  for (let i=0;i<updatedIconList.length;i++) {
        let icon=updatedIconList [i];
        if (icon.moving==true) {
          if ((deltaX!=0) || (deltaY!=0)) {
            this.setState({
              autoLayout: false
            });
          }
  	
          icon.x=(icon.x+deltaX);
          icon.y=(icon.y+deltaY);
        }
      }   

      this.setState ({
        autoLayout: false,
      	mouseXOld: oldX,
      	mouseYOld: oldY,
      	mouseX: newMouseX,
      	mouseY: newMouseY,
	    icons: updatedIconList});

      e.preventDefault ();
      e.stopPropagation ();

	    return;  
  	}

    this.setState ({
      mouseXOld: oldX,
      mouseYOld: oldY,
      mouseX: newMouseX,
      mouseY: newMouseY});

    e.preventDefault ();
    e.stopPropagation ();      
  }

  /**
   * 
   */
  onMouseDownIcon (e,uuid) {
  	//console.log ("onMouseDownIcon ("+uuid+")");

  	let updatedIconList=this.dataTools.deepCopy (this.state.icons);

    for (let i=0;i<updatedIconList.length;i++) {
      let icon=updatedIconList [i];
      icon.moving=false;
      if (icon.uuid==uuid) {
      	icon.moving=true;
      }
    }    

    this.setState({
  	  icons: updatedIconList      
    });    
  }   

  /**
   * 
   */
  onMouseDown (e) {
  	//console.log ("onMouseDown ()");

    var newMouseX=e.pageX;
    var newMouseY=e.pageY;

    this.setState({
      mouseDown: true,
      mouseXOld: newMouseX,
      mouseYOld: newMouseY,        
      mouseX: newMouseX,
      mouseY: newMouseY
    });

    e.preventDefault ();
    e.stopPropagation ();
  }  

  /**
   * 
   */
  onMouseUp (e) {
	//console.log ("onMouseUp ()");

	var newMouseX=e.pageX;
    var newMouseY=e.pageY;

  	let updatedIconList=this.dataTools.deepCopy (this.state.icons);

    for (let i=0;i<updatedIconList.length;i++) {
      let icon=updatedIconList [i];
      icon.moving=false;
    }

    this.setState({
      mouseDown: false,
  	  icons: updatedIconList      
    },(e) => {
      this.saveState ();
    });

    e.preventDefault ();
    e.stopPropagation ();    
  }

  /**
   *
   */
  launchInternal (anIcon) {
    let result=false;

    if (anIcon.type=="knossys:url") {
      window.open(anIcon.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
      result=true;
    }   

    return (result);
  }

  /**
   * @param {any} e
   */
  onDesktopIconClick (e,uuid) {
  	//console.log ("onDesktopIconClick ("+uuid+")");

    for (let i=0;i<this.state.icons.length;i++) {
      let icon=this.state.icons [i];
      if (icon.uuid==uuid) {
        if (icon.type=="knossys:application"){
          if(this.props.launch) {
            this.props.launch(icon.id);
          }
        }

        if (icon.type=="knossys:url") {
          if (this.launchInternal (icon)==false) {
            if (this.props.launch) {
              this.props.launch (icon);
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
  onLayout (e) {
  	console.log ("onLayout ()");

    let updatedIconList=this.dataTools.deepCopy (this.state.icons);

    let index=0;
    let xIndex=marginX;
    let yIndex=marginY;

    let separation=this.state.iconDim;

    if (separation<64) {
      separation=64;
    }
   
    for (let j=0;j<updatedIconList.length;j++) {
      var xPos=xIndex;
      var yPos=yIndex;
	      
      index++;
	      
      if (index>10) {
        index=0;
        xIndex=marginX;
        yIndex+=(separation+paddingY);
      } else {
        xIndex+=(separation+paddingX);
      }

      updatedIconList [j].x=xPos;
      updatedIconList [j].y=yPos;
    }

    this.setState ({icons: updatedIconList}, (e) => {
      this.saveState ();
    });
  }

  /**
   *
   */
  onIconSizeChange = (value) => {
    this.setState({
      iconDim: value
    },(e) => {
      if (this.state.autoLayout==true) {
      	this.onLayout (null);
      }
    });
  };

  /**
   *
   */
  onAutolayoutChange = (event) => {
  	console.log ("onAutolayoutChange ()");

    this.setState({
      autoLayout: true
    },(e) => {
      this.onLayout (null);
    });
  }

  /**
   *
   */
  onSnapChange = (event) => {
  	console.log ("onSnapChange ()");

    this.setState({
      snap: event.target.checked
    });  	
  }  

  /**
   *
   */
  onShowGrid (e) {
    console.log ("onShowGrid ()");

    this.setState({
      showGrid: e.target.checked
    });       
  }

  /**
   * 
   */  
  render() {
    let grid;
    let icons = [];

    if (this.state.showGrid==true) {
      grid=this.windowTools.generateGrid();
    }

    let status=<div className="mousestatus">{this.state.mouseX + ", " + this.state.mouseY}</div>;
       
    for (let i=0;i<this.state.icons.length;i++) {
      let icon=this.state.icons [i];
      let face=null;
      if (typeof icon.face !== 'undefined') {
        face=this.props.faces[icon.face];
      }
      icons.push (<DesktopIcon key={"icon-"+i} icon={icon} face={face} dim={this.state.iconDim} onDesktopIconClick={this.onDesktopIconClick} onMouseDown={this.onMouseDownIcon} />);
    }
   
    return (
      <div id="desktop" className="knossys-dark desktop">
        {grid}
        {this.props.children}
        {icons}
        {status}
  	    <div className="drydockpanel">

	        <KButton onClick={(e) => this.onAutolayoutChange(e)} style={{width: "100%"}}>Layout</KButton>

  	      <div className="drydockbox">
  	        <p>Snap to grid</p>
  	        <input type="checkbox" checked={this.state.snap} onChange={this.onSnapChange} />
  	      </div>

          <div className="drydockbox">
            <p>Arrange</p>
            <KButton classes="desktop_button_icon" onClick={(e) => this.onAutolayoutChange(e)}><RiArrowLeftRightLine /></KButton>            
            <KButton classes="desktop_button_icon" onClick={(e) => this.onAutolayoutChange(e)}><RiArrowUpDownFill /></KButton>
          </div>          

          <div className="drydockbox">
            <p>Show Grid</p>
            <input type="checkbox" checked={this.state.showGrid} onChange={(e) => this.onShowGrid(e)} />
          </div>                  

  	      <div className="drydockbox">
  	        <p>Icon Size: {this.state.iconDim}px</p>
  	        <div className="drydockconstrictor">
  	          <Slider min={32} max={128} defaultValue={32} value={this.state.iconDim} onChange={this.onIconSizeChange} />
  	        </div>
  	      </div>
  	    </div>
      </div>
    );
  }
}

export default Desktop;
