const bip39 = require('bip39');
const hdKey = require('ethereumjs-wallet/hdkey');
const bip38 = require('bip38');
const wif = require('wif');

/* Generate 128-bit entropy, create mnemonic from entropy then convert to master seed, create root private key from master seed.
   Mnemonic generation to be replaced with user input for pairing to Trezor/Ledger in NFT Frame App. The code must be offline to prevent leak of keys.*/
const mnemonic = "punch plug gadget noble brush maximum awful bring resource denial flash brand ketchup artefact divorce review taste charge echo asset flee crop click load" //bip39.generateMnemonic("256");
const seed = bip39.mnemonicToSeedSync(mnemonic);
const isValid = bip39.validateMnemonic(mnemonic);
const m = hdKey.fromMasterSeed(seed);
const rootXpub = m.derivePath("m").publicExtendedKey();
const rootXpriv = m.derivePath("m").privateExtendedKey();

// Derivation path creation and generate Ethereum base Xpriv and Xpub.
const ethBasePath = "m/44'/60'/";
const ethAccountIndex = "0";
const hdPath = ethBasePath + ethAccountIndex + "'/0";
const ethXpub = m.derivePath(hdPath).publicExtendedKey();
const ethXpriv = m.derivePath(hdPath).privateExtendedKey();
const ethPubHDKey = hdKey.fromExtendedKey(ethXpub);
const ethPrivHDKey = hdKey.fromExtendedKey(ethXpriv);

// Generate Wallet. Replace ethAddrIndex to derive downstream addresses.
const ethAddrIndex = "0"
const ethWalletAddress = ethPubHDKey.derivePath("m/" + ethAddrIndex).getWallet().getAddressString();
const ethWalletPub = ethPubHDKey.derivePath("m/" + ethAddrIndex).getWallet().getPublicKeyString();
const ethWalletPriv = ethPrivHDKey.derivePath("m/" + ethAddrIndex).getWallet().getPrivateKeyString();

// Logs. More logs. All the logs.
console.log("------");
console.log("BIP39 Mnemonic: " + mnemonic);
console.log("Mnemonic is Valid: " + isValid);
console.log("Mnemonic Seed: " + seed.toString('hex'));
console.log("Root XPub Key: " + rootXpub);
console.log("Root XPriv Key: " + rootXpriv);
console.log("------");
console.log("Ethereum XPub Key: " + ethXpub);
console.log("Ethereum XPriv Key: " + ethXpriv);
console.log("Ethereum Address 0: " + ethWalletAddress);
console.log("Ethereum Addr0 Pub: " + ethWalletPub);
console.log("Ethereum Addr0 Priv: " + ethWalletPriv);