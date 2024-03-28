import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { DefaultAzureCredential, SecretClient } from "@azure/identity";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const credential = new DefaultAzureCredential();
    const vaultUrl = "https://tiakorrekv.vault.azure.net/";

    const secretClient = new SecretClient(vaultUrl, credential);

    try {
     
        const secretName = "secret2"; // Replace with the name of your secret
        const secretValue = await secretClient.getSecret(secretName);
        context.log('Retrieved secret value:', secretValue.value);    
        const responseMessage = `Today's date is: ${new Date().toLocaleDateString()}. Secret value retrieved from Key Vault: ${secretValue.value}`;
        context.res = {
            body: responseMessage
        };
    } catch (error) {
        context.log.error("Error retrieving secret:", error.message);
        context.res = {
            status: 500,
            body: "Internal Server Error"
        };
    }
};

export default httpTrigger;
