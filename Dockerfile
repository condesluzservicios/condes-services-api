FROM node:18.12.1

WORKDIR /home/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]