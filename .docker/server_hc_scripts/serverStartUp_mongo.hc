#!/bin/bash
docker-entrypoint.sh
mongod
service ssh start
echo "starting ssh?"
exit 0