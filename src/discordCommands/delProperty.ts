// import <
import setProperty from '../discordCommands/setProperty';
import { PropertyFunction } from '../typings/discordManager';

// >


export default class delProperty extends setProperty {


   constructor() {

      super();

      this.name = 'del-property';
      this.description = 'delete property of existing node';
      
   }


   async run({

      os,
      name,
      status,
      service,
      hardware,
      dataHandler

   }: PropertyFunction): Promise<any> {

      await dataHandler.delProperty({

         os : os,
         name : name,
         status : status,
         service : service,
         hardware : hardware

      });

      return `\`\`\`Property ${os || status || service} was deleted from node ${name}.\`\`\``;
      
   }

}