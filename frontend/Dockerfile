FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY env.sh /docker-entrypoint.d/40-env-subst.sh
RUN chmod +x /docker-entrypoint.d/40-env-subst.sh
CMD ["nginx", "-g", "daemon off;"]
