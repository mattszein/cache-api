FROM node:14-alpine
RUN mkdir /cache-api
WORKDIR /cache-api
COPY package*.json /cache-api/
RUN npm install
COPY . /cache-api
CMD npm start
