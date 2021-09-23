const HDWalletProvider = require("@truffle/hdwallet-provider");
const {
  infuraProjectId,
  mnemonic,
  // account,
  etherscanApiKey,
} = require("./secrets.json");

module.exports = {
  networks: {
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: mnemonic,
          providerOrUrl: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
          addressIndex: 3,
          // numberOfAddresses: 1,
          // shareNonce: true,
          derivationPath: "m/44'/1'/0'/2/",
          chainId: "4",
        }),
      network_id: 4,
      gasPrice: 10e9,
      skipDryRun: true,
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  contracts_directory: "./full/",
  // contracts_build_directory: "./src/abis/",
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",
      // settings: {
      //   optimizer: {
      //     enabled: true,
      //     runs: 20000,
      //   },
      // },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: etherscanApiKey,
  },
};
