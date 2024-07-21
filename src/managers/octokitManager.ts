// import <
import { octokit } from 'lxrbckl';

import { SetArchive } from '../typings/octokitManager';
import octokitConfig from '../configs/octokitManagerConfig';

// >


export default class octokitManager {


   private _octokit: octokit;


   constructor() {

      this._octokit = new octokit({

         owner : octokitConfig.owner,
         token : octokitConfig.token

      });

   }


   async getArchive(): Promise<any> {

      return await this._octokit.repositoryGet({

         file : octokitConfig.file,
         branch : octokitConfig.branch,
         repository : octokitConfig.repository

      });

   }


   async setArchive({data}: SetArchive): Promise<void> {

      await this._octokit.respositorySet({

         data : data,
         file : octokitConfig.file,
         branch : octokitConfig.branch,
         repository : octokitConfig.repository

      });

   }

   
}