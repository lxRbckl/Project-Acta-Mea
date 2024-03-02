// < Project Acta Mea 5 by Alex Arbuckle > //


// import <
const client = require('./source/client.js');
const database = require('./source/database.js');
const supervisor = require('./source/supervisor.js');

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
      objSupervisor : new supervisor(),
      objDatabase : new database(token.octokit)

   }).run();

})();


// export <
module.export = token;

// >