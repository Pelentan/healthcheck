FROM mongo:4.2.0 as prod

RUN apt-get update && apt-get install -qy \ 
    ca-certificates \
    libfontconfig \
    vim \
    ssh \
    openssh-server \
    openssh-client

RUN systemctl enable ssh.service

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN useradd -m -s /bin/rbash hcdronedock
COPY .docker/keys/hc_ecdsa_npp.pub /home/hcdronedock/.ssh/authorized_keys
RUN chmod 700 /home/hcdronedock/.ssh \
  && chmod 600 /home/hcdronedock/.ssh/authorized_keys \
  && chown -R hcdronedock:hcdronedock /home/hcdronedock/.ssh/
COPY .docker/server_hc_scripts/genericServerTests.sh /home/hcdronedock/scripts/hc_server_checks.hc
COPY .docker/server_hc_scripts/serverStartUp_mongo.hc /etc/init.d/serverStartUp_mongo.hc
#ENTRYPOINT [ "service", "ssh", "start" ]
#CMD bash /etc/init.d/serverStartUp_mongo.hc