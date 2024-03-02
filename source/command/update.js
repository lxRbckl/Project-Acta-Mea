class update {

   constructor(
      
      objDatabase,
      objSupervisor
   
   ) {
      
      this.database = objDatabase;
      this.supervisor = objSupervisor;
   
   }


   context() {

      return {

         type : 1,
         name : 'update',
         description : 'description'

      };

   }


   async run() {await this.supervisor.run(this.database);}

}


// exports <
module.exports = update;

// >