class set {

   constructor(objDatabase) {

      this.database = objDatabase;
      this.properties = {

         'service' : [],
         'status' : false,
         'isHost' : false,
         'isSwarm' : false

      };

   }


   getPropertyChoices() {

      return (Object.keys(this.properties)).map(i => {

         return {

            name : i,
            value : i

         };

         // >

      });

   }


   context() {

      return {

         type : 1,
         name : 'set',
         description : 'description',
         options : [

            // uid <
            // status <
            // service <
            {

               type : 3,
               name : 'uid',
               value : 'uid',
               required : true,
               description : 'description'

            },
            {

               type : 3,
               name : 'status',
               value : 'status',
               description : 'description',
               choices : [

                  {

                     name : 'true',
                     value : 'true'
         
                  },
                  {
         
                     name : 'false',
                     value : 'false'
         
                  }

               ]

            },
            {

               type : 3,
               name : 'service',
               value : 'service',
               description : 'description'

            }

            // >

         ]

      }

   }


   async run({

      pUID,
      pData,
      pStatus,
      pService

   }) {

      // if (new node) <
      // else (then existing node) <
      if (!(await this.database.isNode(pUID))) {

         pData['host'][pUID] = {

            'isHost' : true,
            'isSwarm' : false,
            'status' : Boolean(pStatus) || this.properties['status'],
            'service' : pService ? [pService] : this.properties['service']

         };

      }
      else {

         let current = pData['host'][pUID];
         let service = [...current['service'], pService];

         pData['host'][pUID]['service'] = pService ? service : current['service'];
         pData['host'][pUID]['status'] = {

            'true' : true,
            'false' : false,
            undefined : current['status']

         }[pStatus];
         

      }

      // >

      await this.database.updateData(pData);

   }

}


// exports <
module.exports = set;

// >