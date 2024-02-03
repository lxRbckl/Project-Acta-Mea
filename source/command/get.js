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
               description : 'existing node'

            }

            // >

         ]

      };
      
   }
   
}


// export <
module.exports = get;

// >