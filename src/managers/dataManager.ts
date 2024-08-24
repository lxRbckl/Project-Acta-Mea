// import <
import Dockerode from 'dockerode';
import { octokit } from 'lxrbckl';

import { 
   
   Node,
   Swarm,
   Archive,
   NodeArray,
   NodeString,
   NodeFunction,
   PropertyFunction

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


   public async getArchive(): Promise<Archive> {

      this._archive = await this._octokit.repositoryGet({

         file : dataConfig.octokitFile,
         branch : dataConfig.octokitBranch,
         repository : dataConfig.octokitRepository

      });

      return this._archive;

   }


   public async setArchive(): Promise<void> {

      await this._delDockerSwarm();
      await this._setDockerSwarm(await this._getDockerSwarm());

      await this._octokit.respositorySet({

         data : this._archive,
         file : dataConfig.octokitFile,
         branch : dataConfig.octokitBranch,
         repository : dataConfig.octokitRepository

      });

   }


   private async _setDockerSwarm(swarm: Swarm): Promise<void> {

      for (const n of Object.values(swarm)) {

         this._archive[n.name!] = {

            'os' : n.os,
            'type' : n.type,
            'status' : n.status,
            'services' : n.services

         };

      }

   }


   private async _getDockerSwarm(): Promise<Swarm> {

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


   private async _delDockerSwarm(): Promise<void> {

      for (const [k, n] of Object.entries(this._archive)) {

         if (n.type == 'swarm') {delete this._archive[k]}

      }

   }


   public setNode({name}: NodeFunction): boolean {

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


   public getNode({name}: NodeFunction): Node {return this._archive[name];}


   public delNode({name}: NodeFunction): void {delete this._archive[name];}


   public setProperty({

      name,
      value,
      property

   }: PropertyFunction): void {

      switch (this._arrayProperties.includes(property)) {

         case (false):

            this._archive[name][(property as NodeString)] = value;
            break;

         case (true):

            this._archive[name][(property as NodeArray)].push(value);
            break;

      }

   }


   public delProperty({

      name,
      value,
      property

   }: PropertyFunction): void {

      // we assume property is 'service' //
      const services: string[] = this._archive[name]['services'];
      this._archive[name]['services'] = services.filter(i => i != value);

   }

}