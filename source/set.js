// import <
const {getNodes} = require('./octokit.js');

// >


class set {

   node = {

      ssh : undefined,
      service : undefined,
      description : undefined

   };

   // constructor(

   //    ssh = undefined,
   //    id = undefined,
   //    service = undefined,
   //    description = undefined

   // ) {

   //    if (id) {

   //       const nodes = getNodes();
   //       const keys = Object.keys(nodes);

   //       if (!(id in keys)) {nodes[id] = node;}

   //       console.log('nodes', nodes);

   //    }

   // }

   async getCommand() {

      return {

         type : 1,
         name : 'set',
         description : 'description',
         options : [

            // id <
            // (ssh, service, description) <
            {

               type : 3,
               name : 't34',
               required : true,
               description : 'description',
               // choices : Object.keys(await getNodes()).map(i => {

               //    return {

               //       'id' : i,
               //       'value' : i

               //    };

               // })

            },
            {

               type : 3,
               name : 'b',
               description : 'description'

            }

            // >

         ]

      }
   
   }

}


// export <
module.exports = set;

// >