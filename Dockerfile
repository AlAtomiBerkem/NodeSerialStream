FROM node:18.18.2-alpine

RUN apk add --no-cache socat

WORKDIR /app

COPY . .

WORKDIR /app/server
RUN npm install

WORKDIR /app/client
RUN npm install
CMD ["npm", "run", "dev"]


WORKDIR /app/server
CMD ["npm", "run", "dev"]


# FROM mcr.microsoft.com/windows/servercore:ltsc2022

# RUN powershell -Command " \
#     Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.18.2/node-v18.18.2-x64.msi' -OutFile 'node.msi'; \
#     Start-Process -FilePath 'msiexec.exe' -ArgumentList '/i', 'node.msi', '/quiet', '/norestart' -Wait; \
#     Remove-Item -Path 'node.msi'"

# WORKDIR /app

# COPY . .

# WORKDIR /app/server
# RUN npm install

# WORKDIR /app/client
# RUN npm install
# RUN npm run build  # Собираем React-приложение

# WORKDIR /app/server
# CMD ["npm", "start"]