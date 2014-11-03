#!/bin/zsh

# set user variables
SOURCEFOLDER='Sources'
USR='Project'
VERSION='prod'
SERVER='delirium.cloudapp.net'

# Deploy sources
cd ~/$SOURCEFOLDER/$USR
grunt $VERSION

# Run the app
APPSCRIPT='sudo cp /home/'$USR-$VERSION'/'$USR'/sh/'$VERSION'/nginx.conf /etc/nginx/sites-available/'$USR-$VERSION' ;\
sudo ln -s /etc/nginx/sites-available/'$USR-$VERSION' /etc/nginx/sites-enabled/ ;\
sudo service nginx reload ;\
cd /home/'$USR-$VERSION'/'$USR'/ ;\
npm install --production ;\
export NODE_ENV='$VERSION' ;\
forever stop app.js ;\
forever start app.js'
ssh -t $USR-$VERSION@$SERVER "$APPSCRIPT"