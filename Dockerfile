FROM node:22-bookworm

# Install Python
RUN apt-get update \
    && apt-get install -y python3 python3-pip python3-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Backend dependencies
COPY backend/package*.json ./backend/

WORKDIR /app/backend

RUN npm install --omit=dev

# ML dependencies
WORKDIR /app/ml

COPY ml/requirements.txt ./requirements.txt

RUN python3 -m venv .venv \
    && .venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy entire project
WORKDIR /app

COPY backend ./backend
COPY ml ./ml

WORKDIR /app/backend

ENV NODE_ENV=production

EXPOSE 10000

CMD ["npm", "start"]