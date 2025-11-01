
/**
 * Block class
 */
export default class Block {
  index: number = 1;
  hash: string = "";
  
  /**
   * Creates a new block
   * @param index The block index in blockchain
   * @param hash The block hash
   */
  constructor (index: number, hash: string) {
    //regras de inicializacao
    this.index = index;
    this.hash = hash;
  }

  /**
   * Validates the block
   * @returns Returns true if the block is valid
   */
  isValid(): boolean {
    if (this.index < 0) return false;
    if (!this.hash) return false;
    return true;
  }
}
