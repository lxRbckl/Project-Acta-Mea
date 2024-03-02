class get {

   constructor(objDatabase) {this.database = objDatabase;}


   context(pChoices) {

      return {

         type : 1,
         name : 'get',
         description : 'description',
         options : [

            {

               type : 3,
               name : 'uid',
               value : 'uid',
               choices : pChoices,
               description : 'description'

            }

         ]

      }

   }


   async run({
      
      pUID,
      pData
   
   }) {

      return ('```json\n' + {

         false : () => {return JSON.stringify(
            
            pData['host'][pUID], 
            null, 
            3
            
         )},
         true : () => {return JSON.stringify(
            
            Object.keys(pData['host']),
            null,
            3
         
         );}

      }[!pUID]() + '```');

   }

}


// exports <
module.exports = get;

// >