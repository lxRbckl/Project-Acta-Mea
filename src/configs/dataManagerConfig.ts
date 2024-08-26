const dataManagerConfig: {

   port: string,
   host: string,
   
   file: string,
   token: string,
   owner: string,
   branch: string,
   repository: string

} = {

   port : process.env.port!,
   host : process.env.host!,

   file : process.env.file!,
   owner : process.env.owner!,
   branch : process.env.branch!,
   token : process.env.tokenOctokit!,
   repository : process.env.repository!

}


// export <
export default dataManagerConfig;

// >