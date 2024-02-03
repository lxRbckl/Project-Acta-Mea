// import <


// >


class restart {

   context() {

      return {

         type : 1,
         name : 'restart',
         description : 'Restart the application and reload the data.'

      };

   }

   
   run() {process.exit(0);}

   
}


// export <
module.exports = restart;

// >