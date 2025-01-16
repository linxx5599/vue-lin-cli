# 构建阶段
FROM m.daocloud.io/docker.io/library/node:20-alpine as builder

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM m.daocloud.io/docker.io/library/node:20-alpine

WORKDIR /app

# 安装 PM2
RUN npm install pm2 -g

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 仅安装生产依赖
RUN npm ci --only=production

# 从构建阶段复制编译后的代码
COPY --from=builder /app/dist ./dist

# 创建 PM2 配置文件
COPY ecosystem.config.js ./

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

