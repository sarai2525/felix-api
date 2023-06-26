FROM node:19

WORKDIR /app

COPY package*.json /
COPY .env /.env
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 8000

CMD ["node", "./dist/index.js"]
