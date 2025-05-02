FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/build /app/build
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]