// < Project Acta Mea 6 by Alex Arbuckle > //


// import <
const client = require('./source/client.js');
const database = require('./source/database.js');

// >


// objects <
const token = {

   octokit : process.env.tokenOctokit,
   discord : process.env.tokenDiscord

};

// >


(async () => {

   await new client({

      pToken : token.discord,
      pDatabase : new database(token.octokit)

   }).run();

})();


// export <
module.export = token;

// >