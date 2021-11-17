import React, { Component } from 'react';

import DataTools from './utils/datatools';

import '../../css/desktop.css';

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
    return (<div className="desktop_icon" style={{left: this.props.icon.x, top: this.props.icon.y}} onMouseDown={(e) => this.onMouseDown (e,this.props.icon.uuid)} onDoubleClick={(e) => this.onDesktopIconClick (e,this.props.icon.uuid)} >
      <div className="desktop_icon_row">
        <div className="iconface">
          <img src={this.props.icon.icon} style={{padding: "0px", margin: "0px", width: this.props.dim, height: this.props.dim}} draggable="false" />
        </div>
      </div>
      <div className="desktop_label">{this.props.icon.label}</div>
    </div>);    
  }
}

export default DesktopIcon;
