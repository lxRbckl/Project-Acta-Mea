// typings <
export type nodeArray = 'services';
export type nodeString = 'os' | 'type' | 'status';

// >


// interfaces <
export interface DataManager {

   getArchive(): Promise<Archive>;
   setArchive(): Promise<void>;

   setNode(name: string): Promise<boolean>;
   getNode(name: string): Promise<node>;
   delNode(name: string): Promise<void>;

   setProperty(name: string, value: string, property: string): Promise<void>;
   delPropertyServices(name: string, value: string): Promise<void>;

}


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