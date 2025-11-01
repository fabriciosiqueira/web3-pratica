export default class Block {
  index: number = 1;
  hash: string = "";

  constructor (index: number, hash: string) {
    //regras de inicializacao
    this.index = index;
    this.hash = hash;
  }

  isValid(): boolean {
    if (this.index < 0) return false;
    if (!this.hash) return false;
    return true;
  }
}
