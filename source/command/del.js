// import <
const set = require('./set.js');

// >


class del extends set {

   constructor() {super();}


   context(nodes) {

      return {

         type : 1,
         name : 'del',
         description : 'Remove existing node or property.',
         options : [

            // node <
            // property <
            // user input <
            {

               type : 3,
               choices : nodes,
               required : true,
               name : 'existing',
               value : 'existing',
               description : 'existing node'

            },
            {

               type : 3,
               name : 'property',
               value : 'property',
               description : 'node required',
               choices : super.getProperties()

            },
            {

               type : 3,
               name : 'input',
               value : 'input',
               description : 'property required'

            }

            // >

         ]

      };

   }
   
}


// export <
module.exports = del;

// >