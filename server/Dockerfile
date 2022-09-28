FROM node:16-alpine
WORKDIR /dist
COPY package.json .
RUN npm install
COPY . /dist
RUN npm run build
EXPOSE 3005
CMD ["node", "./dist/app.js"]

