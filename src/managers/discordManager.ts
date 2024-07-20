// import <
import { discord } from 'lxrbckl';

import discordConfig from '../configs/discordManagerConfig';
import { ConstructorParams } from '../typings/discordManager';

// >


export default class discordManager {


   private _discord: discord;


   constructor() {

      this._discord = new discord({

         guildId : discordConfig.guildId,
         channelId : discordConfig.channelId,
         applicationId : discordConfig.applicationId

      });

   }

   
}