// import <
import dataManager from '../managers/dataManager';
import setProperty from '../discordCommands/setProperty';

// >


export default class delProperty extends setProperty {


   constructor() {

      super();

      this.name = 'del-property';
      this.description = 'delete property of existing node';
      
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

            },
            {

               type : 3,
               required : true,
               name : 'property',
               choices : this.properties,
               description : 'property of node'

            }

         ]
         
      };

   }


   run(dataHandler: dataManager): any {


      
   }

}