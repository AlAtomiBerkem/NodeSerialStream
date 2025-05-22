FROM node:18

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN npm install -g nodemon

CMD ["npm", "run", "dev"]