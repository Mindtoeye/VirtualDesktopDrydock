import React, { Component } from 'react';

import DataTools from './utils/DataTools';

import './css/desktop.css';

/**
 *
 */
class DesktopIcon extends Component {

  /**
   * @param {any} props
   */  
  constructor (props){
    super (props); 
    
    this.onDesktopIconClick=this.onDesktopIconClick.bind (this);
    this.onMouseDown=this.onMouseDown.bind (this);
  }

  /**
   * @param {any} e
   */
  onDesktopIconClick (e,uuid) {
    if (this.props.icon.disabled==true) {
      console.log ("Icon disabled, bump");
      return;
    }

    if (this.props.onDesktopIconClick) {
      this.props.onDesktopIconClick (e,uuid);
    }
  }

  /**
   * @param {any} e
   */
  onMouseDown (e,uuid) {
  	if (this.props.onMouseDown) {
  	  this.props.onMouseDown (e,uuid);
  	}
  }

  /**
   * 
   */  
  render() {   
    let icon;
    let iconOpacity=1.0;

    if (this.props.icon.disabled==true) {
      iconOpacity=0.3;
    }

    if (this.props.face) {
      icon=<div className="face">{this.props.face}</div>;
    } else {
      icon=<div className="icon"><img src={this.props.icon.icon} style={{padding: "0px", margin: "0px", width: this.props.dim, height: this.props.dim}} draggable="false" /></div>;
    }

    return (<div className="desktop_icon" style={{left: this.props.icon.x, top: this.props.icon.y, opacity: iconOpacity}} onMouseDown={(e) => this.onMouseDown (e,this.props.icon.uuid)} onDoubleClick={(e) => this.onDesktopIconClick (e,this.props.icon.uuid)} >
      <div className="desktop_icon_row">
        {icon}
      </div>
      <div className="desktop_label">{this.props.icon.label}</div>
    </div>);    
  }
}

export default DesktopIcon;
