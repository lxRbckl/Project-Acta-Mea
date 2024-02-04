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

      pData,
      pInput,
      pProperty,
      pExistingNode

   }) {

      // if (property) <
      // elif (only node) <
      // else (then not allowed) <
      if (pExistingNode && !pProperty) {

         delete pData.pExistingNode;

      }
      else if (pExistingNode && pProperty) {

         pData[pExistingNode][pProperty] = {

            'ssh' : super.properties['ssh'],
            'isDocker' : super.properties['isDocker'],
            'description' : super.properties['description'],
            'isKubernetes' : super.properties['isKubernetes'],
            'server' : pData[pExistingNode]['server'].filter(i => i != pInput)

         };

      }
      else {return false;}

      // >

      return pData;

   }
   
}


// export <
module.exports = del;

// >