import { PublicKey, Keypair } from '@solana/web3.js';
import '@neonevm/token-transfer';

/* const { 
    PublicKey
} = require("@solana/web3.js");

const { 
    solanaSOLTransferTransaction
} = require("@neonevm/token-transfer"); */

const TOKEN_MINT_OWNER_KEY = [78,81,129,107,97,54,158,166,105,36,148,243,127,227,221,104,173,237,82,88,9,40,125,84,72,58,18,127,64,4,57,72,233,61,118,28,77,199,152,180,254,202,218,160,248,36,159,200,62,127,19,152,24,46,235,35,129,7,252,152,27,95,24,62];
const signer = Keypair.fromSecretKey(Uint8Array.from(TOKEN_MINT_OWNER_KEY));

const solanaWallet = `GhUMKVcj7xNXQLZCufuQXZUtCPCnJhjTVXcuU35Jv7em`;
const neonWallet = `0xAB1c34b53F12980a4fa9043B70c864CEE6891c0C`;

const neonNeonEvmUrl = `https://devnet.neonevm.org`;
const solNeonEvmUrl = `https://devnet.neonevm.org/solana/sol`;
const solanaUrl = `https://api.devnet.solana.com`;
const neonProxyApi = new NeonProxyRpcApi({ neonProxyRpcApi: neonNeonEvmUrl, solanaRpcApi: solanaUrl });
const solProxyApi = new NeonProxyRpcApi({ neonProxyRpcApi: solNeonEvmUrl, solanaRpcApi: solanaUrl });

async function init() {
    const [neonNativeToken, solNativeToken] = await neonProxyApi.nativeTokenList(); 

    // for SOL token native network
    const solChainId = Number(solNativeToken.token_chain_id);
    const solTokenMint = new PublicKey(solNativeToken.token_mint);
    const solEvmProgram = new PublicKey(solProxyStatus.NEON_EVM_ID);

    const transaction = await solanaSOLTransferTransaction(solanaWallet, neonWallet, solEvmProgram, solTokenMint, new PublicKey(C5h24dhh9PjaVtHmf6CaqXbhi9SgrfwUSQt2MskWRLYr), 1000000, solChainId); // Solana Transaction object
    console.log(transaction, 'transaction');
    transaction.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash; // Network blockhash
    console.log(transaction, 'transaction');
    const signature = await sendSolanaTransaction(connection, transaction, [signer], false, { skipPreflight: false }); // method for sign and send transaction to network
    console.log(signature, 'signature');
}
init();