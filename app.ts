// < Project Acta Mea by Alex Arbuckle > //


// import <
import dataManager from './src/managers/dataManager';
import discordManager from './src/managers/discordManager';

// >


(async () => {

   const dataHandler: dataManager = new dataManager();
   // const discordHandler: discordManager = new discordManager();

   const x: any = await dataHandler.getDockerSwarm();
   console.log(x);

})();