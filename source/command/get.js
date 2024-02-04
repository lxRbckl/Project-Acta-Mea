// import <
const set = require('./set.js');

// >


class get extends set {

   constructor() {super();}


   context(nodes) {

      return {

         type : 1,
         name : 'get',
         description : 'Get the properties of an existing node.',
         options : [

            // node <
            {

               type : 3,
               choices : nodes,
               required : true,
               name : 'existing',
               value : 'existing',
               description : 'node'

            }

            // >

         ]

      };
      
   }


   run({pExistingNode}) {

      // if (existing node) <
      // else (then unavailable) <
      if (pExistingNode) {



      }
      else {return false;}

      // >

   }
   
}


// export <
module.exports = get;

// >