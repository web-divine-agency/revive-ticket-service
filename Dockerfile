FROM node:20.18.0-alpine

WORKDIR /var/www/revive-ticket-service

COPY package.json /

RUN rm -rf node_modules \
  && rm -rf package-lock.json \
  && npm install -g nodemon \
  && npm install

COPY . .

EXPOSE 8803 4403

CMD ["npm", "start"]