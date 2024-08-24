// import <
import restart from '../discordCommands/restart';
import { SetNode } from '../typings/discordManager';

// >


export default class setNode {


   public name: string;
   public description: string;


   constructor() {

      this.name = 'set-node';
      this.description = 'create a new node';
      
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
               description : 'name of node'

            }

         ]

      };

   }


   async run({

      name,
      dataHandler

   }: SetNode): Promise<string> {

      switch (dataHandler.setNode({name : name})) {

         case (true): 
         
            await dataHandler.setArchive();
            return `\`\`\`${name} was created.\`\`\``;
            
         case (false): 
         
            return `\`\`\`${name} already exists.\`\`\``;

      }

   }

}