FROM node:slim as production
ENV PORT=${PORT}
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
