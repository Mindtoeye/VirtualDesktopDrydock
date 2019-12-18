import React, { Component } from 'react';

import DataTools from './utils/datatools';
import CookieStorage from './utils/cookiestorage';
import DesktopIcon from './DesktopIcon';

import '../../css/desktop.css';

import defaultIcon from '../../css/images/app-icon.png';

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

    let snapIcons=false;

    if (props.snap) {
      snapIcons=props.snap;
    }

    this.state = {
      snapIcons: snapIcons,
      mouseDown: false,
      mouseXOld: 0,
      mouseYOld: 0,
      mouseX: 0,
      mouseY: 0
    }

    this.dataTools=new DataTools ();
    this.cookieStorage=new CookieStorage ();

    this.state = {
      icons: this.prep (this.props.icons)
    }
   
    this.loadSettings ();

    this.saveState = this.saveState.bind (this);
    
    this.onDesktopIconClick=this.onDesktopIconClick.bind (this);
    this.onMouseDownIcon=this.onMouseDownIcon.bind(this);
   
    this.onMouseMove=this.onMouseMove.bind(this);
    this.onMouseDown=this.onMouseDown.bind(this);
    this.onMouseUp=this.onMouseUp.bind(this);

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
  	//console.log ("onMouseMove ()");

  	var oldX = this.state.mouseX;
  	var oldY = this.state.mouseY;

    var newMouseX=e.pageX;
    var newMouseY=e.pageY;

  	if (this.state.mouseDown==true) {
      var deltaX = (newMouseX - this.state.mouseX);
      var deltaY = (newMouseY - this.state.mouseY);

      //console.log (oldX + ", " + oldY +", " + newMouseX + ", " + newMouseY + ", " + deltaX + ", " + deltaY);

  	  let updatedIconList=this.dataTools.deepCopy (this.state.icons);

  	  for (let i=0;i<updatedIconList.length;i++) {
        let icon=updatedIconList [i];
        if (icon.moving==true) {
          //console.log ("From ("+icon.x+","+icon.y+") => ("+(icon.x+deltaX)+","+(icon.y+deltaY)+")")
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
   * 
   */  
  render() {
    let icons = [];

    let status=<div className="mousestatus">{this.state.mouseX + ", " + this.state.mouseY}</div>;
       
    for (let i=0;i<this.state.icons.length;i++) {
      let icon=this.state.icons [i];

      /*
      if (this.state.mouseDown==false) {
        icons.push (<DesktopIcon key={"icon-"+i} icon={icon} onDesktopIconClick={this.onDesktopIconClick} onMouseDown={this.onMouseDownIcon} />);
      } else {
        icons.push (<DesktopIcon key={"icon-"+i} icon={icon} />);
      }
      */

      icons.push (<DesktopIcon key={"icon-"+i} icon={icon} onDesktopIconClick={this.onDesktopIconClick} onMouseDown={this.onMouseDownIcon} />);
    }
   
    return (
      <div id="desktop" className="desktop">
      {icons}
      {status}
      </div>
    );
  }
}

export default Desktop;
