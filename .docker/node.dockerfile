FROM node:11.9.0 as prod

RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    vim \
    ssh \
    openssh-client
    
ENV NODE_ENV=production

WORKDIR /node/app
COPY package*.json ./
RUN npm install --quiet && npm cache clean --force
RUN npm install -g nodemon --save


ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN useradd -m -s /bin/bash hcdronedock
COPY .docker/keys/hc_ecdsa_npp /home/hcdronedock/.ssh/
RUN chmod 700 /home/hcdronedock && chmod 600 /home/hcdronedock/.ssh/hc_ecdsa_npp \
  && chown hcdronedock:hcdronedock -R /home/hcdronedock/.ssh/

CMD ["npm","start"]