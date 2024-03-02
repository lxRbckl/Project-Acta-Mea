// imports <
const set = require('./set.js');

// >


class del extends set {

   constructor(objDatabase) {
      
      super(objDatabase);
      this.database = objDatabase;

   }


   context(pChoices) {

      return {

         type : 1,
         name : 'del',
         description : 'description',
         options : [

            {

               type : 3,
               name : 'uid',
               value : 'uid',
               required : true,
               choices : pChoices,
               description : 'description'

            },
            {

               type : 3,
               name : 'property',
               value : 'property',
               description : 'description',
               choices : this.getPropertyChoices()

            },
            {

               type : 3,
               name : 'service',
               value : 'service',
               description : 'description'

            }

         ]

      }

   }


   async run({

      pUID,
      pData,
      pService,
      pProperty

   }) {

      // if (no property specified) <
      // else (then erase whole node) <
      if (!pProperty) {delete pData['host'][pUID];}
      else {
         
         let service = pData['host'][pUID]['service'];
         service = service.filter(i => i != pService);

         pData['host'][pUID][pProperty] = {

            'service' : service,
            'isHost' : this.properties[pProperty],
            'status' : this.properties[pProperty],
            'isSwarm' : this.properties[pProperty]

         }[pProperty];

      }

      // >

      await this.database.updateData(pData);

   }

}


// exports <
module.exports = del;

// >