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
   discord: discord;
   dataHandler: dataManager;

}

export interface GetNode {

   name: string;
   discord: discord;
   dataHandler: dataManager;

}

export interface DelNode {

   name: string;
   discord: discord;
   dataHandler: dataManager;

}

export interface SetProperty {

   name: string;
   service?: string;
   property: string;
   discord: discord;
   dataHandler: dataManager;

}

export interface DelProperty {

   name: string;
   discord: discord;
   service?: string;
   property: string;
   dataHandler: dataManager;

}

export interface Restart {

   discord: discord;
   (...args: any[]): any;
   
}

// >