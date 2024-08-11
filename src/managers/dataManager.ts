// import <

import { octokit } from 'lxrbckl';
import Dockerode from 'dockerode';

import dataConfig from '../configs/dataManagerConfig';
import { 
   
   Swarm,
   Archive

} from '../typings/dataManager';

// >


export default class dataManager {


   private _dockerode: any;
   private _octokit: octokit;
   private _archive: Archive;


   constructor() {

      this._archive = [];

      this._dockerode = new Dockerode({

         port : dataConfig.port,
         host : dataConfig.host

      });

      this._octokit = new octokit({

         owner : dataConfig.octokitOwner,
         token : dataConfig.octokitToken

      });

   }


   async getArchive(): Promise<any> {

      return await this._octokit.repositoryGet({

         file : dataConfig.octokitFile,
         branch : dataConfig.octokitBranch,
         repository : dataConfig.octokitRepository

      });

   }


   async setArchive(): Promise<void> {

      await this._octokit.respositorySet({

         data : this._archive,
         file : dataConfig.octokitFile,
         branch : dataConfig.octokitBranch,
         repository : dataConfig.octokitRepository

      });

   }


   async getDockerSwarm(): Promise<Swarm> {

      var swarm: Swarm = {};

      try {

         // iterate (docker swarm) <
         for (const n of await this._dockerode.listNodes()) {

            swarm[n.ID] = {

               'services' : [],
               'state' : n.Status.State,
               'name' : n.Description.Hostname,
               'os' : n.Description.Platform.OS

            };

         }

         // >

         // iterate (tasks running) <
         for (const t of await this._dockerode.listTasks()) {

            let service: string = '';
            service = t.Spec.ContainerSpec.Image;
            service = service.split('/')[1].split(':')[0];

            swarm[t.NodeID]['services'].push(service.replace('-', ' '));

         }

         // >

         return swarm;

      } catch (error) {return swarm;}
      
   }


}