// typings <
export type NodeArray = 'services';
export type NodeString = 'os' | 'type' | 'status';

// >


// interfaces <
export interface Node {

   'os': string;
   'type': string;
   'name'?: string;
   'status': string;
   'services': string[];

}

export interface Swarm {

   [key: string]: Node;

}

export interface Archive {

   [key: string]: Node;

}


export interface NodeFunction {

   name: string;

}


export interface PropertyFunction {

   name: string;
   value: string;
   property: string;

}


// >