var Contract = artifacts.require("works/Autobreeder.sol")

module.exports = function (deployer) {
  deployer.deploy(Contract);
}
