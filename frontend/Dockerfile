FROM node:alpine

WORKDIR /Users/kimkeonhyeong/Documents/Document/WebProject/cnupj/cnufirstpj

COPY package*.json ./

RUN npm install --force
COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
