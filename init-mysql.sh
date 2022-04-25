#!/bin/sh
sudo docker-compose exec database bash -c "chmod 0775 docker-entrypoint-initdb.d/init-database.sh"
sudo docker-compose exec database bash -c "./docker-entrypoint-initdb.d/init-database.sh"
