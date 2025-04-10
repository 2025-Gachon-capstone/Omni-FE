# 1단계: React 빌드
FROM node:20-alpine AS builder

WORKDIR /app

# Yarn 관련 파일 복사
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn build

# 2단계: Nginx로 정적 파일 서빙
FROM nginx:stable-alpine

# React 빌드 결과 복사
COPY --from=builder /app/build /usr/share/nginx/html

# 포트 노출
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
