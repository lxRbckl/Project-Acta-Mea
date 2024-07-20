// import <

import Dockerode from 'dockerode';
import dataConfig from '../configs/dataManagerConfig';
import { 
   
   Swarm,
   Archive,

} from '../typings/dataManager';

// >


export default class dataManager {


   private dockerode: any;
   private archive: Archive;


   constructor() {

      this.archive = [];
      this.dockerode = new Dockerode({

         port : dataConfig.port,
         host : dataConfig.host

      });

   }


   async getDockerSwarm(): Promise<Swarm> {

      var swarm: Swarm = {};

      // iterate (docker swarm) <
      for (const n of await this.dockerode.listNodes()) {

         swarm[n.ID] = {

            'services' : [],
            'state' : n.Status.State,
            'name' : n.Description.Hostname,
            'os' : n.Description.Platform.OS

         };

      }

      // >

      // iterate (tasks running) <
      for (const t of await this.dockerode.listTasks()) {

         let service: string = '';
         service = t.Spec.ContainerSpec.Image;
         service = service.split('/')[1].split(':')[0];

         swarm[t.NodeID]['services'].push(service.replace('-', ' '));

      }

      // >

      return swarm;
      
   }


}