// import <
import setNode from './setNode';
import dataManager from '../managers/dataManager';
import { NodeFunction, NodeChoices } from '../typings/discordManager';

// >


export default class getNode extends setNode {


   public nodeChoices: NodeChoices;
   public dataHandler: dataManager;


   constructor() {

      super();

      this.nodeChoices = [];
      this.dataHandler = new dataManager();

      this.name = 'get-node';
      this.requiredOption = false;
      this.description = 'fetch an existing node';

   }


   async registerChoices(): Promise<void> {

      var nodes: string[] = [];
      nodes = Object.keys(await this.dataHandler.getArchive());

      this.nodeChoices = nodes.map(n => (

         {

            name : n,
            value : n

         }

      ));
      
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
               choices : this.nodeChoices,
               description : 'name of node',
               required : this.requiredOption

            }

         ]

      };

   }


   async run({

      name,
      dataHandler

   }: NodeFunction): Promise<any> {

      const result: String = dataHandler.getNode({name : name});
      var output: string = name ? `\`\`\`${name}\`\`\`` : '';
      output += `\`\`\`json\n${result}\`\`\``;

      return output;
      
   }

}