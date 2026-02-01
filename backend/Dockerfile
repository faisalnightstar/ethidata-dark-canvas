# ──────────────────────────────────────────
# 1) Build Stage
# ──────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files only (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source code only AFTER deps installed
COPY . .

# Build TypeScript → dist
RUN npm run build


# ──────────────────────────────────────────
# 2) Production Stage
# ──────────────────────────────────────────
FROM node:20-alpine AS prod
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built final output from stage 1
COPY --from=build /app/dist ./dist

# Create uploads folder & fix permissions
RUN mkdir -p /app/uploads \
    && addgroup -S nodegroup \
    && adduser -S nodeuser -G nodegroup \
    && chown -R nodeuser:nodegroup /app/uploads

USER nodeuser

EXPOSE 5001
CMD ["node", "dist/app.js"]
