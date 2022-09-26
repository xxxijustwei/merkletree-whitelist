import fs from "fs";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

export let contract_name = "WhiteList"

export function get_deployed_address() {
    let deploy_address: {[key: string]: string} = {}

    let data = fs.readFileSync("./common/deploy_address.json", "utf-8")
    let obj = JSON.parse(data)
    for (let key in obj) {
        deploy_address[key] = obj[key]
    }

    return deploy_address
}

export function save_deployed_address(deploy_address: {[key: string]: string}) {
    fs.writeFile(
        "./common/deploy_address.json",
        JSON.stringify(deploy_address),
        (err) => {
            if (err) console.log("deploy contract address write failed!", err)
            else console.log("deploy contract address write successful!")
        })
}

let whitelist_detail = [
    "0x14D6617F2dDfB6eECb2f3E49033dE1Cc32dB9A83",
    "0xDCa72B2392FA69b1ea984a423975b1036cae94d8",
    "0xb308edae61436b3a00ec6add22a1f738064e8aed",
    "0x799af9ee65d1c7299a3c91fbe092e8017bbbe5ce",
    "0xd36aac0c9676e984d72823fb662ce94d3ab5e551",
    "0xBe00C4312c97b1B13Df330b1f44ea04D7886ecdB",
    "0x799Af9eE65d1c7299A3C91FbE092E8017BBBe5Ce",
    "0xb308edae61436b3a00ec6add22a1f738064e8aed"
]

export const leafNodes = whitelist_detail.map(addr => keccak256(addr))
export const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

export function get_merkle_proof(address: string) {
    const leaf = keccak256(address)
    return merkleTree.getHexProof(leaf)
}