FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --fetch-retries=5 --fetch-timeout=120000

COPY . .

RUN npx prisma generate

EXPOSE 5050

CMD ["npm", "run", "dev"]
