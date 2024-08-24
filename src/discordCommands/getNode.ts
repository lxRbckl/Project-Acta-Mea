// import <
import setNode from './setNode';
import dataManager from '../managers/dataManager';
import { GetNode, NodeChoices } from '../typings/discordManager';

// >


export default class getNode extends setNode {


   public nodeChoices: NodeChoices;
   public dataHandler: dataManager;


   constructor() {

      super();

      this.nodeChoices = [];
      this.dataHandler = new dataManager();

      this.name = 'get-node';
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
               required : true,
               choices : this.nodeChoices,
               description : 'name of node'

            }

         ]

      };

   }


   async run({

      name,
      dataHandler

   }: GetNode): Promise<any> {

      const node: string = JSON.stringify(

         dataHandler.getNode({name : name}),
         null,
         3

      );

      return `\`\`\`json\n${node}\`\`\``;
      
   }

}