// import <


// >


class set {

   context({data}) {

      return {

         type : 1,
         name : 'set',
         description : 'description',
         options : [

            {

               name : 'new',
               value : 'new'

            },
            ...(data.map(i => {

               return {

                  name : i,
                  value : i

               }

            }))

         ]

      };
      
   }
   
}


// export <
module.exports = set;

// >