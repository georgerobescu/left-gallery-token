const HDWalletProvider = require("truffle-hdwallet-provider");
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")
const INFURA_APIKEY = require(./infura-key);
const mnemonic = require("./mnemonic")

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic.ropsten, `https://ropsten.infura.io/v3/${INFURA_APIKEY}`)
      },
      network_id: 3,
      gas: 5500000,
      gasPrice: 10000000000,
    },

    main: {
      provider: function () {
        var wallet = new HDWalletProvider(mnemonic.main, `https://mainnet.infura.io/v3/${INFURA_APIKEY}`)
        var nonceTracker = new NonceTrackerSubprovider()
        wallet.engine._providers.unshift(nonceTracker)
        nonceTracker.setEngine(wallet.engine)
        return wallet
      },
      network_id: 1,
      gas: 5500000,
      gasPrice: 10000000000,
    },
  }
};
