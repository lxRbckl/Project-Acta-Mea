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

      var bData = {...pData};

      // if (property) <
      // elif (only node) <
      // else (then not allowed) <
      if (pExistingNode && !pProperty) {

         delete bData[pExistingNode];

      }
      else if (pExistingNode && pProperty) {

         bData[pExistingNode][pProperty] = {

            'ssh' : this.properties['ssh'],
            'isDocker' : this.properties['isDocker'],
            'description' : this.properties['description'],
            'isKubernetes' : this.properties['isKubernetes'],
            'server' : bData[pExistingNode]['server'].filter(i => i != pInput)

         }[pProperty];

      }
      else {return false;}

      // >

      return bData;

   }
   
}


// export <
module.exports = del;

// >