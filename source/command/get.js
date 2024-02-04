class get {

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


   run({
      
      pData,
      pExistingNode
   
   }) {

      // if (existing node) <
      // else (then not allowed) <
      if (pExistingNode) {
         
         return JSON.stringify(
            
            pData[pExistingNode], 
            null, 
            3
            
         );
      
      }
      else {return false;}

      // >

   }
   
}


// export <
module.exports = get;

// >