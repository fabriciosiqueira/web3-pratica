

import Validation from "../validation";



/**
 * Mocked block class
 */
export default class Block {
  index: number;
  timestamp: number;
  hash: string;
  data: string;
  previousHash: string;
  
  /**
   * Creates a new mock block
   * @param block The mock block data
   */
  constructor (block?:Block) {
    //regras de inicializacao
    this.index = block?.index || 0;
    this.timestamp = block?.timestamp || Date.now();
    this.previousHash = block?.previousHash || "";
    this.data = block?.data || "";
    this.hash = block?.hash || this.getHash();
  }


  /**
   * Creates the mock hash
   * @returns Returns the created mock hash 
   */
  getHash(): string {
     return this.hash || "abc";
  }


  /**
   * Validates the mock block
   * @returns Returns if the mock block is valid
   */
  isValid(previousHash: string, previousIndex: number): Validation {
    if(!previousHash || previousIndex < 0 || this.index < 0)
        return new Validation(false, "Invalid mock block")
    return new Validation();
  }
}
