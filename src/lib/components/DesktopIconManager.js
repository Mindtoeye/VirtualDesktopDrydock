
import DataTools from './utils/DataTools';
import CookieStorage from './utils/CookieStorage';

import defaultIcon from './css/images/app.png';

/**
 *
 */
class DesktopIconManager {

  /**
   * 
   */	
  constructor () {
    this.icons=[];

    this.dataTools=new DataTools();
    this.cookieStorage=new CookieStorage ();

    this.updateDesktop=null;
  }
	
  /**
   * 
   */
  addApp (aLabel,anId,aType,aFaceId) {
  	let newApp={
  	  id: anId,
      uuid: this.dataTools.uuidv4(),
      label : aLabel,      
      type: aType,
      face: aFaceId,
      visible: true,
      multiple: false,
      moving: false,
      disabled: false,
      icon: defaultIcon
    };

    let coords=this.cookieStorage.getCookie (anId);
    if (coords!="") {
      let pos=coords.split (",");      
      if(pos.length>1) {
        newApp.x=parseInt(pos [0]);
        newApp.y=parseInt(pos [1]);
      }
    } else {
      newApp.x=10;
      newApp.y=10;
    }

    this.icons.push(newApp);

    if (this.updateDesktop!=null) {
      this.updateDesktop ();
    }

  	return (newApp);
  }

  /**
   * 
   */
  /* 
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
  */

  /**
   * 
   */
  getIcons () {
  	return (this.icons);
  }

  /**
   * 
   */
  getIcon (anId) {
    for (let j=0;j<this.icons.length;j++) {
      let icon=this.icons [j];
      if (icon.id==anId) {
        return (icon);
      }
    }

    return (null);
  }

  /**
   * 
   */
  setIcons (anAppList) {
    this.icons=anAppList;
    if (this.updateDesktop!=null) {
      this.updateDesktop ();
    }    
  }

  /**
   * 
   */
  disableIcon (anId,aValue) {
    for (let j=0;j<this.icons.length;j++) {
      let icon=this.icons [j];
      if (icon.id==anId) {
        icon.disabled=aValue;
      }
    }
  }

  /**
   * 
   */
  setUpdateDesktop (anUpdater) {
    this.updateDesktop=anUpdater;
  }
}

export default DesktopIconManager;
