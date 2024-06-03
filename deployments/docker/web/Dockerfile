FROM dockerhub.timeweb.cloud/library/node:16-alpine

WORKDIR /app

COPY websocket-client/package-lock.json websocket-client/package.json ./
COPY websocket-client/public ./public
COPY websocket-client/src ./src

RUN npm ci

USER root
RUN npm install react-scripts@3.0.1 -g --silent 
RUN npm install -g serve --save

CMD ["npm", "run", "start"]
