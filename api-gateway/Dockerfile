# Gunakan image Node.js sebagai base image
FROM node:20.16.0

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source code ke dalam container
COPY . .

# Set port yang akan digunakan
EXPOSE 5000

# Jalankan aplikasi menggunakan http-server
CMD ["node", "server.js"]
