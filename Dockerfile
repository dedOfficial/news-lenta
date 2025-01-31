FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .

CMD ["node", "src/server/server.js"]
RUN npm start
