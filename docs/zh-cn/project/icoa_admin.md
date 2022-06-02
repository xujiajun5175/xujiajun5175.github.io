# ICOA-admin 管理系统

#### 数据库表结构概览

##### 系统-用户管理

1. `sys_menu` 菜单权限表

   ```sql
   
   DROP TABLE IF EXISTS `sys_menu`;
   CREATE TABLE `sys_menu` (
     `menu_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
     `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
     `parent_id` bigint(20) DEFAULT '0' COMMENT '父菜单ID',
     `order_num` int(4) DEFAULT '0' COMMENT '显示顺序',
     `path` varchar(200) DEFAULT '' COMMENT '路由地址',
     `component` varchar(255) DEFAULT NULL COMMENT '组件路径',
     `is_frame` int(1) DEFAULT '1' COMMENT '是否为外链（0是 1否）',
     `menu_type` char(1) DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
     `visible` char(1) DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
     `status` char(1) DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
     `perms` varchar(100) DEFAULT NULL COMMENT '权限标识',
     `icon` varchar(100) DEFAULT '#' COMMENT '菜单图标',
     `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
     `create_time` datetime DEFAULT NULL COMMENT '创建时间',
     `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
     `update_time` datetime DEFAULT NULL COMMENT '更新时间',
     `remark` varchar(500) DEFAULT '' COMMENT '备注',
     PRIMARY KEY (`menu_id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=2032 DEFAULT CHARSET=utf8 COMMENT='菜单权限表';
   ```

   

1. `sys_role_menu` 角色和菜单关联表

   ```sql
   
   DROP TABLE IF EXISTS `sys_role_menu`;
   CREATE TABLE `sys_role_menu` (
     `role_id` bigint(20) NOT NULL COMMENT '角色ID',
     `menu_id` bigint(20) NOT NULL COMMENT '菜单ID',
     PRIMARY KEY (`role_id`,`menu_id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色和菜单关联表';
   
   ```

   

1. `sys_user_role` 用户和角色关联表

   ```sql
   
   DROP TABLE IF EXISTS `sys_user_role`;
   CREATE TABLE `sys_user_role` (
     `user_id` bigint(20) NOT NULL COMMENT '用户ID',
     `role_id` bigint(20) NOT NULL COMMENT '角色ID',
     PRIMARY KEY (`user_id`,`role_id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户和角色关联表';
   
   SET FOREIGN_KEY_CHECKS = 1;
   
   ```

   

1. `sys_role` 角色信息表

   ```sql
   DROP TABLE IF EXISTS `sys_role`;
   CREATE TABLE `sys_role` (
     `role_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
     `role_name` varchar(30) NOT NULL COMMENT '角色名称',
     `role_key` varchar(100) NOT NULL COMMENT '角色权限字符串',
     `role_sort` int(4) NOT NULL COMMENT '显示顺序',
     `data_scope` char(1) DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
     `status` char(1) NOT NULL COMMENT '角色状态（0正常 1停用）',
     `del_flag` char(1) DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
     `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
     `create_time` datetime DEFAULT NULL COMMENT '创建时间',
     `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
     `update_time` datetime DEFAULT NULL COMMENT '更新时间',
     `remark` varchar(500) DEFAULT NULL COMMENT '备注',
     PRIMARY KEY (`role_id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COMMENT='角色信息表';
   ```

   

1. `sys_user`

   ```sql
   
   DROP TABLE IF EXISTS `sys_user`;
   CREATE TABLE `sys_user` (
     `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
     `dept_id` bigint(20) DEFAULT NULL COMMENT '部门ID',
     `user_name` varchar(30) NOT NULL COMMENT '用户账号',
     `nick_name` varchar(30) NOT NULL COMMENT '用户昵称',
     `user_type` varchar(2) DEFAULT '00' COMMENT '用户类型（00系统用户）',
     `province` varchar(255) DEFAULT NULL COMMENT '省',
     `province_adcode` varchar(255) DEFAULT NULL COMMENT '省adcode',
     `city` varchar(255) DEFAULT NULL COMMENT '市',
     `city_adcode` varchar(255) DEFAULT NULL COMMENT '市adcode',
     `county` varchar(255) DEFAULT NULL COMMENT '县',
     `county_adcode` varchar(255) DEFAULT NULL COMMENT '县adcode',
     `email` varchar(50) DEFAULT '' COMMENT '用户邮箱',
     `phonenumber` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '手机号码',
     `sex` char(1) DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
     `avatar` varchar(100) DEFAULT '' COMMENT '头像地址',
     `password` varchar(100) DEFAULT '' COMMENT '密码',
     `status` char(1) DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
     `del_flag` char(1) DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
     `login_ip` varchar(50) DEFAULT '' COMMENT '最后登陆IP',
     `login_date` datetime DEFAULT NULL COMMENT '最后登陆时间',
     `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
     `create_time` datetime DEFAULT NULL COMMENT '创建时间',
     `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
     `update_time` datetime DEFAULT NULL COMMENT '更新时间',
     `remark` varchar(500) DEFAULT NULL COMMENT '备注',
     PRIMARY KEY (`user_id`) USING BTREE,
     UNIQUE KEY `user_phone` (`user_name`) USING BTREE
   ) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8 COMMENT='用户信息表';
   
   ```

   

#### 接口相关

##### SysLoginController

1. `@GetMapping("getRouters")`
   1. 描述: 获取路由信息
   2. 路径:`getRouters`
   3. 类型: Get
   4. 参数: [LoginBody](123123) 
   5. 返回:  List [SysMenu](1111)
   6. 关联数据表:
      1. sys_menu
      2. sys_role_menu
      3. sys_user_role
      4. sys_role
      5. sys_user
2. 
3. `@GetMapping("getInfo")`
4. `@PostMapping("/login")`





#### 对象模型

##### 请求 reqeust

1. LoginBody

##### 视图 vo

1. SysMenu

   - 描述:路由配置信息
   - 作者:

   

##### 

