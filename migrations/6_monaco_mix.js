var Contract = artifacts.require("works/MonacoMix.sol")

module.exports = function (deployer) {
  deployer.deploy(Contract);
}
