FROM node:18

# create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

EXPOSE 5002

CMD [ "node", "index.js" ]