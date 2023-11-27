# Issue with forking Neon state thru Hardhat
Hardhat framework has the option to fork the state of existing blockchain network which allows us execute off-chain local tests on the forked state. More info can fouund [https://hardhat.org/hardhat-network/docs/guides/forking-other-networks](https://chainlist.org/?search=Neon+EVM&testnets=true).

### Terminal commands:
* ```npm install``` - Downloading required packages.
* ```npx hardhat test --network hardhat test/test.js``` - Initiating the fork test.

### Report from the test:
* **Working stuff**:
    * You can make transfers between Neon addresses on the fork
    * You can fork any contract that is on Neon network _( contracts which are not ERC20ForSPL )_. List with forkable contracts:
        * 0x202C35e517Fa803B537565c40F0a6965D7204609
        * 0x2043191e10a2a4b4601f5123d6c94e000b5d915f
    * You can deploy contracts on the fork _( contracts which are not ERC20ForSPL )_
* **Not working stuff**:
    * You cannot fork contracts which are ERC20SPL, list with contracts which are not forkable:
        * 0x5f38248f339Bf4e84A2caf4e4c0552862dC9F82a
        * 0xEA6B04272f9f62F997F666F07D3a974134f7FFb9
        * 0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a
        * 0x54EcEC9D995A6CbFF3838F6a8F38099E518805d7
        * 0xcFFd84d468220c11be64dc9dF64eaFE02AF60e8A
    * You cannot deploy ERC20ForSPL contracts on the fork
    * You cannot interact with precompiles SPLToken & Metaplex
    * You cannot fork Chainlist oracle _( most likely, because internally we're reading the price feeds from Solana )_