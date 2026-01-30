# ──────────────────────────────────────────
# 1) Build Stage
# ──────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ──────────────────────────────────────────
# 2) Static File Server (Nginx)
# ──────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]