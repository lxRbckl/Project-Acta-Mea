// import <
import { discord } from 'lxrbckl';

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

            new setNode(),
            new getNode(),
            new delNode(),
            // new setProperty(),
            // new delProperty()
            
         ]

      });

   }


   public async run(): Promise<void> {

      // login <
      // register choices <
      // register commands <
      this._discord.login({token : discordConfig.token});
      this._discord.registerCommandChoices();
      this._discord.registerCommands();

      // >

      // listen for interactions <
      this._discord.registerInteractionCreate(async (interaction) => {

         let name: string = interaction.options.get('name')?.value;
         let service: string = interaction.options.get('service')?.value;
         let property: string = interaction.options.get('property')?.value;

         console.log(interaction.commandName);
         
      });

      // >

   }
   
}