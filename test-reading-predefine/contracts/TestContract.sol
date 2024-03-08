// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "./QueryAccount.sol";
import "./BytesLib.sol";


contract TestContract {
    using BytesLib for bytes;

    function readSolanaAccountDataLen(bytes32 solanaAddress) public view returns(uint256) {
        (bool success, uint256 data) = QueryAccount.length(uint256(solanaAddress));
        require(success, "failed to query account data");

        return data;
    }

    function readSolanaAccountData(bytes32 solanaAddress, uint64 offset, uint64 len) public view returns(bytes memory) {
        (bool success, bytes memory data) = QueryAccount.data(uint256(solanaAddress), offset, len); // 0, 165
        require(success, "failed to query account data");

        return data; // bytes
    }

    function toUint64(bytes memory _bytes, uint256 _start) public pure returns (uint64) {
        require(_bytes.length >= _start + 8, "toUint64_outOfBounds");
        uint64 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x8), _start))
        }

        return tempUint;
    }

    function readLittleEndianUnsigned64(uint64 input) public pure returns (uint64) {
        input = ((input << 8) & 0xFF00FF00FF00FF00)  | ((input >> 8) & 0x00FF00FF00FF00FF00);
        input = ((input << 16) & 0xFFFF0000FFFF0000) | ((input >> 16) & 0x0000FFFF0000FFFF0000);
        return uint64(input << 32) | (input >> 32);
    }
}