FROM node:16

ENV NODE_ENV=production

WORKDIR /dist

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3005

CMD ["npm", "run", "start"]
