// import <

import { octokit } from 'lxrbckl';
import Dockerode from 'dockerode';

import { 
   
   node,
   Swarm,
   Archive,
   nodeArray,
   nodeString

} from '../typings/dataManager';
import dataConfig from '../configs/dataManagerConfig';

// >


export default class dataManager {


   private _dockerode: any;
   private _archive: Archive;
   private _octokit: octokit;
   private _arrayProperties: string[];


   constructor() {

      this._archive = {};
      this._arrayProperties = ['services'];

      this._dockerode = new Dockerode({

         port : dataConfig.port,
         host : dataConfig.host

      });

      this._octokit = new octokit({

         owner : dataConfig.octokitOwner,
         token : dataConfig.octokitToken

      });

   }


   // async getArchive(): Promise<Archive> {

   //    return await this._octokit.repositoryGet({

   //       file : dataConfig.octokitFile,
   //       branch : dataConfig.octokitBranch,
   //       repository : dataConfig.octokitRepository

   //    });

   // }


   // async setArchive(): Promise<void> {

   //    await this._octokit.respositorySet({

   //       data : this._archive,
   //       file : dataConfig.octokitFile,
   //       branch : dataConfig.octokitBranch,
   //       repository : dataConfig.octokitRepository

   //    });

   // }


   async getDockerSwarm(): Promise<Swarm> {

      var swarm: Swarm = {};

      try {

         // iterate (docker swarm) <
         for (const n of await this._dockerode.listNodes()) {

            swarm[n.ID] = {

               'services' : [],
               'type' : 'swarm',
               'status' : n.Status.State,
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


   async setNode(name: string): Promise<boolean> {

      switch (!(Object.keys(this._archive)).includes(name)) {

         case (true):

            this._archive[name] = {

               'os' : '',
               'type' : 'host',
               'services' : [],
               'status' : 'online'

            };

            return true;

         case (false): return false;

      }

   }


   async getNode(name: string): Promise<node> {return this._archive[name];}


   async delNode(name: string): Promise<void> {delete this._archive[name];}


   async setProperty(
      
      name: string,
      value: string,
      property: string
   
   ): Promise<void> {

      switch (this._arrayProperties.includes(property)) {

         case (false):

            this._archive[name][(property as nodeString)] = value;
            break;

         case (true):

            this._archive[name][(property as nodeArray)].push(value);
            break;

      }

   }


   // async delProperty(
      
   //    name: string,
   //    value: string,
   //    property: string
   
   // ): Promise<void> {

   //    switch (this._arrayProperties.includes(property)) {

   //       case (true):

   //          let services: string[] = this._archive[name][(property as nodeArray)];
   //          this._archive[name][(property as nodeArray)] = services.filter(i => i != value);
   //          break;

   //       case (false):


   //          break;

   //    }

   // }

}