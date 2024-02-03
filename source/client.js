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
      this.guildId = '768020237139705857';
      this.channelId = '1199281939547435030';
      this.applicationId = '947775678584082453';

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
         get : new get(),
         del : new del(),
         restart : new restart()

      };

      // >
      
   }


   async run() {

      let nodes = await this.database.getNodes();
      let commands = Object.values(this.commands);

      this.client.login(this.token);
      this.client.rest.put(

         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : commands.map(c => c.context(nodes))}

      );

   }
   
}


// export <
module.exports = client;

// >