
# mybatis-plus


@tableid(value =“id”,type=IdType.ID_WORKER_STR). 如果是Long用ID_WORKER，String用ID_WORKER_STR。





能查询到英文 不能中文 还有 时区问题

数据库配置中添加  ?serverTimezone=GMT%2B8&characterEncoding=utf-8





```java
@ApiModelProperty(value = "乐观锁")

@TableField(fill = FieldFill.*INSERT*)

*private* Long version;

@ApiModelProperty(value = "创建时间",example = "2019-01-01 8:00:00")

@TableField(fill = FieldFill.*INSERT*) *//*自动注入 新增

*private* Date gmtCreate;`

@ApiModelProperty(value = "更新时间", example = "2019-01-01 8:00:00")

@TableField(fill = FieldFill.*INSERT_UPDATE*)

*private* Date gmtModified;
```








主键策略input

@ApiModelProperty(value = "课程ID")

@TableId(value = "id", type = IdType.*INPUT*). //。手动输入的id

*private* String id;







lt：less than 小于

le：less than or equal to 小于等于

eq：equal to 等于

ne：not equal to 不等于

ge：greater than or equal to 大于等于

gt：greater than 大于