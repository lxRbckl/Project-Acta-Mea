// import <


// >


class set {

   constructor() {

      this.properties = {

         'ssh' : '',
         'server' : [],
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


   async run({

      pData,
      pInput,
      pNewNode,
      isNewNode,
      pProperty,
      pExistingNode

   }) {

      // if (new node) <
      // elif (existing node) <
      // else (then not allowed) <
      if (isNewNode && pNewNode && !pProperty) {

         pData[pNewNode] = this.properties;

      }
      else if (pExistingNode && pProperty) {

         pData[pExistingNode][pProperty] = {

            'ssh' : pInput,
            'description' : pInput,
            'isDocker' : Boolean(pInput),
            'isKubernetes' : Boolean(pInput),
            'server' : pData[pExistingNode]['server'].concat(pInput)

         }[pProperty];

      }
      else {return false;}

      // >

      return pData;

   }
   
}


// export <
module.exports = set;

// >