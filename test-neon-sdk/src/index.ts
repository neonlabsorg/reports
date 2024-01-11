import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { NeonProxyRpcApi, neonTransferMintWeb3Transaction } from '@neonevm/token-transfer';
import { sendSolanaTransaction } from './utils';
import Web3 from 'web3'; 

const TOKEN_MINT_OWNER_KEY = [100, 200, 300];
const signer = Keypair.fromSecretKey(Uint8Array.from(TOKEN_MINT_OWNER_KEY));

const neonNeonEvmUrl = 'https://devnet.neonevm.org';
const solanaUrl = 'https://api.devnet.solana.com';
const neonProxyApi = new NeonProxyRpcApi({ neonProxyRpcApi: neonNeonEvmUrl, solanaRpcApi: solanaUrl });

const connection = new Connection(solanaUrl, 'confirmed'); 
const web3 = new Web3(neonNeonEvmUrl); 

const token = {
    chainId: 245022926,
    address_spl: '3vxj94fSd3jrhaGAwaEKGDPEwn5Yqs81Ay5j1BcdMqSZ', // USDT on Solana Devnet
    address: '0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5', // USDT on Neon EVM Devnet
    decimals: 6,
    name: 'USDT',
    symbol: 'USDT',
    logoURI: ''
};

async function buildAndSubmitSolanaTx(neonWallet: string) {
    const neonProxyStatus = await neonProxyApi.evmParams(); 
    const transaction = await neonTransferMintWeb3Transaction(
        connection,
        web3,
        neonProxyApi,
        neonProxyStatus,
        new PublicKey(neonProxyStatus.NEON_EVM_ID),
        signer.publicKey,
        neonWallet,
        token,
        1,
        token.chainId
    );

    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    const signature = await sendSolanaTransaction(connection, transaction, [signer], true, { skipPreflight: false });
    console.log(signature, 'signature');
}
buildAndSubmitSolanaTx('0xb8f913C9AB9944891993F6c6fDAc421D98461294');