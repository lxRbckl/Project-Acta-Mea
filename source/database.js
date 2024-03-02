// import <
const {Octokit} = require('@octokit/rest');
const {

   githubGet,
   githubUpdate

} = require('lxrbckl');

// >


class database {

   constructor(pToken) {

      this.token = pToken;
      this.owner = process.env.owner;
      this.branch = process.env.branch;
      this.filepath = process.env.filepath;
      this.repository = process.env.repository;

      this.octokit = new Octokit({auth : this.token});

   }


   async getData() {

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


   async updateData(pData) {

      return await githubUpdate({

         pData : pData,
         pOwner : this.owner,
         opShowError : false,
         pPath : this.filepath,
         pGithub : this.octokit,
         opBranch : this.branch,
         opErrorMessage : false,
         pRepository : this.repository

      });

   }


   async isNode(pNode) {

      // try (if nodes) <
      // except (then new) <
      try {

         let nodes = await this.getData();
         let uids = Object.keys(nodes['host']);

         return uids.includes(pNode);
      
      } catch (error) {return false;}

      // >

   }


   async getNodesChoices() {

      // try (if nodes) <
      // except (then new) <
      try {

         let nodes = await this.getData();
         let uids = Object.keys(nodes['host']);

         return uids.map(i => {

            return {

               name : i,
               value : i

            };

         });

      } catch (error) {return [];}

      // >

   }

}


// exports <
module.exports = database;

// >