var Contract = artifacts.require("works/File.sol")

module.exports = function (deployer) {
  deployer.deploy(Contract);
}
