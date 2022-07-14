# mybatis <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

#### collection 实现三级级联

##### 表结构

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for icoa_subject_type
-- ----------------------------
DROP TABLE IF EXISTS `icoa_subject_type`;
CREATE TABLE `icoa_subject_type` (
  `subject_type_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '数据类别ID',
  `industry_id` bigint(20) NOT NULL COMMENT '行业ID',
  `parent_id` bigint(20) NOT NULL COMMENT '父类别ID',
  `subject_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据类别名称',
  `subject_status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '状态(0启用,1停用)',
  `subject_sort` int(4) NOT NULL COMMENT '排序',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_by` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新者',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `weight` double DEFAULT NULL COMMENT '权重',
  `dict_type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '字典值',
  `unit` varchar(30) DEFAULT '' COMMENT '计量单位',
  `grade_mode` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '评级方式(0取长,1取短)',
  `tree_level` int(1) DEFAULT NULL COMMENT '树结构层级(由小到大)',
  PRIMARY KEY (`subject_type_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COMMENT='业务模块-评级分类(问题)';

```

![image-20220713170050097](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/YFIzX4000image-20220713170050097.png)

##### Java 实体

```java
@Data
@ApiModel("分类信息对象")
public class SubjectTypeBody {
    @ApiModelProperty("分类id")
    private Long id;

    @ApiModelProperty("分类名称")
    private String label;

    @ApiModelProperty("子品类")
    private List<SubjectTypeBody> children = new ArrayList<>();
}
```

##### XML 配置

```xml
 <resultMap id="SubjectTypeTreeResultMap" type="com.ruoyi.common.core.domain.model.SubjectTypeBody">
        <id column="l1_id" property="id"/>
        <result column="l1_label" property="label"/>
        <collection property="children" ofType="com.ruoyi.common.core.domain.model.SubjectTypeBody"
                    javaType="java.util.ArrayList">
            <id column="l2_id" property="id"/>
            <result column="l2_label" property="label"/>
            <collection property="children" ofType="com.ruoyi.common.core.domain.model.SubjectTypeBody"
                        javaType="java.util.ArrayList">
                <id column="l3_id" property="id"/>
                <result column="l3_label" property="label"/>
            </collection>
        </collection>
    </resultMap>
    <select id="selectSubjectTypeTree" resultMap="SubjectTypeTreeResultMap">
        SELECT level1.subject_name    l1_label,
               level1.subject_type_id l1_id,
               level2.subject_name    l2_label,
               level2.subject_type_id l2_id,
               level3.subject_name    l3_label,
               level3.subject_type_id l3_id
        from icoa_subject_type level1
                 left JOIN icoa_subject_type level2 on level2.parent_id = level1.subject_type_id
                 left JOIN icoa_subject_type level3 on level3.parent_id = level2.subject_type_id
        where level1.parent_id = 0
          and level1.industry_id = 6
          and level1.subject_status = "0"
          and level2.subject_status = "0"
          and level3.subject_status = "0"
        order by level1.subject_sort, level2.subject_sort, level3.subject_sort
    </select>
```

##### mapper 映射

```java
 /**
     * 根据行业id获取评级分类
     *
     * @param industryId
     * @return
     */
    List<SubjectTypeBody> selectSubjectTypeTree(@Param("industryId") Long industryId);
```

##### service 服务

```java
/**
     * 根据行业id获取评级分类
     *
     * @param industryId
     * @return
     */
    List<SubjectTypeBody> selectSubjectTypeTree(Long industryId);
```

##### controller

```java
@GetMapping("getInfo")
    public AjaxResult getInfo() {
        IcoaUser user = SecurityUtils.getLoginUser().getUser();
        List<SubjectTypeBody> subjectTypes = subjectService.selectSubjectTypeTree(industryId);
        //获取subject所有树形结构
        ajax.put("subject", subjectTypes);
        return ajax;
    }
```

##### 请求结果

![image-20220713170206171](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/HR9sHk000image-20220713170206171.png)
