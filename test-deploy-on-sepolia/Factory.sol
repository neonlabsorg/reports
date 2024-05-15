// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

import "./Beacon.sol";
import "./BeaconProxy.sol";

contract Factory {
    mapping(uint32 => address) private proxies;
    Beacon immutable beacon;

    constructor(address _initBlueprint) {
        beacon = new Beacon(_initBlueprint);
    }

    function deployBeaconProxy(uint256 _number) public {
        BeaconProxy proxy = new BeaconProxy(
            address(beacon),
            abi.encodeWithSelector(BeaconProxy(address(0)).initialize.selector,  _number)
        );
    }

    function getBeacon() public view returns (address) {
        return address(beacon);
    }

    function getImplementation() public view returns (address) {
        return beacon.implementation();
    }
}