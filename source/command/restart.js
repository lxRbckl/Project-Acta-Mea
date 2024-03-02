// import <


// >


class restart {

   context() {

      return {

         type : 1,
         name : 'restart',
         description : 'description'

      };

   }

   
   run() {process.exit(0);}

   
}


// export <
module.exports = restart;

// >