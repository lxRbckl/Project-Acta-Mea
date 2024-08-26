const discordManagerConfig: {

   guildId: string,
   channelId: string,
   discordToken: string,
   applicationId: string

} = {

   guildId : process.env.guildId!,
   channelId : process.env.channelId!,
   discordToken : process.env.tokenDiscord!,
   applicationId : process.env.applicationId!

}


// export <
export default discordManagerConfig;

// >