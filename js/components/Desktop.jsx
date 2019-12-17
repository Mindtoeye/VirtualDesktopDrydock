
import React, { Component } from 'react';

import DataTools from './utils/datatools';
import DesktopIcon from './DesktopIcon';

import '../../css/desktop.css';

const marginX = 4;
const marginY = 4;
const paddingX = 8;
const paddingY = 8;
const iconDim = 64;

/**
 *
 */
class Desktop extends Component {

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
  }  

  /**
   * 
   */  
  render() {
    let icons = [];
    
    let index=0;
    let xIndex=marginX;
    let yIndex=marginY;
   
    for (let i=0;i<this.props.icons.length;i++) {
      let icon=this.props.icons [i];
      var xPos=xIndex;
      var yPos=yIndex;
      
      index++;
      
      if (index>10) {
        index=0;
        xIndex=marginX;
        yIndex+=(iconDim+marginY);
      } else {
        xIndex+=(iconDim+marginX);
      }  

      icons.push (<DesktopIcon key={"icon-"+i} icon={icon.icon} label={icon.label} x={xPos} y={yPos} />);     
    }
   
    return (
      <div id="desktop" className="desktop">
      {icons}
      </div>
    );
  }
}

export default Desktop;
