// import <
const {

   Client,
   Routes,
   IntentsBitField

} = require('discord.js');

const set = require('./command/set.js');
const get = require('./command/get.js');
const del = require('./command/del.js');
const restart = require('./command/restart.js');

// >


class client {

   constructor({

      pToken,
      pDatabase

   }) {

      // setup <
      // initialize <
      this.token = pToken;
      this.database = pDatabase;

      this.client = new Client({

         rest : {version : '10'},
         intents : [
      
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
      
         ]
      
      });

      // >

      // commands <
      this.commands = {

         set : new set(),
         // get : new get(),
         // del : new del(),
         // restart : new restart()

      };

      // >
      
   }


   async run() {

      let commands = Object.values(this.commands);
      let data = Object.keys(this.database.getFile());

      console.log('data', data); // remove

      this.client.login(this.token);
      this.client.rest.put(

         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : commands.map(c => c.context(data))}

      )

   }
   
}


// export <
module.exports = client;

// >