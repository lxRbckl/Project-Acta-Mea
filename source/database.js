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
      this.branch = 'Project-Acta-Mea-5'; // process.env.branch;
      this.filepath = 'data.json'; // process.env.filepath;
      this.repository = 'Project-Acta-Mea'; // process.env.repository;

      this.octokit = new Octokit({auth : this.token});

      // >

   }


   async isNewNode(pNode) {

      let nodes = Object.keys(await this.getFile());
      return nodes.includes(pNode);

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