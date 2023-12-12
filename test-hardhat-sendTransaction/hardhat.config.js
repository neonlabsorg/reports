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
            }
        ]
    },
    networks: {
        neondevnet: {
            url: "https://devnet.neonevm.org",
            accounts: [process.env.PRIVATE_KEY_OWNER, process.env.USER1_KEY],
            chainId: 245022926,
            allowUnlimitedContractSize: false,
            gas: "auto",
            gasPrice: "auto",
            isFork: true
        },
        neonmainnet: {
            url: "https://neon-proxy-mainnet.solana.p2p.org",
            accounts: [process.env.PRIVATE_KEY_OWNER, process.env.USER1_KEY],
            chainId: 245022934,
            allowUnlimitedContractSize: false,
            gas: "auto",
            gasPrice: "auto",
            isFork: true
        },
        /* hardhat: {
            forking: {
                live: false,
                saveDeployments: false,
                accounts: [process.env.PRIVATE_KEY_OWNER, process.env.USER1_KEY, process.env.USER2_KEY, process.env.USER3_KEY],
                url: "https://devnet.neonevm.org"
            }
        } */
    },
    mocha: {
        timeout: 180000
    }
};
