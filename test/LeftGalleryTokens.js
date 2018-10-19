const WorkContract = artifacts.require("../contracts/works/EventListeners.sol");

contract("WorkContract", function (accounts) {

  const creator = accounts[0];
  const somebodyElse = accounts[6];
  const workId = 666;

  beforeEach(async function () {
    this.token = await WorkContract.new({ from: creator });
  });

  it("returns the edition size", async function () {
    const editionSize = await this.token.getEditionSize();
    assert.equal(editionSize, 100);
  });

  it("returns a tokenId by metadataUri", async function () {
    const uri = "https://left.gallery/tokens/metadata/2344234";
    await this.token.mint(creator, uri, { from: creator });

    assert.equal(await this.token.tokenIdByUri(uri), 1);
  });

  it("returns a metadata Uri by tokenId", async function () {
    const uri = "https://left.gallery/tokens/metadata/2344234";
    await this.token.mint(creator, uri, { from: creator });

    assert.equal(await this.token.tokenURI(1), uri);
  });

  it("should not return a token id for burned tokens", async function () {
    const uri = "https://left.gallery/tokens/metadata/2344234";
    await this.token.mint(creator, uri, { from: creator });

    const tokenId = await this.token.tokenIdByUri(uri);

    this.token.burn(tokenId);

    let itThrew = false;
    try {
      assert.equal(await this.token.tokenIdByUri(uri), 0);
    } catch (err) {
      itThrew = true;
    }

    assert(itThrew)
  });

  it("does not allow duplicate meta data uris", async function () {
    const uri = "https://left.gallery/tokens/metadata/2344234";
    await this.token.mint(creator, uri, { from: creator });
    let itThrew = false;
    try {
      await this.token.mint(creator, uri, { from: creator });
    } catch (err) {
      itThrew = true;
    }

    assert(itThrew)
  });

  // it("complains if more than the allowed amount of tokens are minted", async function () {
  //   for (let i=0; i < 100; i++) {
  //     await this.token.mint(creator, `https://left.gallery/tokens/metadata/${i}`, { from: creator });
  //   }
  //
  //   let itThrew = false;
  //   try {
  //     await this.token.mint(creator, "https://left.gallery/tokens/metadata/101", {from: creator});
  //   } catch (err) {
  //     itThrew = true;
  //   }
  //
  //   assert.equal(itThrew, true);
  //
  // })

  // it ("does not allow for one edition to be set more than once", async function () {
  //   await this.token.setEditionSize(workId, 5, { from: creator });
  //
  //   let itThrew = false
  //   try {
  //     await this.token.setEditionSize(workId, 6, {from: creator});
  //   } catch (err) {
  //     itThrew = true;
  //   }
  //
  //   assert.equal(itThrew, true);
  //   const editionSize5 = await this.token.getEditionSize(workId);
  //
  //   assert.equal(editionSize5, 5);
  // });
  //
  // it ("cannot mint if no edition size has been set", async function () {
  //   let itThrew = false
  //   try {
  //     await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/324234234234234", {from: creator});
  //   } catch (err) {
  //     itThrew = true;
  //   }
  //
  //   assert.equal(itThrew, true);
  // });
  //
  // it ("keeps track of the amount of editions minted", async function () {
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 0);
  //
  //   await this.token.setEditionSize(workId, 5, { from: creator });
  //   const editionSize5 = await this.token.getEditionSize(workId);
  //   assert.equal(editionSize5, 5);
  //
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/324234234234234", { from: creator });
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 1);
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/abaa8a37b", { from: creator });
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 2);
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/342aba3a8a37b", { from: creator });
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 3);
  // });
  //
  // it ("obeys the maximum mint count per edition", async function () {
  //   await this.token.setEditionSize(workId, 2, { from: creator });
  //
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/324234234234234", { from: creator });
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/abaa8a37b", { from: creator });
  //
  //   let itThrew = false;
  //   try {
  //     await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/342aba3a8a37b", {from: creator});
  //   } catch (err) {
  //     itThrew = true;
  //   }
  //
  //   assert(itThrew);
  //   const mintedCount = await this.token.getEditionsMintedCount(workId);
  //
  //   assert.equal(mintedCount, 2);
  // });
  //
  // it("iterates over minted tokens of a particular work", async function () {
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 0);
  //   await this.token.setEditionSize(workId, 5, { from: creator });
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 0);
  //
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/413", { from: creator });
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/414", { from: creator });
  //
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 2);
  //
  //   const tokenId1 = await this.token.getTokenIdByWorkByIndex(workId, 0)
  //   const tokenId2 = await this.token.getTokenIdByWorkByIndex(workId, 1)
  //
  //   assert.equal(tokenId1, 1);
  //   assert.equal(tokenId2, 2);
  //
  //   let itThrew = false;
  //   try {
  //     await this.token.getTokenIdByWorkByIndex(workId, 2)
  //   } catch (err) {
  //     itThrew = true;
  //   }
  //   assert(itThrew);
  // });
  //
  // it("returns metadata uri by token id", async function () {
  //   await this.token.setEditionSize(workId, 5, { from: creator });
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/413", { from: creator });
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/414", { from: creator });
  //
  //   const tokenId2 = await this.token.getTokenIdByWorkByIndex(workId, 1)
  //   const tokenId1 = await this.token.getTokenIdByWorkByIndex(workId, 0)
  //
  //   assert.equal(tokenId1, 1);
  //   assert.equal(await this.token.tokenURI(tokenId1), "https://left.gallery/tokens/metadata/413");
  //   assert.equal(tokenId2, 2);
  //   assert.equal(await this.token.tokenURI(tokenId2), "https://left.gallery/tokens/metadata/414");
  // });
  //
  // it("can burn an edition", async function () {
  //   await this.token.setEditionSize(workId, 5, { from: creator });
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/413", { from: creator });
  //   await this.token.mint(workId, creator, "https://left.gallery/tokens/metadata/414", { from: creator });
  //
  //   const tokenIdToBurn = 1;
  //   const tokenIdToKeep = 2;
  //   assert.equal(await this.token.totalSupply(), 2);
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 2);
  //
  //   await this.token.burn(tokenIdToBurn);
  //
  //   assert.equal(await this.token.totalSupply(), 1);
  //   assert.equal(await this.token.getEditionsMintedCount(workId), 1);
  //   assert.equal(await this.token.tokenURI(tokenIdToKeep), "https://left.gallery/tokens/metadata/414");
  // });
  //
  // it("cannot burn a token if you do not own it", async function () {
  //   await this.token.setEditionSize(workId, 5, { from: creator });
  //   await this.token.mint(workId, somebodyElse, "https://left.gallery/tokens/metadata/414", { from: creator });
  //
  //   assert.equal(await this.token.totalSupply(), 1);
  //   let itThrew = false;
  //   try {
  //     await this.token.burn(1);
  //   } catch (err) {
  //     itThrew = true;
  //   }
  //
  //   assert(itThrew);
  // });
});
