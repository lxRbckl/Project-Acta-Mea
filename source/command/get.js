// import <
// const set = require('./set.js');

// >


// class get extends set {
class get {

   constructor(pDatabase) {

      this.database = pDatabase;

   }


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


   run({pExistingNode}) {

      console.log(

         pExistingNode

      );

   }
   
}


// export <
module.exports = get;

// >