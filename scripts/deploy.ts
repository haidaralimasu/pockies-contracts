const { ethers } = require('hardhat')
import { verify } from '../utils/verify'

async function main() {
  console.log('Collecting artifacts......')
  const Pockies = await ethers.getContractFactory('Pockies')

  const pockies = await Pockies.deploy()

  console.log('Deploying Pockies......')

  await pockies.deployed()

  console.log(`Pockies Deployed at${pockies.address}`)

  if (process.env.ETHERSCAN_API_KEY) {
    console.log('Verifying Pockies...')
    await verify(pockies.address, [])
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
