const { ethers } = require("hardhat");
const { expect } = require("chai");
require("dotenv").config();

describe('Test init', async function () {
    let owner, user1;
    let TestContract;

    before(async function() {
        [owner, user1] = await ethers.getSigners();

        TestContract = await ethers.deployContract("TestContract");
        await TestContract.waitForDeployment();
    });

    it('mint nft', async function () {
        console.log(TestContract.target, 'TestContract.target');
        const txData = TestContract.interface.encodeFunctionData("testFunc", [500]);
        console.log(2);

        const txResult = await ethers.provider.call({
            to: TestContract.target,
            data: txData
        });
        console.log(txResult, 'txResult');

        //console.log(ethers.decodeBytes32String(txResult), 'decodeBytes32String');

        const decodedResult = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], txResult);
        console.log(decodedResult, 'decodedResult');
    });
});