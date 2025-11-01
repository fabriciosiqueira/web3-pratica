import Block from "./block"; 

const block1 = new Block(1, "a"); 

block1.hash = "a";
block1.index = 2;

console.log({ block1, valid: block1.isValid()});