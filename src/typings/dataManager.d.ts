// typings <
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

interface archiveNode {

   'id': string;
   'os': string;
   'state': boolean;
   'service': Service[];

}

// >