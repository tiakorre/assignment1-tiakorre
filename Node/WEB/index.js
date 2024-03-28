const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { DefaultAzureCredential, SecretClient } = require("@azure/keyvault-secrets");

 
const credential = new DefaultAzureCredential();
const vaultUrl = "https://tiakorrekv.vault.azure.net/"; 
const secretName = "secret1";

const secretClient = new SecretClient(vaultUrl, credential);

app.use('/', express.static('frontend/build'));

app.get('/api', async (req, res) => {
  try {
    const secret = await secretClient.getSecret(secretName);
    res.send(`Hello, world! This is ${secret.value}`);
  } catch (error) {
    console.error("Error fetching secret:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
