// import <
import Dockerode from 'dockerode';
import { octokit } from 'lxrbckl';

import { 
   
   Swarm,
   Archive,
   NodeFunction,
   PropertyFunction

} from '../typings/dataManager';
import dataConfig from '../configs/dataManagerConfig';

// >


export default class dataManager {


   private _dockerode: any;
   private _archive: Archive;
   private _octokit: octokit;


   constructor() {

      this._archive = {};

      this._dockerode = new Dockerode({

         port : dataConfig.port,
         host : dataConfig.host

      });

      this._octokit = new octokit({

         owner : dataConfig.owner,
         token : dataConfig.token

      });

   }


   public async getArchive(): Promise<Archive> {

      this._archive = await this._octokit.repositoryGet({

         file : dataConfig.file,
         branch : dataConfig.branch,
         repository : dataConfig.repository

      });

      return this._archive;

   }


   public async setArchive(): Promise<void> {

      await this._delDockerSwarm();
      await this._setDockerSwarm(await this._getDockerSwarm());

      await this._octokit.respositorySet({

         data : this._archive,
         file : dataConfig.file,
         branch : dataConfig.branch,
         repository : dataConfig.repository

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


   public async setNode({name}: NodeFunction): Promise<boolean> {

      switch (!(Object.keys(this._archive)).includes(name!)) {

         case (true):

            this._archive[name!] = {

               'os' : '',
               'type' : 'host',
               'services' : [],
               'status' : 'online'

            };

            await this.setArchive();
            return true;

         case (false): return false;

      }

   }


   public getNode({name}: NodeFunction): string {
      
      return JSON.stringify(

         name ? this._archive[name!] : Object.keys(this._archive),
         null,
         3

      );
   
   }


   public async delNode({name}: NodeFunction): Promise<void> {
      
      delete this._archive[name!];
      await this.setArchive();
      
   }


   public async setProperty({

      os,
      name,
      status,
      service

   }: PropertyFunction): Promise<void> {

      // set property <
      if (os) {this._archive[name]['os'] = os;}
      else if (status) {this._archive[name]['status'] = status;}
      else if (service) {this._archive[name]['services'].push(service);}

      // >

      await this.setArchive();

   }


   public async delProperty({

      os,
      name,
      status,
      service

   }: PropertyFunction): Promise<void> {

      const services: string[] = this._archive[name]['services'];
      this._archive[name]['services'] = services.filter(i => i != service);

      await this.setArchive();

   }

}