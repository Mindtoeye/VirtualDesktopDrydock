import React, { Component } from 'react';

import DataTools from './utils/datatools';
import Desktop from './Desktop';

import '../../css/main.css';
import '../../css/desktop.css';

import defaultIcon from '../../css/images/app.png';

var apps=[{
    "label" : "FSM Editor",
    "id": "app1", // This needs to be stable since we use it to store state
    "type" : "knossys:pipeline"
  },{
    "label" : "Settings",
    "id": "app2", // This needs to be stable since we use it to store state
    "type" : "knossys:settings"
  },{
    "label" : "Knossys",
    "id": "app3", // This needs to be stable since we use it to store state
    "type" : "knossys:url",
    "icon" : defaultIcon,
    "url" : "https://knossys.com"
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
  
    this.launch = this.launch.bind(this);
  }

  /**
   *
   */
  launch (anApp) {
    console.log ("launch ()");

  }

  /**
   *
   */
  render() {
    return (
     <Desktop icons={apps} snap={true} launch={this.launch}>
     &nbsp;
     </Desktop>
    );
  }
}

export default DryDock;
