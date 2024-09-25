const ethers = require('ethers');

const RPC = 'https://arb1.arbitrum.io/rpc';
const PRECOMPILE = '0x000000000000000000000000000000000000006D';
const interface = new ethers.utils.Interface([{"inputs":[{"internalType":"address","name":"newBatchPoster","type":"address"}],"name":"addBatchPoster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBatchPosters","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDefaultAggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"batchPoster","type":"address"}],"name":"getFeeCollector","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getPreferredAggregator","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"aggregator","type":"address"}],"name":"getTxBaseFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"batchPoster","type":"address"},{"internalType":"address","name":"newFeeCollector","type":"address"}],"name":"setFeeCollector","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"aggregator","type":"address"},{"internalType":"uint256","name":"feeInL1Gas","type":"uint256"}],"name":"setTxBaseFee","outputs":[],"stateMutability":"nonpayable","type":"function"}]);
const txData = interface.encodeFunctionData("getDefaultAggregator");

async function init() {
    const postRequest = await fetch(RPC, {
        method: 'POST',
        body: JSON.stringify({"method":"eth_call","params":[{"from": "0xAB1c34b53F12980a4fa9043B70c864CEE6891c0C","to":PRECOMPILE,"data":txData}],"id":1,"jsonrpc":"2.0"}),
        headers: { 'Content-Type': 'application/json' }
    });

    if (postRequest.status == 200) {
        const response = await postRequest.json();
        console.log(response, 'response');
    }
}
init();