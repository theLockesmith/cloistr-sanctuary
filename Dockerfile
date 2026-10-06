# Build stage
FROM node:22.23.3-alpine AS builder

WORKDIR /app

# Install git (needed for git dependencies) and pnpm
RUN apk add --no-cache git && corepack enable && corepack prepare pnpm@10.29.3 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source
COPY . .

# Build
RUN pnpm build

# Production stage
FROM nginxinc/nginx-unprivileged:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy config template — the base image's entrypoint runs envsubst on files
# in /etc/nginx/templates/ before starting nginx
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Production values as defaults: an unmodified deployment behaves identically
# to before this change. Staging overrides these at container start.
ENV CLOISTR_RELAY_URL=wss://relay.cloistr.xyz \
    CLOISTR_SIGNER_URL=https://signer.cloistr.xyz \
    CLOISTR_BLOSSOM_URL=https://files.cloistr.xyz \
    CLOISTR_DISCOVERY_URL=https://discover.cloistr.xyz \
    CLOISTR_APP_URL=https://cloistr.xyz \
    CLOISTR_ENVIRONMENT=production \
    CLOISTR_SVC_SPACE=https://space.cloistr.xyz \
    CLOISTR_SVC_TASKS=https://tasks.cloistr.xyz \
    CLOISTR_SVC_PAGES=https://pages.cloistr.xyz \
    CLOISTR_SVC_STASH=https://stash.cloistr.xyz \
    CLOISTR_SVC_EMAIL=https://email.cloistr.xyz \
    CLOISTR_SVC_VAULT=https://vault.cloistr.xyz \
    CLOISTR_SVC_ME=https://me.cloistr.xyz \
    CLOISTR_SVC_RELAY=https://relay.cloistr.xyz \
    CLOISTR_SVC_DISCOVER=https://discover.cloistr.xyz \
    NGINX_ENVSUBST_FILTER=^CLOISTR_

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
