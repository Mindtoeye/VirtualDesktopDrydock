
import React, { Component } from 'react';

import DataTools from './utils/datatools';

import '../../css/desktop.css';

/**
 *
 */
class DesktopIcon extends Component {

  /**
   * 
   * @param {any} props
   */  
  constructor (props){
    super (props); 
    
    this.onDesktopIconClick=this.onDesktopIconClick.bind (this);
  }

  /**
   * 
   * @param {any} e
   */
  onDesktopIconClick (e) {
    console.log ("onDesktopIconClick ()");    

    if (this.props.onDesktopIconClick) {
      this.props.onDesktopIconClick (e);
    }
  }

  /**
   * 
   */  
  render() {      
    return (<div className="desktop_icon" style={{left: this.props.x, top: this.props.y}} onClick={this.onDesktopIconClick} >
      <div className="desktop_icon_row">
        <div className="iconface">
          <img src={this.props.icon} style={{padding: "0px", margin: "0px"}} />
        </div>
      </div>
      <div className="desktop_label">{this.props.label}</div>
    </div>);    
  }
}

export default DesktopIcon;
