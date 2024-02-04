// import <


// >


class set {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.properties = {

         'ssh' : '',
         'services' : [],
         'isDocker' : false,
         'description' : '',
         'isKubernetes' : false

      };

   }


   getProperties() {

      return [

         ...(Object.keys(this.properties).map(i => {

            return {

               name : i,
               value : i

            };

         }))

      ];

   }


   context(nodes) {

      return {

         type : 1,
         name : 'set',
         description : 'Add/update a node or update a property.',
         options : [

            // node <
            // property <
            // user input <
            {
               
               type : 3,
               name : 'new',
               value : 'new',
               description : 'node'

            },
            {

               type : 3,
               choices : nodes,
               name : 'existing',
               value : 'existing',
               description : 'node'

            },
            {

               type : 3,
               name : 'property',
               value : 'property',
               description : 'node required',
               choices : this.getProperties()

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
      pNewNode,
      pProperty,
      pExistingNode

   }) {

      // if (new node) <
      // elif (existing node) <
      // else (then unavailable) <
      if (pNewNode && !pProperty) {



      }
      else if (pExistingNode && pProperty) {



      }
      else {return false;}

      // >

   }
   
}


// export <
module.exports = set;

// >