#!/bin/bash

# set user variables
USR='Project'
VERSION='pre'
ROOT='dailydinities'
SERVER='delirium.cloudapp.net'

# Create User
USRSCRIPT='sudo useradd '$USR-$VERSION'; \
sudo passwd '$USR-$VERSION' \
sudo mkdir /home/'$USR-$VERSION'; \
sudo adduser '$USR-$VERSION' sudo; \
cd /home/'$USR-$VERSION'/; \
sudo chown -Rv '$USR-$VERSION' /home/'$USR-$VERSION'/; \
sudo mkdir /home/'$USR-$VERSION'/'$USR'; \
sudo chown -Rv '$USR-$VERSION' /home/'$USR-$VERSION/$USR'/'
ssh $ROOT@$SERVER "$USRSCRIPT"

# Run the app
APPSCRIPT='npm install forever -g ;\
npm install azure-cli -g'
#ssh -t $USR-$VERSION@$SERVER "$APPSCRIPT"
