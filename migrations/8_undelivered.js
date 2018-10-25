var Contract = artifacts.require("works/Undelivered.sol")

module.exports = function (deployer) {
  deployer.deploy(Contract);
}
