import React, { Component } from 'react';

import { RiStackshareLine } from 'react-icons/ri';
import { VscFileSubmodule } from 'react-icons/vsc';
import { MdPermIdentity } from 'react-icons/md';

import DataTools from './lib/components/utils/DataTools';
import Desktop from './lib/components/Desktop';

import '../css/main.css';
import '../css/drydock.css';
import './lib/components/css/desktop.css';

import defaultIcon from '../css/images/app.png';

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

    this.faces=[<RiStackshareLine/>,<VscFileSubmodule/>, <MdPermIdentity />];

    this.state={
      apps: [{
          label : "Pipeliner",
          id: "pipeliner",
          type: "knossys:application",
          face: 0,
          multiple: false
        },{
          label : "File Mananger",
          id: "fmanager",
          type : "knossys:application",
          face: 1,
          multiple: true
        },{
          label : "Credentials",
          id: "credentials",
          type : "knossys:application",
          face: 2,
          multiple: false
        }
      ]
    };

    this.launch = this.launch.bind(this);
  }

  /**
   *
   */
  launch (anApp) {
    console.log ("launch ("+anApp+")");

  }

  /**
   *
   */
  render() {
    return (
     <Desktop icons={this.state.apps} faces={this.faces} snap={true} launch={this.launch}>
     </Desktop>
    );
  }
}

export default DryDock;
