import { describe, expect, test } from "@jest/globals";
import Blockchain from "../src/lib/blockchain";
import Block from "../src/lib/block";

describe("Blockchain tests", () => {
    test("Should have genesis block", () => {
        const blockchain = new Blockchain();
        expect(blockchain.blocks.length).toEqual(1);
    });

    test("Genesis block should be valid", () => {
        const blockchain = new Blockchain();
        expect(blockchain.isValid().success).toBe(true);
    });

    test("Should be valid with two blocks", () => {
        const blockchain = new Blockchain();
        const block2 = new Block(1, blockchain.blocks[0].hash, "Block 2");
        blockchain.addBlock(block2);

        expect(blockchain.isValid().success).toBe(true);
    });

    test("Should invalidate a tampered block", () => {
        const blockchain = new Blockchain();
        const block2 = new Block(1, blockchain.blocks[0].hash, "Block 2");
        blockchain.addBlock(block2);

        // Manipula o bloco, quebrando a validação
        blockchain.blocks[1].data = "Hacked Data";

        expect(blockchain.isValid().success).toBe(false); // linha 49 retorna false
    });

    test("Should invalidate a block with wrong previous hash", () => {
        const blockchain = new Blockchain();
        const block2 = new Block(1, "WRONG_HASH", "Block 2");
        blockchain.blocks.push(block2);

        expect(blockchain.isValid().success).toBe(false); // cobre branch de previousHash incorreto
    });

    test("Should invalidate a block with wrong index", () => {
        const blockchain = new Blockchain();
        const block2 = new Block(5, blockchain.blocks[0].hash, "Block 2"); // index errado
        blockchain.blocks.push(block2);

        expect(blockchain.isValid().success).toBe(false); // cobre branch de index incorreto
    });

    test("Should add a new valid block", () => {
        const blockchain = new Blockchain();
        const block2 = new Block(1, blockchain.blocks[0].hash, "Block 2");
        const result = blockchain.addBlock(block2);

        expect(result.success).toBe(true);
        expect(blockchain.blocks.length).toBe(2);
    });

    test("Should NOT add invalid block (index < 0)", () => {
        const blockchain = new Blockchain();
        const block = new Block(-1, blockchain.blocks[0].hash, "Block 2");
        const result = blockchain.addBlock(block);

        expect(result.success).toBe(false); // cobre branch de retorno false no addBlock
    });

    test("Should NOT add invalid block (previousHash mismatch)", () => {
        const blockchain = new Blockchain();
        const block = new Block(1, "WRONG_HASH", "Block 2");
        const result = blockchain.addBlock(block);

        expect(result.success).toBe(false); // cobre branch de previousHash inválido no addBlock
    });



});
