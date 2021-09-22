# Blockchain Workshop: Blockchain Ethereum Digital Art (B.E.D.A)

* This is the backend module for the project BEDA or Blockchain Ethereum Digital Art Project. In this project we use an AI generative model to produce digital art as an NFT. 
We used Web3JS to interface between the frontend and the smart contract.

* Link to frontend repo: https://github.com/ahmedemad242/ProjectBeda/
* Link to the smart contract repo: https://github.com/mo-sameh/Blockchain-workshop


## How to install and use:
1* Type $(npm install) in the repo's terminal after cloning the repo
2* Type $(node app.js) and head to http://localhost:3500 to use the api
 
## API
* GET: /nextgen/date returns the date of the next generation
* GET: /assets/all returns all the tokens related to our contract
* GET: /assets redirects to /assets/(last id) returns the last added token  
* GET: /assets/(token_id) returns the data related to the token_id specified
