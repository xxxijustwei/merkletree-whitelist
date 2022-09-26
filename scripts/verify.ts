import hre from "hardhat"
import {contract_name, get_deployed_address, get_merkle_proof} from "./misc"
import {Contract} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

async function interact_contract(address: string) {
    let contract = await hre.ethers.getContractAt(contract_name, address)
    let [account1, account2] = await hre.ethers.getSigners()

    console.log("account1 start verify...")
    await account_verify(contract, account1)
    console.log("account2 start verify...")
    await account_verify(contract, account2)
}

async function account_verify(contract: Contract, account: SignerWithAddress) {
    const merkleProof = get_merkle_proof(account.address)
    const contractWithSigner = contract.connect(account)

    const ok = await contractWithSigner.verify(merkleProof)
    if (!ok) {
        console.log(`Address ${account.address} is not in the whitelist`)
        return
    }

    console.log(`Address ${account.address} is in the whitelist`)
}

async function main() {
    let address = get_deployed_address()[contract_name]
    await interact_contract(address)
}

main().catch((err) => {
    console.log(err)
    process.exitCode = 1
})