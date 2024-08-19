// import <
import { discord } from 'lxrbckl';

import discordConfig from '../configs/discordManagerConfig';
// import {  } from '../typings/discordManager';

import setNode from '../discordCommands/setNode';
import getNode from '../discordCommands/getNode';
import delNode from '../discordCommands/delNode';
import setProperty from '../discordCommands/setProperty';
import delPropertyServices from '../discordCommands/delPropertyServices'

// >


export default class discordManager {


   private _discord: discord;
   private _commands: {

      'setNode': setNode,
      // 'getNode': getNode,
      // 'delNode': delNode,
      // 'setProperty': setProperty,
      // 'delPropertyServices': delPropertyServices

   };


   constructor() {

      this._discord = new discord({

         guildId : discordConfig.guildId,
         channelId : discordConfig.channelId,
         applicationId : discordConfig.applicationId

      });

      this._commands = {

         'setNode' : new setNode()
         // 'getNode' : new getNode(),
         // 'delNode' : new delNode(),
         // 'setProperty' : new setProperty(),
         // 'delPropertyServices' : new delPropertyServices()

      };

      // login <
      // register commands <
      this._discord.login({token : discordConfig.token});
      this._discord.registerCommands({commands : Object.values(this._commands)});

      // >

      // listen for interactions <
      this._discord.registerInteractionCreate(async (interaction) => {

         console.log(interaction.type);

      });

      // >

   }


   public run(): void {this._discord.login({token : discordConfig.token});}
   
}