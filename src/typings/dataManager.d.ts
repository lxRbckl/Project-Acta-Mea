// typings <
export type nodeArray = 'services';
export type nodeString = 'os' | 'type' | 'status';

// >


// interfaces <
export interface node {

   'os': string;
   'type': string;
   'name'?: string;
   'status': string;
   'services': string[];

}

export interface Swarm {

   [key: string]: node;

}

export interface Archive {

   [key: string]: node;

}

// >