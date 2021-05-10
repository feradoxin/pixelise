const bip39 = require('bip39');
const hdKey = require('ethereumjs-wallet/hdkey');
const bip38 = require('bip38');
const wif = require('wif');

/* Generate 128-bit entropy, create mnemonic from entropy then convert to master seed, create root private key from master seed.
   Mnemonic generation to be replaced with user input for pairing to Trezor/Ledger in NFT Frame App. The code must be offline to prevent leak of keys.*/
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
const isValid = bip39.validateMnemonic(mnemonic);
const m = hdKey.fromMasterSeed(seed);

// Derivation path creation and generate account Xpriv and Xpub.
const ethBasePath = "m/44'/60'/";
const ethAccountIndex = "0";
const hdPath = ethBasePath + ethAccountIndex + "'/0";
const parentXpub = m.derivePath(hdPath).publicExtendedKey();
const parentXpriv = m.derivePath(hdPath).privateExtendedKey();

// Generate Wallet 0
const ethPubHDKey = hdKey.fromExtendedKey(parentXpub);
const ethPrivHDKey = hdKey.fromExtendedKey(parentXpriv);
const ethWalletAddress = ethPubHDKey.derivePath("m/0").getWallet().getAddressString();
const ethWalletPub = ethPubHDKey.derivePath("m/0").getWallet().getPublicKeyString();
const ethWalletPriv = ethPrivHDKey.derivePath("m/0").getWallet().getPrivateKeyString();

// Logs to check where shit goes wrong...or right! Well hopefully the latter.
console.log("------");
console.log("BIP39 Mnemonic: " + mnemonic);
console.log("Mnemonic is Valid: " + isValid);
console.log("Mnemonic Seed: " + seed.toString('hex'));
console.log("Parent XPub Key: " + parentXpub);
console.log("Parent XPriv Key: " + parentXpriv);
console.log("------");
console.log("Ethereum Address 0: " + ethWalletAddress);
console.log("Ethereum Addr0 Pub: " + ethWalletPub);
console.log("Ethereum Addr0 Priv: " + ethWalletPriv);