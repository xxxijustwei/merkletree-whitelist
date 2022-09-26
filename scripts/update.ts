import hre from "hardhat"
import {contract_name, get_deployed_address, merkleTree} from "./misc"

async function interact_contract(address: string) {
    const merkleRoot = merkleTree.getRoot()
    const rootAddress = '0x' + merkleRoot.toString('hex')

    const contract = await hre.ethers.getContractAt(contract_name, address)
    const tx = await contract.update(rootAddress)
    await tx.wait()

    console.log("update successful!")
    console.log(`current merkle root: ${rootAddress}`)
}

async function main() {
    const address = get_deployed_address()[contract_name]
    await interact_contract(address)
}

main().catch((err) => {
    console.log(err)
    process.exitCode = 1
})