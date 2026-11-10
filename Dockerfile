FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --maxsockets=1 --fetch-retries=5 --fetch-timeout=180000

COPY . .

RUN npx prisma generate

EXPOSE 5050

CMD ["npm", "run", "dev"]