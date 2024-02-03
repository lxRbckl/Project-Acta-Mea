// import <
const set = require('./set.js');

// >


class del extends set {

   constructor(pDatabase) {
      
      super(pDatabase);
      this.database = pDatabase;
   
   }


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
               description : 'node'

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


   run({

      pInput,
      pProperty,
      pExistingNode

   }) {

      //

   }
   
}


// export <
module.exports = del;

// >