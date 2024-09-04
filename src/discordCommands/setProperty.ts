// import <
import getNode from './getNode';
import { PropertyFunction } from '../typings/discordManager';

// >


export default class setProperty extends getNode {


   public properties: {[key: string]: string[]};


   constructor() {

      super();

      this.name = 'set-property';
      this.description = 'change property of existing node';

      this.properties = {

         'hardware' : [

            'Raspberry Pi',
            'Apple'

         ],
         'os' : [

            'Ubuntu',
            'Raspbian'

         ],
         'status' : [

            'down',
            'ready',

         ]

      };

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
               name : 'service',
               required : false,
               description : 'add application/container running on node'

            },
            {

               type : 3,
               name : 'os',
               required : false,
               description : 'change operating system type',
               choices : this.properties['os'].map(i => ({name : i, value : i}))

            },
            {

               type : 3,
               name : 'status',
               required : false,
               description : 'change running status',
               choices : this.properties['status'].map(i => ({name : i, value : i}))

            },
            {

               type : 3,
               required : false,
               name : 'hardware',
               description : 'computer component made by',
               choices : this.properties['hardware'].map(i => ({name : i, value : i}))

            }

         ]
         
      };

   }


   async run({

      os,
      name,
      status,
      service,
      hardware,
      dataHandler

   }: PropertyFunction): Promise<any> {

      await dataHandler.setProperty({

         os : os,
         name : name,
         status : status,
         service : service,
         hardware : hardware

      });

      return `\`\`\`Property ${os || status || service || hardware} was added to node ${name}.\`\`\``;

   }

}