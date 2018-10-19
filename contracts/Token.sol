pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Token is ERC721Token, Ownable {
  uint256 editionSize;
  mapping(string => uint256) internal URIToTokenId;

  constructor(string _name, string _symbol, uint256 _editionSize) ERC721Token(_name, _symbol) public {
    editionSize = _editionSize;
  }

  function getEditionSize() external view returns (uint256) {
    return editionSize;
  }

  function tokenIdByUri(string _URI) external view returns (uint256) {
    uint256 tokenId = URIToTokenId[_URI];
    require(exists(tokenId));
    return tokenId;
  }

  function mint(address _to, string _URI) external onlyOwner {
    require(!exists(URIToTokenId[_URI]));
    require(
      totalSupply() < editionSize,
      "amount minted should not exceed maximum edition size"
    );

    uint256 newTokenId = totalSupply().add(1);

    _mint(_to, newTokenId);

    _setTokenURI(newTokenId, _URI);
    URIToTokenId[_URI] = newTokenId;
  }

  function burn(uint256 _tokenId) external {
    address owner = ownerOf(_tokenId);
    require(msg.sender == owner);
    URIToTokenId[tokenURIs[_tokenId]] = 0;
    _burn(owner, _tokenId);
  }
}
