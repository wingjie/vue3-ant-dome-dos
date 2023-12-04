### git subtree

#### 添加子仓库命令
  ##### 将子仓库远程源地址添加本地
git remote add subtree http://10.12.97.1/galaxy-frontend/galaxy-common.git
  ##### 将子仓库添加本地具体位置命令
git subtree add --prefix=src/common subtree master

#### 拉取子git的命令
git subtree pull --prefix=src/common subtree master

#### 拉取子git的命令
git subtree push --prefix=src/common subtree master

#### 解决提交过慢或者报错的问题
git subtree split --prefix=src/common --rejoin