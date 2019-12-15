# blockchain_workaround
This is the front end for the tendermint blockchain system. 

To run the front end on a linux machine you will need [`npm`](https://www.npmjs.com/).

Once npm is installed run the following commands from the root directory of the cloned project. 

    `npm install`
  
    `npm run serve`
  
Run the standard tendermint example blockchain `kvstore` or `persistantkvstore`. 

    tendermint init
  
    tendermint node --proxy_app=kvstore
  
    or
  
    tendermint node --proxy_app=persistantkvstore
  
