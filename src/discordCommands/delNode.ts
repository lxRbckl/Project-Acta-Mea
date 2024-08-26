// import <
import getNode from './getNode';
import { NodeFunction } from '../typings/discordManager';

// >


export default class delNode extends getNode {


   constructor() {

      super();
      
      this.name = 'del-node';
      this.requiredOption = true;
      this.description = 'delete an existing node';
      
   }


   async run({

      name,
      dataHandler

   }: NodeFunction): Promise<any> {

      await dataHandler.delNode({name : name});
      return `\`\`\`Node ${name} was deleted.\`\`\``;
      
   }

}