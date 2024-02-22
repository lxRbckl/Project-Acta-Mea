// import <
const {Octokit} = require('@octokit/rest');
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
      this.owner = process.env.owner;
      this.branch = process.env.branch;
      this.filepath = process.env.filepath;
      this.repository = process.env.repository;

      this.octokit = new Octokit({auth : this.token});

      // >

   }


   async isNewNode(pNode) {

      let nodes = Object.keys(await this.getFile());
      return !(nodes.includes(pNode));

   }


   async getNodes() {

      let nodes = Object.keys(await this.getFile());
      return [

         ...(nodes.map(i => {

            return {

               name : i,
               value : i

            };

         }))

      ];

   }


   async getFile() {

      return await githubGet({

         opParse : true,
         pOwner : this.owner,
         opShowError : false,
         pPath : this.filepath,
         pGithub : this.octokit,
         opBranch : this.branch,
         pRepository : this.repository

      });

   }


   async updateFile(data) {

      // if (valid format) <
      if (data != false) {

         await githubUpdate({

            pData : data,
            pOwner : this.owner,
            opShowError : false,
            pPath : this.filepath,
            pGithub : this.octokit,
            opBranch : this.branch,
            pRepository : this.repository

         });

      }

      // >

   }

}


// export <
module.exports = database;

// >