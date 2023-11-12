// import <
const set = require('./set.js');
const {

   Client,
   Routes,
   IntentsBitField

} = require('discord.js');

// >


// variable <
const guildId = '768020237139705857';
const clientId = '947775678584082453';
const channelId = '1129843141101498378';
const applicationId = '947775678584082453';

const token = '';

// >


// object <
const client = new Client({

   rest : {version : '10'},
   intents : [

      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent

   ]

});

// >


// // function <
// async function message() {



// }


// // >


// listener <
client.on('ready', async () => {

   client.rest.put(

      Routes.applicationGuildCommands(

         applicationId,
         guildId

      ),
      {body : [

         sets.get

      ]}

   );

});

client.on('interactionCreate', async (interaction) => {

   const output = await new {

      'set' : set,

   }[interaction.commandName](

      ssh = interaction.options.get('ssh')?.value,
      name = interaction.options.get('name')?.value,
      service = interaction.options.get('service')?.value,
      description = interaction.options.get('description')?.value

   );

});

// >


// export <
module.exports = {
   
   token, 
   client

};

// >