import * as bip39 from 'bip39';
import { Wallet } from 'ethers';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export const generateMnemonic = () => bip39.generateMnemonic();

export const getEthereumWallet = (mnemonic, index = 0) => {
  const path = `m/44'/60'/0'/0/${index}`;
  const wallet = Wallet.fromPhrase(mnemonic, { path });
  return { address: wallet.address, privateKey: wallet.privateKey };
};

export const getSolanaWallet = async (mnemonic, index = 0) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString('hex')).key;
  const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32));
  return {
    address: keypair.publicKey.toBase58(),
    secretKey: Buffer.from(keypair.secretKey).toString('hex'),
  };
};
