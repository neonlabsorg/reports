// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;


contract TestContract {
    uint256 public test;
    
    function testFunc(uint256 _test) public returns(uint256) {
        test = _test;
        return test;
    }
}