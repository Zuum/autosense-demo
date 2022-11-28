#parent image
FROM node:16

#prepare working dir
RUN mkdir /home/app
#working directory - from where commands will originate
WORKDIR /home/app

#Moving package files to working dir to proceed with installation
COPY package*.json ./

# Install modules from package
RUN npm install --silent --progress=false --legacy-peer-deps

# Bundle app source
COPY . .

#What port will be exposed to system to access app
EXPOSE $PORT

#Build typescript
RUN npm run build

#Start up server
CMD [ "node", "./dist/index.js" ]
