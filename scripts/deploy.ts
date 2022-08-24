const { ethers } = require("hardhat");
import { verify } from "../utils/verify";

async function main() {
  console.log("Collecting artifacts......");
  const Pockies = await ethers.getContractFactory("Pockies");

  const rootHash =
    "0xff8dedfbfa60af186cf3c830acbc32c05aae823045ae5ea7da1e45fbfaba4f92";
  const hiddenUri = "iamhiddenuri";

  const args = [rootHash, hiddenUri];

  const pockies = await Pockies.deploy(rootHash, hiddenUri);

  console.log("Deploying Pockies......");

  await pockies.deployed();

  console.log(`Pockies Deployed at${pockies.address}`);

  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying Pockies...");
    await verify(pockies.address, args);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
