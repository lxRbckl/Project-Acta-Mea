// import <
import getNode from './getNode';
import { SetProperty } from '../typings/discordManager';

// >


export default class setProperty extends getNode {


   public properties: string[];


   constructor() {

      super();

      this.name = 'set-property';
      this.description = 'change property of existing node';

      this.properties = [

         'os',
         'status',
         'services'

      ];

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
               description : 'property of node',
               choices : this.properties.map(p => (

                  {

                     name : p,
                     value : p

                  }

               ))

            }

         ]
         
      };

   }


   run({

      name,
      service,
      property,
      dataHandler

   }: SetProperty): any {



   }

}