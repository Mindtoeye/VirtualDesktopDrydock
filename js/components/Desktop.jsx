import React, { Component } from 'react';

import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import DataTools from './utils/datatools';
import CookieStorage from './utils/cookiestorage';
import DesktopIcon from './DesktopIcon';

import '../../css/desktop.css';
import '../../css/drydock.css';

import defaultIcon from '../../css/images/app.png';

var marginX = 4;
var marginY = 4;
var paddingX = 12;
var paddingY = 12;
var iconDim = 64;

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
    this.cookieStorage=new CookieStorage ();

    let snapIcons=false;

    if (props.snap) {
      snapIcons=props.snap;
    }

    this.state = {
      iconDim: 32,
      autoLayout: false,
      snap: false,
      snapIcons: snapIcons,
      mouseDown: false,
      mouseXOld: 0,
      mouseYOld: 0,
      mouseX: 0,
      mouseY: 0,
      icons: this.prep (this.props.icons)
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
          yIndex+=(this.state.iconDim+paddingY);
        } else {
          xIndex+=(this.state.iconDim+paddingX);
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
   * @param {any} e
   */
  onDesktopIconClick (e,uuid) {
  	console.log ("onDesktopIconClick ("+uuid+")");

    for (let i=0;i<this.state.icons.length;i++) {
      let icon=this.state.icons [i];
      if (icon.uuid==uuid) {
      	console.log ("Launching: " + icon.label);
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
      autoLayout: event.target.checked
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
  render() {
    let icons = [];

    let status=<div className="mousestatus">{this.state.mouseX + ", " + this.state.mouseY}</div>;
       
    for (let i=0;i<this.state.icons.length;i++) {
      let icon=this.state.icons [i];
      icons.push (<DesktopIcon key={"icon-"+i} icon={icon} dim={this.state.iconDim} onDesktopIconClick={this.onDesktopIconClick} onMouseDown={this.onMouseDownIcon} />);
    }
   
    return (
      <div id="desktop" className="desktop">
        {icons}
        {status}
	    <div className="drydockpanel">
	      <button className="button" style={{width: "100%"}} id="layout" onClick={this.onLayout}>Layout</button>

	      <div className="drydockbox">
	        <p>Auto Layout</p>
	        <input type="checkbox" checked={this.state.autoLayout} onChange={this.onAutolayoutChange} />
	      </div>

	      <div className="drydockbox">
	        <p>Snap to grid</p>
	        <input type="checkbox" checked={this.state.snap} onChange={this.onSnapChange} />
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
