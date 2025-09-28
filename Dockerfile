# Usa imagem oficial do Node.js
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências com cache limpo
RUN npm ci --omit=dev

# Copia o restante do projeto
COPY . .

# Garante que variáveis de ambiente sejam lidas no runtime
ENV NODE_ENV=production

# Expõe a porta padrão (Render define PORT automaticamente)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]