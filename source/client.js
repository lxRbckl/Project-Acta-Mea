// import <
const cron = require('node-cron');
const {

   Client,
   Routes,
   IntentsBitField

} = require('discord.js');

const set = require('./command/set.js');
const get = require('./command/get.js');
const del = require('./command/del.js');
const update = require('./command/update.js');
const extract = require('./command/extract.js');
const restart = require('./command/restart.js');

// >


class client {

   constructor({

      pToken,
      objDatabase,
      objSupervisor

   }) {

      this.token = pToken;
      this.database = objDatabase;
      this.supervisor = objSupervisor;
      this.guildId = process.env.guildId
      this.channelId = process.env.channelId
      this.applicationId = process.env.applicationId

      this.commands = {

         'restart' : new restart(),
         'extract' : new extract(),
         'set' : new set(this.database),
         'get' : new get(this.database),
         'del' : new del(this.database),
         'update' : new update(this.database, this.supervisor)

      };

      this.client = new Client({

         rest : {'version' : 10},
         intents : [
      
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
      
         ]

      });

   }


   message(pContent) {

      let channel = this.client.channels.cache.get(this.channelId);
      channel.send('`' + pContent + '`');

   }


   listen() {

      this.client.on('interactionCreate', async (interaction) => {

         let command = this.commands[interaction.commandName];
         let result = await command.run({

            pData : await this.database.getData(),
            
            pUID : interaction.options.get('uid')?.value,
            pEmbed : interaction.options.get('embed')?.value,
            pValue : interaction.options.get('value')?.value,
            pStatus : interaction.options.get('status')?.value,
            pService : interaction.options.get('service')?.value,
            pProperty : interaction.options.get('property')?.value

         });

         interaction.reply({
            
            ephemeral : true, 
            content : result || '`Request Sent`'
         
         });

      });

   }


   schedule() {

      this.client.on('ready', async () => {

         cron.schedule('0 0 * * *', async () => {

            let result = await this.supervisor.run(this.database);
            this.message(result);

         });

      });

   }


   async run() {

      let commands = Object.values(this.commands);
      let nodes = await this.database.getNodesChoices();

      this.client.login(this.token);
      this.client.rest.put(

         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : commands.map(c => c.context(nodes))}

      );

      this.listen();
      this.schedule();

   }

}


// exports <
module.exports = client;

// >