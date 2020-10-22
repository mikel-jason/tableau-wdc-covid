FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN npm install --production

ENTRYPOINT ["node", "index.js"]
EXPOSE 8080