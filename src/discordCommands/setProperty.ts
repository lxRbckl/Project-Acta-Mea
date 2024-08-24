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

            },
            {

               type : 3,
               name : 'value',
               required : true,
               description : 'value of property'

            }

         ]
         
      };

   }


   async run({

      name,
      value,
      service,
      property,
      dataHandler

   }: SetProperty): Promise<any> {

      dataHandler.setProperty({

         name : name,
         value : value,
         property : property || (service as string)

      });
      await dataHandler.setArchive();

      return `\`\`\`${value} was applied to ${name}->${property}\`\`\``;

   }

}