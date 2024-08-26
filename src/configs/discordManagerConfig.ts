const discordManagerConfig: {

   token: string,
   guildId: string,
   channelId: string,
   applicationId: string

} = {

   guildId : process.env.guildId!,
   token : process.env.tokenDiscord!,
   channelId : process.env.channelId!,
   applicationId : process.env.applicationId!

}


// export <
export default discordManagerConfig;

// >