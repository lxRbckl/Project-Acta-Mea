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


export interface SetNode {

   name: string;
   dataHandler: dataManager;

}

export interface GetNode {

   name: string;
   dataHandler: dataManager;

}

export interface DelNode {

   name: string;
   dataHandler: dataManager;

}

export interface SetProperty {

   name: string;
   value: string;
   service?: string;
   property: string;
   dataHandler: dataManager;

}

export interface DelProperty {

   name: string;
   value: string;
   service?: string;
   property: string;
   dataHandler: dataManager;

}

// >