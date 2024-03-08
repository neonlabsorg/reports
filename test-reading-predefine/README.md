## Setup terminal commands:
* ```npm install``` - Downloading required packages.

## Deployment terminal commands:
* ```npx hardhat run scripts/deploy.js --network neondevnet```

### Before starting make sure to create .env file containing the following data ( make a copy of .env.example file and rename it to .env ):
```
    PRIVATE_KEY_OWNER=XYZ
```
- *PRIVATE_KEY_OWNER - the private key used to deploy the contracts.*