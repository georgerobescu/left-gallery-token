var Contract = artifacts.require("works/Tumpin.sol")

module.exports = function (deployer) {
  deployer.deploy(Contract);
}
