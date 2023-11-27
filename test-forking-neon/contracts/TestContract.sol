// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "hardhat/console.sol";


contract TestContract {
    function getDummyData() public view returns(uint256) {
        console.log('console.log', 12345);
        return 12345;
    }
}