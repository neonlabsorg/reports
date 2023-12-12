require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.21",
    etherscan: {
        apiKey: {
            neonevm: "test"
        },
        customChains: [
            {
                network: "neonevm",
                chainId: 245022926,
                urls: {
                    apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
                    browserURL: "https://devnet.neonscan.org"
                }
            },
            {
                network: "neonevm",
                chainId: 245022934,
                urls: {
                    apiURL: "https://api.neonscan.org/hardhat/verify",
                    browserURL: "https://neonscan.org"
                }
            }
        ]
    },
    networks: {
        neondevnet: {
            url: "https://devnet.neonevm.org",
            accounts: [process.env.PRIVATE_KEY_OWNER],
            chainId: 245022926,
            allowUnlimitedContractSize: false,
            gas: "auto",
            gasPrice: "auto",
            isFork: true
        },
        neonmainnet: {
            url: "https://neon-proxy-mainnet.solana.p2p.org",
            accounts: [process.env.PRIVATE_KEY_OWNER],
            chainId: 245022934,
            allowUnlimitedContractSize: false,
            gas: "auto",
            gasPrice: "auto",
            isFork: true
        },
        hardhat: {
            forking: {
                live: false,
                saveDeployments: false,
                url: "https://neon-proxy-mainnet.solana.p2p.org",
            }
        }
    },
    mocha: {
        timeout: 180000
    }
};
