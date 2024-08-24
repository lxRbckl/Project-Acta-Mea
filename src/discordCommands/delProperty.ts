// import <
import { DelProperty } from '../typings/discordManager';
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

   }: DelProperty): Promise<any> {

      dataHandler.delProperty({

         name : name,
         property : property,
         value : value || (service as string)

      });
      await dataHandler.setArchive();

      return `\`\`\`${value} was removed from ${name}\`\`\``;
      
   }

}