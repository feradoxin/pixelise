const bip39 = require('bip39');
const hdKey = require('ethereumjs-wallet/hdkey');
const bip32 = require('bip32');
const bs58 = require('bs58');
const bs58check = require('bs58check');

/* Generate 128-bit entropy, create mnemonic from entropy then convert to master seed, create root private key from master seed.
   Mnemonic generation to be replaced with user input for pairing to Trezor/Ledger in NFT Frame App. */
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
const isValid = bip39.validateMnemonic(mnemonic);
const m = hdKey.fromMasterSeed(seed);

// Derivation path creation and generate account Xpriv and Xpub.
const ethBasePath = "m'/44'/60'/";
const ethAccountIndex = "0";
const hdPath = ethBasePath + ethAccountIndex + "'/0'";
const parentXpub = m.derivePath(hdPath).publicExtendedKey();
const parentXpriv = m.derivePath(hdPath).privateExtendedKey();

// Logs to check where shit goes wrong...or right! Well hopefully the latter.
console.log("-------");
console.log("BIP39 Mnemonic: " + mnemonic);
console.log("Mnemonic is Valid: " + isValid);
console.log("Mnemonic Seed: " + seed.toString('hex'));
console.log("Parent XPub Key: " + parentXpub);
console.log("Parent XPriv Key: " + parentXpriv);