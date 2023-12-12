// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
    const TestContract2 = await ethers.deployContract("TestContract2");
    await TestContract2.waitForDeployment();

    console.log(
        `TestContract2 token deployed to ${TestContract2.target}`
    );

    let tx = await TestContract2.test(513);
    await tx.wait(3);

    console.log(await TestContract2.dummyVal(), 'dummyVal');
    console.log(await TestContract2.values(0), 'values 0');
    console.log(await TestContract2.values(1), 'values 1');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});