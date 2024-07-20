// < Project Acta Mea by Alex Arbuckle > //


// import <
import dataManager from './src/managers/dataManager';
import discordManager from './src/managers/discordManager';

// >


(async () => {

   // const discordHandler: discordManager = new discordManager();
   const dataHandler: dataManager = new dataManager();
   console.log(await dataHandler.getDockerSwarm());

})();