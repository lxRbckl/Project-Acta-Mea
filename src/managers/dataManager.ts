// import <
import Dockerode from 'dockerode';
import { octokit, axiosGet } from 'lxrbckl';

import { 
   
   Swarm,
   Archive,
   NodeFunction,
   ServiceAliases,
   PropertyFunction

} from '../typings/dataManager';
import dataConfig from '../configs/dataManagerConfig';

// >


export default class dataManager {


   private _dockerode: any;
   private _archive: Archive;
   private _octokit: octokit;
   private _dockerSwarmHardware: string;


   constructor() {

      this._archive = {};
      this._dockerSwarmHardware = 'raspberry pi';

      this._octokit = new octokit({

         owner : dataConfig.owner,
         token : dataConfig.token

      });

      this._dockerode = new Dockerode({

         port : dataConfig.port,
         host : dataConfig.host

      });

   }


   private _convertService(
      
      service: string,
      aliases: ServiceAliases

   ): string {

      let convert: string = service;
      convert = convert.split('/')[1].split(':')[0];

      switch (Object.keys(aliases).includes(service)) {

         case (false): return service;
         case (true): return aliases[service];

      }

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

            'services' : n['services'],
            'hardware' : n['hardware'],
            'status' : n['status'],
            'host' : n['host'],
            'os' : n['os']

         };

      }

   }


   private async _getDockerSwarm(): Promise<Swarm> {

      var swarm: Swarm = {};
      var serviceAliases: ServiceAliases;
      serviceAliases = await axiosGet(dataConfig.serviceAliasesURL);

      try {

         // iterate (docker swarm) <
         // fetch remote server aliases <
         for (const n of await this._dockerode.listNodes()) {

            swarm[n.ID] = {

               'services' : [],
               'host' : 'swarm',
               'status' : n.Status.State,
               'name' : n.Description.Hostname,
               'os' : n.Description.Platform.OS,
               'hardware' : this._dockerSwarmHardware

            };

         }

         // >

         // iterate (tasks running) <
         for (const t of await this._dockerode.listTasks()) {



            // V1
            // let service: string = '';
            // service = t.Spec.ContainerSpec.Image;
            // service = service.split('/')[1].split(':')[0];

            // swarm[t.NodeID]['services'].push(service.replace('-', ' '));

            // - - - - - - -

            // V2
            let service: string = t.Spec.ContainerSpec.Image;
            swarm[t.NodeID]['services'].push(this._convertService(
               
               service,
               serviceAliases
            
            ));

            // >

         }

         // >

         return swarm;

      } catch (error) {return swarm;}
      
   }


   private async _delDockerSwarm(): Promise<void> {

      for (const [k, n] of Object.entries(this._archive)) {

         if (n['host'] == 'swarm') {delete this._archive[k]}

      }

   }


   public async setNode({name}: NodeFunction): Promise<boolean> {

      switch (!(Object.keys(this._archive)).includes(name!)) {

         case (true):

            this._archive[name!] = {

               'os' : '',
               'hardware' : '',
               'services' : [],
               'status' : 'ready',
               'host' : 'standalone'

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
      service,
      hardware

   }: PropertyFunction): Promise<void> {

      // set property <
      if (os) {this._archive[name]['os'] = os;}
      else if (status) {this._archive[name]['status'] = status;}
      else if (hardware) {this._archive[name]['hardware'] = hardware;}
      else if (service) {this._archive[name]['services'].push(service);}

      // >

      await this.setArchive();

   }


   public async delProperty({

      os,
      name,
      status,
      service,
      hardware

   }: PropertyFunction): Promise<void> {

      //! currently only service property !//
      const services: string[] = this._archive[name]['services'];
      this._archive[name]['services'] = services.filter(i => i != service);

      await this.setArchive();

   }

}