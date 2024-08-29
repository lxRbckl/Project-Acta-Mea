// typings <


// >


// interfaces <
interface Node {

   'os': string;
   'host': string;
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

   name?: string;

}


export interface PropertyFunction {

   os?: string;
   name: string;
   status?: string;
   service?: string;

}


// >