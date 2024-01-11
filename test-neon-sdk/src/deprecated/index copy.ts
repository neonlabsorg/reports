import { simulateTransaction } from '@neonevm/dao-governance';
import { NeonProxyRpcApi, solanaSOLTransferTransaction } from '@neonevm/token-transfer';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { sendSolanaTransaction } from './utils';

// import Web3 from 'web3';

const TOKEN_MINT_OWNER_KEY = [78, 81, 129, 107, 97, 54, 158, 166, 105, 36, 148, 243, 127, 227, 221, 104, 173, 237, 82, 88, 9, 40, 125, 84, 72, 58, 18, 127, 64, 4, 57, 72, 233, 61, 118, 28, 77, 199, 152, 180, 254, 202, 218, 160, 248, 36, 159, 200, 62, 127, 19, 152, 24, 46, 235, 35, 129, 7, 252, 152, 27, 95, 24, 62];
const signer = Keypair.fromSecretKey(Uint8Array.from(TOKEN_MINT_OWNER_KEY));

const solanaWallet = new PublicKey(`GhUMKVcj7xNXQLZCufuQXZUtCPCnJhjTVXcuU35Jv7em`);
const neonWallet = `0xAB1c34b53F12980a4fa9043B70c864CEE6891c0C`;

const neonNeonEvmUrl = `https://devnet.neonevm.org/solana/neon`;
const solNeonEvmUrl = `https://devnet.neonevm.org/solana/sol`;
const solanaUrl = `https://api.devnet.solana.com`;

const neonProxyApi = new NeonProxyRpcApi({
  neonProxyRpcApi: neonNeonEvmUrl,
  solanaRpcApi: solanaUrl
});

const solProxyApi = new NeonProxyRpcApi({
  neonProxyRpcApi: solNeonEvmUrl,
  solanaRpcApi: solanaUrl
});

const networkUrls = [{
  id: 245022926,
  token: 'NEON',
  solana: solanaUrl,
  neonProxy: solanaUrl
}, {
  id: 245022927,
  token: 'SOL',
  solana: solanaUrl,
  neonProxy: solNeonEvmUrl
}];


const networkUrl = networkUrls[1]; // Selected Sol Neon EVM (SOL Network)
const connection = new Connection(networkUrl.solana, 'confirmed');

// const url = new Web3.providers.HttpProvider(networkUrl.neonProxy);
// const web3 = new Web3(url);

// You token (for example used USDT)
// more tokens here https://github.com/neonlabsorg/token-list/blob/main/tokenlist.json
const splToken = {
    chainId: 245022926,
    address_spl: '3vxj94fSd3jrhaGAwaEKGDPEwn5Yqs81Ay5j1BcdMqSZ',
    address: '0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5',
    decimals: 6,
    name: 'USDT',
    symbol: 'USDT',
    logoURI: 'https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/tether-usdt-logo.svg'
};

async function init() {
  const [neonNativeToken, solNativeToken] = await neonProxyApi.nativeTokenList();
  const neonProxyStatus = await neonProxyApi.evmParams(); // get evm params config
  const solProxyStatus = await solProxyApi.evmParams();

  // for SOL token native network
  const solChainId = Number(solNativeToken.token_chain_id);
  const solTokenMint = new PublicKey(solNativeToken.token_mint);
  const solEvmProgram = new PublicKey(solProxyStatus.NEON_EVM_ID);

  const transaction = await solanaSOLTransferTransaction(connection, solanaWallet, neonWallet, solEvmProgram, solTokenMint, splToken, 1000000, solChainId); // Solana Transaction object
  console.log('transaction', transaction);
  transaction.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash; // Network blockhash
  console.log('transaction', transaction);

  /* const simulate = await simulateTransaction(connection, transaction, 'confirmed');
  console.log('simulate', simulate);

  const signature = await sendSolanaTransaction(connection, transaction, [signer], false, { skipPreflight: false }); // method for sign and send transaction to network
  console.log('signature', signature); */
}

init();
