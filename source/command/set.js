// import <


// >


class set {

   constructor() {

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
               description : 'new node'

            },
            {

               type : 3,
               choices : nodes,
               name : 'existing',
               value : 'existing',
               description : 'existing node'

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
   
}


// export <
module.exports = set;

// >