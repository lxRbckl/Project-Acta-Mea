// import <
import { NodeFunction } from '../typings/discordManager';

// >


export default class setNode {


   public name: string;
   public description: string;
   public requiredOption: boolean;


   constructor() {

      this.name = 'set-node';
      this.requiredOption = true;
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
               description : 'name of node',
               required : this.requiredOption

            }

         ]

      };

   }


   async run({

      name,
      dataHandler

   }: NodeFunction): Promise<string> {

      switch (await dataHandler.setNode({name : name})) {

         case (true): 
         
            return `\`\`\`Node ${name} was created.\`\`\``;
            
         case (false): 
         
            return `\`\`\`Node ${name} already exists.\`\`\``;

      }

   }

}