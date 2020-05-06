#!/bin/sh
#
#使用方法
#yqvod : front_deploy.sh yqvod-fe
#admin : front_deploy.sh admin-v2-fe
#


GIT_HOME=/developer/git-repository/
DEST_PATH=/film/front/

# cd dir
if [ ! -n "$1" ];
    then
    echo -e "Please input a project name! You can input as follows:"
    echo -e "./fe-deploy.sh yqvod-fe"
    echo -e "./fe-deploy.sh admin-v2-fe"
    exit
fi

if [ $1 = "yqvod-fe" ];
    then 
    echo -e "==========Enter yqvod-fe========="
    cd $GIT_HOME$1

elif [ $1 = "admin-v2-fe" ];
      then
      echo -e "==========Enter admin-v2-fe========="
      cd $GIT_HOME$1
else
    echo -e "Invalid Project Name!"
    exit
fi

# clean git dist
echo -e "==========Clean Git Dist========="
rm -rf ./dist

# git 操作
echo -e "==========git checkout master========="
git checkout master

echo -e "==========git pull========="
git pull

# npm install
echo -e "==========npm install========="
npm install --registry=https://registry.npm.taobao.org

# npm run dist
echo -e "==========npm run dist========="
npm run dist

if [ -d "./dist" ];
    then
    # backup dest
    echo -e "==========dest backup========="
    sudo mv $DEST_PATH$1/dist $DEST_PATH$1/dist.bak

    echo -e "==========copy========="
    # copy
    sudo cp -R ./dist $DEST_PATH$1/dist
    
    # echo result
    echo -e "==========Deploy Success========="
 else
    echo -e "==========Deploy Error========="
fi







