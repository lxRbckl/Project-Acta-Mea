// import <
const {Octokit} = require('@octokit/rest');
const {

   githubGet,
   githubUpdate

} = require('lxrbckl');

// >


// variable <
const gOwner = 'lxRbckl';
const gPath = 'data.json';
const gBranch = 'Project-Acta-Mea-5';
const gRepository = 'Project-Acta-Mea';

const token = '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';

// >

// object <
const octokit = new Octokit({auth : token});

// >


// function <
async function getNodes(

   pErrorMessage = 'Could not retrieve data'

) {

   // try (if ) <
   // except (then ) <
   try {

      return JSON.parse(await githubGet({

         pPath : gPath,
         pOwner : gOwner,
         pGithub : octokit,
         opBranch : gBranch,
         pRepository : gRepository

      }));

   } catch (error) {return pErrorMessage}

   // >

}


async function setNodes({

   pData,
   pErrorMessage = 'Could not update data.'

}) {

   // try (if ) <
   // except (then ) <
   try {

      await githubUpdate({

         pPath : gPath,
         pOwner : gOwner,
         pContent : pData,
         pGithub : octokit,
         opBranch : gBranch,
         pRepository : gRepository

      });

   } catch (error) {return pErrorMessage;}

   // >

}

// >


// export <
module.exports = {

   getNodes,
   setNodes

}

// >