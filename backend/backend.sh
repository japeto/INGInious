#!/bin/bash

# Starts the docker-agent module from inginious
set -e

inginious-backend tcp://127.0.0.1:2001 tcp://127.0.0.1:2000
