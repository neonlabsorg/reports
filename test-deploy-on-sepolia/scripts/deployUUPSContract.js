const { ethers } = require('hardhat');

async function main() {
    const UUPSContractFactory = await hre.ethers.getContractFactory('UUPSContract');
    const UUPSContract = await upgrades.deployProxy(UUPSContractFactory, [], {kind: 'uups'});
    await UUPSContract.waitForDeployment();

    console.log(
        `UUPSContract proxy deployed to ${UUPSContract.target}`
    );
    console.log(
        `UUPSContract implementation deployed to ${await upgrades.erc1967.getImplementationAddress(UUPSContract.target)}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});