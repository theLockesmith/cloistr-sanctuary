# Build stage - use Harbor proxy cache to avoid Docker Hub rate limits
FROM harbor.apps.weaponized-autism.empacchosting.com/dockerhub/library/node:22-alpine AS builder

WORKDIR /app

# Install git (needed for git dependencies) and pnpm
RUN apk add --no-cache git && corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source
COPY . .

# Build
RUN pnpm build

# Production stage - serve with unprivileged container for OpenShift
FROM harbor.apps.weaponized-autism.empacchosting.com/dockerhub/nginxinc/nginx-unprivileged:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
