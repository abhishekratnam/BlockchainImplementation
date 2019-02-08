//Without merkele tree implemented basic blockchain
//You can import it using import statement Es6 versions i used a function call
const SHA256 = require('crypto-js/sha256');
/*We’ll create a Block class first which will hold a constructor function, a 
calculateHash function, and a mineBlock function. We start off with the constructor 
function which instantiates Block objects and provides it with its properties.*/

class Block{
    constructor(index, timestamp, data, previousHash){
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nounce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash+ this.timestamp + this.data + this.nonce).toString();
    }
    mineBlock(difficulty){

    }
}
/* Our Blockchain class needs a few key functionalities, namely the ability to be
 instantiated, to start, to access the latest block’s information, and to extend itself 
 by adding a new block to it.*/

class Blockchain{
    constructor(){
        this.chain = [this.createGenesis()];
    }
    
    createGenesis(){
        return new Block(0,"01/01/2017","Genesis block", "0")
    }

    latestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    checkValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }
        return true;
    }
}
/*Dummy Block chain objects to validate the code is working.You could further extend it
 ans so on.*/

let jsChain = new Blockchain();
jsChain.addBlock(new Block("23/12/2017", {amount: 10}));
jsChain.addBlock(new Block("10/9/2019", {amount: 50}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid?" + jsChain.checkValid());