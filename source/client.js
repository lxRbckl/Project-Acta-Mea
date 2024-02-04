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
      this.guildId = process.env.guildId;
      this.applicationId = process.env.applicationId;

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


   message({

      pResult,
      pObject,
      pNewNode,
      pCommandName,
      pExistingNode

   }) {

      pObject.reply({

         ephemeral : true,
         embeds : [{

            title : pNewNode ? pNewNode : pExistingNode,
            description : {

               // (fail) <
               // (success) <
               true : ':warning: `There was an error.`',
               false : {

                  'get' : '```' + pResult + '```',
                  'set' : ':white_check_mark: `Operation successful.`',
                  'del' : ':white_check_mark: `Operation successful.`'

               }[pCommandName]

               // >

            }[pResult == false]

         }]

      });

   }


   listen() {

      this.client.on('interactionCreate', async (interaction) => {

         // setup <
         // input <
         let data = await this.database.getFile();
         let commandName = interaction.commandName;
         let newNode = interaction.options.get('new')?.value;
         let isNewNode = await this.database.isNewNode(newNode);

         let result = await this.commands[commandName].run({

            pData : data,
            pNewNode : newNode,
            isNewNode : isNewNode,
            pInput : interaction.options.get('input')?.value,
            pProperty : interaction.options.get('property')?.value,
            pExistingNode : interaction.options.get('existing')?.value

         });

         // >

         // if (change) <
         // finally (message) <
         if ((['set', 'del'].includes(commandName)) && (result != data)) {
            
            await this.database.updateFile(result);
         
         }
         
         this.message({

            pResult : result,
            pObject : interaction,
            pCommandName : commandName,
            pNewNode : interaction.options.get('new')?.value,
            pExistingNode : interaction.options.get('existing')?.value

         });

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