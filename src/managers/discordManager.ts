// import <
import { discord } from 'lxrbckl';

import restart from '../discordCommands/restart';
import setNode from '../discordCommands/setNode';
import getNode from '../discordCommands/getNode';
import delNode from '../discordCommands/delNode';
import dataHandler from '../managers/dataManager';
import setProperty from '../discordCommands/setProperty';
import delProperty from '../discordCommands/delProperty';

import discordConfig from '../configs/discordManagerConfig';

// >


export default class discordManager {


   private _discord: discord;
   private _dataHandler: dataHandler;


   constructor() {

      this._dataHandler = new dataHandler();
      this._discord = new discord({

         guildId : discordConfig.guildId,
         channelId : discordConfig.channelId,
         applicationId : discordConfig.applicationId,
         commands : [

            new setProperty(),
            new delProperty(),
            new restart(),
            new setNode(),
            new getNode(),
            new delNode()
            
         ]

      });

   }


   async run(): Promise<void> {

      // fetch data <
      await this._dataHandler.getArchive();

      // >

      // login <
      // register choices <
      // register commands <
      // map registered commands <
      this._discord.login({token : discordConfig.token});
      await this._discord.registerCommandChoices();
      this._discord.registerCommands();
      this._discord.mapCommands();

      // >

      // listen for interactions <
      this._discord.registerInteractionCreate(async (interaction) => {

         await interaction.reply({

            ephemeral : true,
            content : await this._discord.mappedCommands[interaction.commandName].run({

               dataHandler : this._dataHandler,
               os : interaction.options.get('os')?.value,
               name : interaction.options.get('name')?.value,
               status : interaction.options.get('status')?.value,
               service : interaction.options.get('service')?.value,
               hardware : interaction.options.get('hardware')?.value

            })

         });
         
      });

      // >

   }
   
}