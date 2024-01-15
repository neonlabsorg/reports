const {Web3} = require('web3');
const web3 = new Web3('https://neon-proxy-mainnet.solana.p2p.org');

async function init() {
    const ICE_CREAM_SWAP_FACTORY_ADDRESS = '0xd43F135f6667174f695ecB7DD2B5f953d161e4d1';
    const POOLS = {
        WSOL_USDT: '0x7Ef19bBc00363A166e93681774D5bdF75BF381C4', // not recorded into contract events
        WSOL_USDC: '0xe9d57141d7d8287725043b51b19ce95200a48c55', // not recorded into contract events
        WNEON_WSOL: '0x0b8cB51d95778c728Ea53822Fb2081a1Df637A3A'
    };
    const WSOL = '0x5f38248f339Bf4e84A2caf4e4c0552862dC9F82a';
    const WNEON = '0x202C35e517Fa803B537565c40F0a6965D7204609';
    const USDT = '0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a';
    const USDC = '0xEA6B04272f9f62F997F666F07D3a974134f7FFb9';
    let iceCreamSwapFactory = new web3.eth.Contract([{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pairCodeHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"}], ICE_CREAM_SWAP_FACTORY_ADDRESS);

    let event = await iceCreamSwapFactory.getPastEvents('PairCreated', {
        filter: {token0: WSOL, token1: USDT},
        fromBlock: 0,
        toBlock: 'latest'
    });
    console.log(event, 'WSOL/ USDT pair event'); // missing event, but pool is actually existing POOLS.WSOL_USDT

    event = await iceCreamSwapFactory.getPastEvents('PairCreated', {
        filter: {token0: WSOL, token1: USDC},
        fromBlock: 0,
        toBlock: 'latest'
    });
    console.log(event, 'WSOL/ USDC pair event'); // missing event, but pool is actually existing POOLS.WSOL_USDC

    event = await iceCreamSwapFactory.getPastEvents('PairCreated', {
        filter: {token0: WNEON, token1: WSOL},
        fromBlock: 0,
        toBlock: 'latest'
    });
    console.log(event, 'WSOL/ WNEON pair event');
}
init();