import { ethers } from "hardhat"
import { save_deployed_address, contract_name } from "./misc";


let deploy_address: {[key: string]: string} = {}
let contract_inst: {[key: string]: any} = {}

async function deploy_contract() {
  let signers = await ethers.getSigners()
  let deployer = signers[0]
  let address = await deployer.getAddress()
  console.log(`Deploy contract by ${address}`)

  const factory = await ethers.getContractFactory(contract_name)
  let instance = await factory.deploy()
  await instance.deployed()

  deploy_address[contract_name] = instance.address
  contract_inst[contract_name] = instance
  console.log(`contract ${contract_name} deploy to: ${instance.address}`)
  console.log(" ")
}

async function main() {
  await deploy_contract()
  save_deployed_address(deploy_address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
