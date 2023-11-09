// import <
const {Octokit} = require('@octokit/rest');
const {

   githubGet,
   githubUpdate

} = require('lxrbckl');
const {

   Client,
   Routes,
   IntentsBitField

} = require('discord.js');

// >


// initialization <
const owner = 'lxRbckl';
const path = 'data.json';
const branch = 'Project-Acta-Mea-5';
const repository = 'Project-Acta-Mea';

const guildId = '768020237139705857';
const clientId = '947775678584082453';
const channelId = '1129843141101498378';
const applicationId = '947775678584082453';

const tokenGitHub = '';
const tokenDiscord = '';

const octokit = new Octokit({auth : tokenGithub})
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


// function <
async function update(pData) {

   githubUpdate({

      pPath : path,
      pOwner : owner,
      pBranch : branch,
      pContent : pData,
      pGithub : octokit,
      pRepository : repository,

   });

}

async function run() {client.login(token);}

// >


// listener <
client.on('interactionCreate', async (interaction) => {

   // try (if ) <
   // except (then ) <
   try {



   } catch (error) {}

   // >

});

// >


// export <
module.exports({run});

// >