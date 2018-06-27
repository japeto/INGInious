#!/bin/bash

SERVER="APACHE"

while getopts ":a" opt; do
    case $opt in
        a)
            SERVER="APACHE"
            ;;
        \?)
            echo "Invalid option -$OPTARG" >&2
            exit 1
            ;;
        :)
            echo "Option -$OPTARG requires an argument" >&2
            exit 1
            ;;
    esac
done

sudo chmod +x deployment_scripts/*
docker-compose up -d
sudo bash deployment_scripts/build_all_containers.sh
bash deployment_scripts/update_server.sh
bash deployment_scripts/setup_problem_bank.sh
if [ "$SERVER" == "APACHE" ]
then
    sudo bash deployment_scripts/deploy_apache_server.sh
fi