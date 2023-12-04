#!/bin/bash
git remote add subtree http://10.12.97.1/galaxy-frontend/galaxy-common.git
git subtree add --prefix=src/common subtree master
