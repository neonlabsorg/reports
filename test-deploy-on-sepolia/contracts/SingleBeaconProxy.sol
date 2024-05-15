// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract SingleBeaconProxy is Initializable {
    uint256 public number;

    function initialize(uint256 _number) external initializer {
        number = _number;
    }

    function getNumber() public view returns(uint) {
        return number;
    }
}