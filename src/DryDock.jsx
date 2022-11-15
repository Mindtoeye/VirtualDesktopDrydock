import React, { Component } from 'react';

import { RiStackshareLine } from 'react-icons/ri';
import { VscFileSubmodule } from 'react-icons/vsc';
import { MdPermIdentity } from 'react-icons/md';
import { GiPortal } from 'react-icons/gi';

import DataTools from './lib/components/utils/DataTools';
import Desktop from './lib/components/Desktop';
import DesktopIconManager from './lib/components/DesktopIconManager';

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

    let testTimer=-1;
    
    this.dataTools=new DataTools ();

    this.faces=[<RiStackshareLine/>,<VscFileSubmodule/>, <MdPermIdentity />, <GiPortal />];

    this.state={
      trigger: 0
    };

    this.update = this.update.bind(this);
    this.launch = this.launch.bind(this);
    this.testDisabling = this.testDisabling.bind(this);

    this.desktopIconManager=new DesktopIconManager ();
    this.desktopIconManager.setUpdateDesktop(this.update);    
  }

  /**
   *
   */
  componentDidMount () {
    console.log ("componentDidMount ()");

    this.desktopIconManager.addApp ("Pipeliner","pipeliner","knossys:application",0);
    this.desktopIconManager.addApp ("File Manager","filemanager","knossys:application",1);
    this.desktopIconManager.addApp ("Credentials","credentials","knossys:application",2);
    this.desktopIconManager.addApp ("Data Portal","dataportal","knossys:application",3);

    this.testTimer=setInterval(this.testDisabling,10000);
  }

  /**
   *
   */
  componentWillUnmount () {
    console.log ("componentWillUnmount ()");
    clearInterval(this.testTimer);
  }  

  /**
   * 
   */
  testDisabling () {
    //console.log ("testDisabling ()");

    let testIcon=null;

    testIcon=this.desktopIconManager.getIcon ("dataportal");
    if (testIcon) {
      if (testIcon.disabled==false) {
        testIcon.disabled=true;
        //this.desktopIconManager.disableIcon ("dataportal",true);
      } else {
        testIcon.disabled=false;
        //this.desktopIconManager.disableIcon ("dataportal",false);
      }
    } else {
      console.log ("Error target icon not found");
    }

    testIcon=this.desktopIconManager.getIcon ("filemanager");
    if (testIcon) {
      if (testIcon.visible==false) {
        testIcon.visible=true;
      } else {
        testIcon.visible=false;
      }
    } else {
      console.log ("Error target icon not found");
    }

    this.update();      
  }

  /**
   * 
   */
  update () {
    let trgr=this.state.trigger;
    this.setState ({
      trigger: trgr++
    });
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
      <Desktop 
        trigger={this.state.trigger} 
        iconManager={this.desktopIconManager} 
        icons={this.desktopIconManager.getIcons ()} 
        faces={this.faces} 
        snap={true} 
        launch={this.launch} />
    );
  }
}

export default DryDock;
