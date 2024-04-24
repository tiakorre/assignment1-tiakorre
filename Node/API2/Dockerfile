 
FROM mcr.microsoft.com/azure-functions/node:4-node16

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY package.json /home/site/wwwroot/package.json
RUN cd /home/site/wwwroot && \
    npm install

COPY . /home/site/wwwroot
