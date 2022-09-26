// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Roles.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


// deploy network: moonbase alpha
contract WhiteList is Roles {

    bytes32 public merkleRoot;

    error InvalidProofError(address sender);

    constructor() Roles(_msgSender()) {}

    function update(bytes32 _merkleRoot) external onlyOnwer {
        merkleRoot = _merkleRoot;
    }

    function verify(bytes32[] calldata _merkleProof) external view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        return MerkleProof.verify(_merkleProof, merkleRoot, leaf);
    }
}