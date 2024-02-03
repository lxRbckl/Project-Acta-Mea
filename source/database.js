// import <
const {Octokit} = require('@Octokit/rest');
const {

   githubGet,
   githubUpdate

} = require('lxrbckl');

// >


class database {

   constructor(pToken) {

      // setup <
      // initialize <
      this.token = pToken;
      this.owner = 'lxRbckl'; // process.env.owner;
      this.branch = 'Project-Acta-Mea-6'; // process.env.branch;
      this.filepath = 'data.json'; // process.env.filepath;
      this.repository = 'Project-Acta-Mea'; // process.env.repository;

      this.octokit = new Octokit({auth : this.token});

      // >

   }


   async getFile() {

      return await githubGet({

         pOwner : this.owner,
         opShowError : false,
         pPath : this.filepath,
         pGithub : this.octokit,
         opBranch : this.branch,
         pRepository : this.repository

      });

   }


   async updateFile(data) {

      let result = await githubUpdate({

         pData : data,
         pOwner : this.owner,
         opShowError : true,
         pPath : this.filepath,
         pGithub : this.octokit,
         opBranch : this.branch,
         pRepository : this.repository

      });

      return (result == undefined);

   }

}


// export <
module.exports = database;

// >