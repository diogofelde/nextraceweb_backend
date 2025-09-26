# Usa imagem oficial do Node.js
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta que será definida pela variável de ambiente PORT
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]