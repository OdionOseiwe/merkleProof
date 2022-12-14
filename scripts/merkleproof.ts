import { ethers } from "hardhat";

import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';

async function main() {
    console.log("deploying....");
    
    const Merkleprove = await ethers.getContractFactory("MerkleTrees");
    const merkleprove = await Merkleprove.deploy();

    await merkleprove.deployed();

  const signers = await ethers.getSigners();
  
const leafNodes = signers.map(signer => keccak256(signer.address));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  
const rootHash = merkleTree.getHexRoot();
  
console.log( merkleTree.toString());
console.log("Root Hash: ", rootHash);


const claimingAddress = leafNodes[0];

const hexProof = merkleTree.getHexProof(keccak256(claimingAddress));
console.log(hexProof);
     
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// const uche = "david";
// uche.toString();


// class Uche {
//   getName() {
//     console.log("developeruche")
//   }

//   toString() {
//     return console.log("Ose")
//   }
// }

// new Uche().