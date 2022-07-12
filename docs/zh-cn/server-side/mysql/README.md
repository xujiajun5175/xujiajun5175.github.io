# MySQL

**文档更新日期: {docsify-updated}**

### 查询语句

### 常用函数

#### 获取最后添加的 id

```sql
select @名称 := last_insert_id();
```





#### 重置自动递增

```sql
ALTER TABLE icoa_company AUTO_INCREMENT = 1
```

