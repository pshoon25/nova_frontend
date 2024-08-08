# Node.js 기반 이미지 사용
FROM node:14 as build-stage

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 필요한 라이브러리 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 리액트 앱 빌드
RUN npm run build

# Nginx를 이용해 빌드된 파일을 서빙
FROM nginx:alpine as production-stage

# Nginx 설정 파일 복사 (옵션)
# COPY nginx.conf /etc/nginx/nginx.conf

# Nginx의 기본 루트 디렉토리로 빌드된 파일을 복사
COPY --from=build-stage /app/build /usr/share/nginx/html

# Nginx 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
