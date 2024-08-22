// import <
import getNode from './getNode';
import dataManager from '../managers/dataManager';

// >


export default class delProperty extends getNode {


   constructor() {

      super();

      this.name = 'del-property';
      this.description = 'delete property of existing node';
      
   }


   context(): any {

      return {


         
      };

   }


   run(dataHandler: dataManager): any {


      
   }

}