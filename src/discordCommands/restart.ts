// import <


// >


export default class restart {


   private _name: string;
   private _description: string;


   constructor() {

      this._name = 'restart';
      this._description = 'update bot and data';

   }


   context(): any {

      return {

         type : 1,
         name : this._name,
         description : this._description
         
      };

   }


   run(): any {



   }

}