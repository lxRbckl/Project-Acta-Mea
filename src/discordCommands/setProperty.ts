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

         'os' : [

            'MacOS',
            'Linux',
            'Ubuntu',
            'Linux, Ubuntu',
            'Raspberry Pi, Linux'

         ],
         'status' : [

            'online',
            'offline'

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
               description : 'an application running on a node'

            },
            {

               type : 3,
               name : 'os',
               required : false,
               description : 'operating system type',
               choices : this.properties['os'].map(i => ({name : i, value : i}))

            },
            {

               type : 3,
               name : 'status',
               required : false,
               description : 'is node running?',
               choices : this.properties['status'].map(i => ({name : i, value : i}))

            }

         ]
         
      };

   }


   async run({

      os,
      name,
      status,
      service,
      dataHandler

   }: PropertyFunction): Promise<any> {

      await dataHandler.setProperty({

         os : os,
         name : name,
         status : status,
         service : service

      });

      return `\`\`\`Property ${os || status || service} was added to node ${name}.\`\`\``;

   }

}