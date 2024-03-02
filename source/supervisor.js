// import <
const dockerode = require('dockerode');

const set = require('./command/set.js');

// >


class supervisor {

   constructor() {

      this.set = new set();
      this.dockerode = new dockerode({

         port : process.env.port,
         host : process.env.hostIP

      });

   }


   async getNodes() {

      let rData = {};
      let nodes = await this.dockerode.listNodes();
      for (const i of nodes) {

         rData[i.ID] = {...this.set.properties};

         rData[i.ID]['isSwarm'] = true;
         rData[i.ID]['status'] = i.Status.State;
         rData[i.ID]['hostname'] = i.Description.Hostname;

      }

      return rData;

   }


   async getServices(pData) {

      let tasks = await this.dockerode.listTasks();
      tasks.map(i => {

         if (i.DesiredState == 'running') {

            let project = (i.Spec.ContainerSpec.Image).split(':')[0];
            pData[i.NodeID]['service'] = [
               
               project.split('/')[1],
               ...pData[i.NodeID]['service']
               
            ]

         }

      });

      return pData;

   }


   async run(objDatabase) {

      let data = await objDatabase.getData();
      let x = await this.getNodes();
      x = await this.getServices(x);
      data['swarm'] = x;
      
      return {

         // if (success) <
         // if (failure) <
         undefined : 'File updated.',
         false : 'File failed to update.'

         // >

      }[await objDatabase.updateData(data)];

   }

}


// exports <
module.exports = supervisor;

// >