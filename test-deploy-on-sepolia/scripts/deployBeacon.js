const { ethers } = require('hardhat');

async function main() {
    const SingleBeaconProxyFactory = await ethers.getContractFactory('SingleBeaconProxy');

    const beacon = await upgrades.deployBeacon(SingleBeaconProxyFactory);
    await beacon.waitForDeployment();
    console.log('Beacon deployed to:', await beacon.getAddress());

    const SingleBeaconProxy = await upgrades.deployBeaconProxy(beacon, SingleBeaconProxyFactory, [42]);
    await SingleBeaconProxy.waitForDeployment();
    console.log('SingleBeaconProxy deployed to:', await SingleBeaconProxy.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});