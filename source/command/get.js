// import <
// const set = require('./set.js');

// >


// class get extends set {
class get {

   // constructor() {super();}


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


   run() {



   }
   
}


// export <
module.exports = get;

// >