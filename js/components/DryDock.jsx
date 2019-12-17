import React, { Component } from 'react';

import DataTools from './utils/datatools';
import Desktop from './Desktop';

import '../../css/main.css';
import '../../css/desktop.css';

import defaultIcon from '../../css/images/app-icon.png';

var desktopIconList=[{
    "label" : "pipeline1",
    "type" : "knossys:pipeline",
    "icon" : defaultIcon
  },{
    "label" : "pipeline2",
    "type" : "knossys:pipeline",
    "icon" : defaultIcon
  },{
    "label" : "dataset1",
    "type" : "knossys:dataset",
    "icon" : defaultIcon
  },  
];

/**
 * 
 */
class DryDock extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    
    this.dataTools=new DataTools ();

    this.state = {
    };    
  }

  /**
   *
   */
  render() {
    return (
     <Desktop icons={desktopIconList}/>
    );
  }
}

export default DryDock;
