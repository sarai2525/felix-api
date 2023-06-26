FROM node:19

WORKDIR /app

COPY package*.json /
COPY .env /.env
COPY . .

RUN npm install -g pnpm install
RUN pnpm install

EXPOSE 8000

CMD ["pnpm", "dev"]
