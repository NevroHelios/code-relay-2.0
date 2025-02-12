```
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

```
npx hardhat node
```
- take the first private addres and then go the metamask -> import wallet -> paste it to get 1000 ETH
```
npx hardhat run scripts/deploy.js --network localhost
```
- after deployment put the contract address in the .env file
```
npx hardhat test
```



contribuition.tsx