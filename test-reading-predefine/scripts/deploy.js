// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
    const TestContractFactory = await ethers.getContractFactory('TestContract');
    const TestContractAddress = '';
    const solanaAccount = '0x5181e94d818ee4f3f26c9fa90443d8b894de38fd19eb8274f3747aa1e5c053da'; //6VAvEN2x6bPxBDc6xcDtnzYUw7cLziBAuadRZmmM8GJD
    let TestContract;

    if (ethers.isAddress(TestContractAddress)) {
        TestContract = TestContractFactory.attach(TestContractAddress);
    } else {
        TestContract = await ethers.deployContract("TestContract");
        await TestContract.waitForDeployment();

        console.log(
            `TestContract token deployed to ${TestContract.target}`
        );
    }

    const len = await TestContract.readSolanaAccountDataLen(solanaAccount);
    console.log(len, 'len');

    let bytesData = await TestContract.readSolanaAccountData(solanaAccount, 0, len);
    console.log(bytesData, 'bytesData'); 
    
    console.log(await TestContract.toUint64(bytesData, 64), 'toUint64'); 

    console.log(await TestContract.readLittleEndianUnsigned64(await TestContract.toUint64(bytesData, 64)), 'readLittleEndianUnsigned64');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});