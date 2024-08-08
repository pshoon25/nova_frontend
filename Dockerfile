# 첫 번째 스테이지: Node.js를 사용한 빌드
FROM node:latest as build-stage

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

# 빌드된 파일을 특정 폴더에 복사
RUN mkdir -p /homepage/orummmedia/orummmedia_front/build && cp -r build /homepage/orummmedia/orummmedia_front/build

# 두 번째 스테이지: Nginx를 사용한 배포
FROM nginx:alpine as production-stage

# Nginx 설정 파일 복사 (옵션)
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 파일을 Nginx의 기본 루트 디렉토리로 복사
COPY --from=build-stage /homepage/orummmedia/orummmedia_front/build /usr/share/nginx/html

# 파일 권한 조정
RUN chmod -R 755 /usr/share/nginx/html

# Nginx 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
