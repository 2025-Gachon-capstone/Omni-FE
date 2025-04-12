# 1단계: React (Vite) 빌드
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ARG VITE_VERIFY_SPONSOR_API_KEY
ENV VITE_VERIFY_SPONSOR_API_KEY=$VITE_VERIFY_SPONSOR_API_KEY

RUN yarn build

# 2단계: Nginx로 정적 파일 서빙
FROM nginx:stable-alpine

# Vite 빌드 결과 복사 (dist → nginx html)
COPY --from=builder /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
