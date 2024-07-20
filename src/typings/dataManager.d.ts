// typings <
// export type Swarm = swarmNode[];

export type Archive = archiveNode[];

// >


// interfaces <
interface swarmNode {

   'os': string;
   'name': string;
   'state': string;
   'services': string[];

}

interface Swarm {

   [key: string]: swarmNode

}

interface archiveService {

   'url'?: string;
   'name': string;

}

interface archiveNode {

   'id': string;
   'os': string;
   'type': string;
   'state': boolean;
   'computer': string;
   'service': Service[];

}

// >