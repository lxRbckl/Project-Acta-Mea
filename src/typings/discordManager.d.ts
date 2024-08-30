// import <
import { discord } from 'lxrbckl';
import dataManager from '../managers/dataManager';

// >


// typings <
export type NodeChoices = NodeChoice[];

// >


// interfaces <
interface NodeChoice {

   name: string;
   value: string;

}


export interface NodeFunction {

   name: string;
   dataHandler: dataManager;

}


export interface PropertyFunction {

   os: string;
   name: string;
   status: string;
   service: string;
   hardware: string;
   dataHandler: dataManager;

}

// >