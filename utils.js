const Web3 = require("web3");
const bedaContract = require("./contracts/bedaNFT.json");
const web3 = new Web3("wss://matic-testnet-archive-ws.bwarelabs.com");

const address = "0xda6bb65eb79847c15359ea0ea89940320770ebbd";
const contract = new web3.eth.Contract(bedaContract.abi, address);

const getDate = async () => {
  let result = await contract.methods.getNextGenTime().call();

  result = Number.parseInt(result);
  let test = new Date(result);
  return test.toUTCString();
};

const getAllTokens = async () => {
  const opensea_url =
    "https://testnets.opensea.io/assets/mumbai/0xda6bb65eb79847c15359ea0ea89940320770ebbd/";
  let counts = await contract.methods.tokenCounter().call();
  let tokens = [];
  for (let i = 0; i < counts; i++) {
    let token_object = await contract.methods.tokenURI(i).call();
    let token_owner = await contract.methods.ownerOf(i).call();
    let token_name = token_object["name"];
    let token_desc = token_object["description"];
    let token_img_uri = token_object["image"];
    tokens.push({
      id: i,
      img_uri: token_img_uri,
      name: token_name,
      token: token_desc,
      url: opensea_url + "/" + i,
      owner: token_owner,
    });
  }
  return tokens;
};

module.exports = { getDate, getAllTokens };
