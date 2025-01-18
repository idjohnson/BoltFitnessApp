FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

#RUN npm ci --omit=dev

COPY . .

RUN npm install

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package.json package-lock.json ./

#RUN npm ci --omit=dev --production

EXPOSE 5173

CMD ["npx", "vite", "preview", "--port", "5173", "--host"]
