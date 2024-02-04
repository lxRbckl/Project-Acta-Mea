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
      this.guildId = '768020237139705857'; // process.env.guildId;
      this.channelId = '1199281939547435030'; // process.env.channelId;
      this.applicationId = '947775678584082453'; // process.env.applicationId;

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

         'set' : new set(),
         'get' : new get(),
         'del' : new del(),
         'restart' : new restart()

      };

      // >
      
   }


   message(result) {

      this.client.channels.cache.get(this.channelId).send({content : result});

   }


   listen() {

      this.client.on('interactionCreate', async (interaction) => {

         // setup <
         // input <
         let data = await this.database.getFile();
         let newNode = interaction.options.get('new')?.value;
         let isNewNode = await this.database.isNewNode(newNode);

         let result = await this.commands[interaction.commandName].run({

            pData : data,
            pNewNode : newNode,
            isNewNode : isNewNode,
            pInput : interaction.options.get('input')?.value,
            pProperty : interaction.options.get('property')?.value,
            pExistingNode : interaction.options.get('existing')?.value

         });

         // >
         
         // output <
         await {

            'get' : this.message,
            'set' : this.database.updateFile,
            'del' : this.database.updateFile

         }[interaction.commandName](result);

         // >

      });

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

      this.listen();

   }
   
}


// export <
module.exports = client;

// >