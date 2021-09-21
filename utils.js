const Web3 = require("web3");
const bedaContract = require("./contracts/bedaNFT.json");

/*--server functions--*/
const web3 = new Web3("wss://matic-testnet-archive-ws.bwarelabs.com");
const address = "0xC84677187d8817c4768F6DE898DE7DC3b4Cb4a37";
const contract = new web3.eth.Contract(bedaContract.abi, address);
const opensea_url = "https://testnets.opensea.io/assets/mumbai/" + address;

/*--server functions--*/
//Gets the date of the next generation
const getNextGenDate = async () => {
  let result = await contract.methods.getNextGenTime().call();

  result = Number.parseInt(result);
  let test = new Date(result);
  return test.toUTCString();
};

//Gets all tokens data from the contract
const getAllTokens = async () => {
  // get all tokens
  let counts = await contract.methods.tokenCounter().call();
  let tokens = [];
  for (let i = 0; i < counts; i++) {
    let token_object = await contract.methods.tokenURI(i).call();
    let token_owner = await contract.methods.ownerOf(i).call();
    token_object = JSON.parse(token_object);

    //retrieve data to populate new object
    let token_name = token_object["name"];
    let token_desc = token_object["description"];
    let token_img_uri = token_object["image"];

    // add to tokens array
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

//Gets token data for specific item
const getToken = async (token_id) => {
  let token_object = await contract.methods.tokenURI(token_id).call();
  let token_owner = await contract.methods.ownerOf(token_id).call();
  token_object = JSON.parse(token_object);

  //retrieve data to populate new object
  let token_name = token_object["name"];
  let token_desc = token_object["description"];
  let token_img_uri = token_object["image"];

  const new_token = {
    id: token_id,
    img_uri: token_img_uri,
    name: token_name,
    token: token_desc,
    url: opensea_url + "/" + token_id,
    owner: token_owner,
  };

  return new_token;
};

module.exports = { getNextGenDate, getAllTokens, getToken };
