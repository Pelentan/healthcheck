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

CMD ["npm","start"]