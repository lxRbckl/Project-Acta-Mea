const dataManagerConfig: {

   port: string,
   host: string,
   
   octokitFile: string,
   octokitOwner: string,
   octokitToken: string,
   octokitBranch: string,
   octokitRepository: string

} = {

   port : process.env.port!,
   host : process.env.host!,

   octokitFile : process.env.file!,
   octokitOwner : process.env.owner!,
   octokitBranch : process.env.branch!,
   octokitToken : process.env.tokenOctokit!,
   octokitRepository : process.env.repository!

}


// export <
export default dataManagerConfig;

// >