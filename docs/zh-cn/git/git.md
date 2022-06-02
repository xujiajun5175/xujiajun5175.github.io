### 本地项目上传gitee
1. 登录gitee创建仓库
2. 创建本地项目或者新建空文件夹
3. 在项目文件夹下,打开终端依次执行以下指令
   1. git init 仓库初始化
   2. git remote add origin 远程仓库地址
   3. git pull origin master
4. 本地提交修改
   1. git add .
   2. git commit -am "注释"
5. 提交远程
   1. git push origin master


### 撤销commit
1. git reset --soft HEAD^
   1. --mixed 不删除改动代码,撤销commit,撤销git add
   2. --soft 不删除改动代码,撤销commit,不撤销git add
   3. --hard 删除改动代码,撤销commit,撤销git add
2. 只修改commit注释
   1. git commit --amend 默认进入vim编辑器,修改保存退出即可
3. HEAD^
   1. HEAD^的意思是上一个版本，也可以写成HEAD~1
   2. 如果执行了两次commit,使用HEAD~2