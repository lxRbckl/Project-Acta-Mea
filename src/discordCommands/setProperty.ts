// import <
import getNode from './getNode';
import dataManager from '../managers/dataManager';

// >


export default class setProperty extends getNode {


   constructor() {

      super();

      this.name = 'set-property';
      this.description = 'change property of existing node';

   }


   context(): any {

      return {


         
      };

   }


   run(dataHandler: dataManager): any {



   }

}