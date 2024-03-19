class extract {

   constructor() {

      this.find = '.jpg';
      this.part = 'src=';
      this.delimeter = ' ';

   }


   context() {

      return {

         type : 1,
         name : 'extract',
         description : 'get img src from Flickr hosted images',
         options : [

            {

               type : 3,
               name : 'embed',
               value : 'embed',
               required : true,
               description : 'embed of image'

            }

         ]

      }

   }


   async run({pEmbed}) {

      var rValue = 'DNE';
      for (const i of pEmbed.split(this.delimeter)) {

         if (i.includes(this.find)) {

            rValue = i.split(this.part)[1]

         }

      }

      return rValue;

   }

}


// export <
module.exports = extract;

// >