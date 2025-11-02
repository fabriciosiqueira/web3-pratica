import Block from "./block"; 
import Validation from "./validation";


/**
 * Blockchain class
 */
export default class Blockchain {
    blocks: Block[];
    nextIndex: number = 0;

    /**
     * Creates a new blockchain
     */
    constructor(){
        this.blocks = [new Block(this.nextIndex, "", "Genesis Block")];
        this.nextIndex++;
    }


    /**
     * Shows the last block
     * @returns the last block
     */
    getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1]!;
    }

    /**
     * Adds a new block
     * @param block The new block
     * @returns Return a Boolean if the block was created successfully.
     */
    addBlock(block: Block) : Validation {
        const lastBlock = this.getLastBlock();

        const validation = block.isValid(lastBlock.hash, lastBlock.index);
        if(!validation.success) return new Validation(false, `Invalid block. ${validation.message}`)
        this.blocks.push(block);
        this.nextIndex++;
        return new Validation();
    }

    /**
     * Validates the previous hash and index
     * @returns Return a Boolean if the block is valid.
     */
    isValid(): Validation {
        for (let i = this.blocks.length-1; i > 0; i--) {
            const currentBlock = this.blocks[i]!;
            const previousBlock = this.blocks[i - 1]!;
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!validation.success)  return new Validation(false, `Invalid block #${currentBlock.index}: ${validation.message}`);
        }
        return new Validation();
    }

}