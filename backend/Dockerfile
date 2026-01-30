FROM node:18-alpine AS build
WORKDIR /app

COPY .env .env
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY .env .env
COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 5001
CMD ["node", "dist/app.js"]
