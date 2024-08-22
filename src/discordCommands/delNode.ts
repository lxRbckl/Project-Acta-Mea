// import <
import getNode from './getNode';
import dataManager from '../managers/dataManager';

// >


export default class delNode extends getNode {


   constructor() {

      super();
      
      this.name = 'del-node';
      this.description = 'delete an existing node';
      
   }


   context(): any {

      return {

         type : 1,
         name : this.name,
         description : this.description,
         options : [

            {

               type : 3,
               name : 'name',
               required : true,
               choices : this.nodeChoices,
               description : 'name of node'

            }

         ]
         
      };

   }


   run(dataHandler: dataManager): any {



   }

}