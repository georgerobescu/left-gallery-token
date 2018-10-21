var Contract = artifacts.require("works/BedroomCuboroStacks.sol")

module.exports = function (deployer) {
  deployer.deploy(Contract);
}
