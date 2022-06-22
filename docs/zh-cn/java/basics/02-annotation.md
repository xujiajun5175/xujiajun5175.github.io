### 自定义注解  <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 1.meta-annotation 元注解

Java从JDK5.0开始便提供了四个meta-annotation用于自定义注解的时候使用，这四个注解为：*@Target*，*@Retention*，*@Documented* 和*@Inherited*。

*@Target*：用于描述注解的使用范围（即：被描述的注解可以用在什么地方），其源码如下：

```java

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Target {

    ElementType[] value();
}
```

可见*@Target* 注解只有唯一成员value，类型为ElementType数组。查看ElementType的源码可以发现，ElementType可取的值有：

1. **CONSTRUCTOR**：用于描述构造器；
2. **FIELD**：用于描述成员变量；
3. **LOCAL_VARIABLE**：用于描述局部变量；
4. **METHOD**：用于描述方法；
5. **PACKAGE**：用于描述包；
6. **PARAMETER**：用于描述参数；
7. **TYPE**：用于描述类、接口(包括注解类型) 或enum声明。

*@Retention*：指定被描述的注解在什么范围内有效。源码如下：

```java

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Retention {

    RetentionPolicy value();
}
```

其中RetentionPolicy可取的值有：

1. **SOURCE**：在源文件中有效（即源文件保留）；
2. **CLASS**：在class文件中有效（即class保留）；
3. **RUNTIME**：在运行时有效（即运行时保留）。

*@Documented*：是一个标记注解，木有成员，用于描述其它类型的annotation应该被作为被标注的程序成员的公共API，因此可以被例如javadoc此类的工具文档化。

*@Inherited*：元注解是一个标记注解，*@Inherited*阐述了某个被标注的类型是被继承的。如果一个使用了*@Inherited*修饰的annotation类型被用于一个class，则这个annotation将被用于该class的子类。

#### 2.自定义annotation

用*@interface* 自定义注解时，自动继承了java.lang.annotation.Annotation接口，由编译程序自动完成其他细节。在定义注解时，不能继承其他的注解或接口。*@interface* 用来声明一个注解，其中的每一个方法实际上是声明了一个成员。方法的名称就是成员的名称，返回值类型就是成员的类型。可以通过default来声明参数的默认值。

自定义注解的基本格式为：

```java
public @interface AnnotationName {
    // ...
}
```

Annotation的成员定义必须满足以下三点：

1. 成员只能用public或默认(default)这两个访问权修饰；
2. 成员的类型只能是基本类型，String，Enum，Class，Annotation以及它们的数组类型；
3. 如果只有一个成员，最好将其名称设为value。

AnnotatedElement代表被注解的元素，其包含许多方法，如下图所示：

![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/UOcrFb.png)

其中主要的几个方法有：

```java
<T extends Annotation> T getAnnotation(Class<T> annotationType) // 根据annotationType获取注解对象
        Annotation[]getAnnotations() // 获取所有注解
        boolean isAnnotationPresent(Class<T> annotationType) // 判断当前元素是否被annotationType注解
        Annotation[]getDeclareAnnotations() // 与getAnnotations() 类似，但是不包括父类中被Inherited修饰的注解
```

#### 3.实战

假如现在有一个数据库表对应的POJO被一些自定义注解所标记，现在要根据这个POJO自动生成创建库表的SQL语句。其中POJO代码如下:

```java

@Table(name = "Student")
class Bean {
    @Column(name = "age", length = 3)
    int age;

    @Column(name = "userName", length = 10)
    String name;

    @Column(name = "birthday", defaultValue = "sysdate")
    Date birthday;
}
```

需要生成类似如下的SQL语句：

```sql
create table Student
(
    age NUMBER (3),
    userName VARCHAR2 (10),
    birthday DATE default sysdate
)

```

Bean类被@Table 注解所标记，所以需要定义一个ElementType.TYPE级别的注解：

```java

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Table {
    String name(); // name用来设置表名
}
```

而@Column 注解标注于Bean的成员变量，并且包含三个成员：

```java

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Column {
    String name() default ""; //字段名
    int length() default 0; //字段长度
    String defaultValue() default ""; //默认值
}

```

```java
package com.xujiajun.annotation;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TestUtils {
    private static String getTableName(Class<?> bean) {
        String name = null;
        //判断是否是@table注解
        if (bean.isAnnotationPresent(Table.class)) {
            //获取注解对象
            Annotation annotation = bean.getAnnotation(Table.class);
            try {
                //获取@table注解对应的name
                Method method = Table.class.getMethod("name");
                name = (String) method.invoke(annotation);
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return name;
    }

    private static List<ColumnBean> getColumns(Class<?> bean) {
        List<ColumnBean> columns = new ArrayList<>();
        Field[] fields = bean.getDeclaredFields();
        if (fields != null) {
            //获取所有成员变量的注解信息
            for (int i = 0; i < fields.length; i++) {
                Field field = fields[i];
                //判断是否被@column标记
                if (field.isAnnotationPresent(Column.class)) {
                    String name = null;
                    int length = 0;
                    String defaultValue = null;
                    String type = null;
                    //分别获取注解@Column中的成员的值
                    Annotation annotation = field.getAnnotation(Column.class);
                    try {
                        Method nameMethod = Column.class.getMethod("name");
                        name = (String) nameMethod.invoke(annotation);
                        Method rangeMethod = Column.class.getMethod("length");
                        length = (Integer) rangeMethod.invoke(annotation);
                        Method defaultValueMethod = Column.class.getMethod("defaultValue");
                        defaultValue = (String) defaultValueMethod.invoke(annotation);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    //判断类型 java -> sql
                    // 判断类型，Java类型转换为数据库类型
                    if (int.class.isAssignableFrom(field.getType())
                            || Integer.class.isAssignableFrom(field.getType())) {
                        type = "NUMBER";
                    } else if (String.class.isAssignableFrom(field.getType())) {
                        type = "VARCHAR";
                    } else if (Date.class.isAssignableFrom(field.getType())) {
                        type = "DATE";
                    } else {
                        throw new RuntimeException("unspported type=" + field.getType().getSimpleName());
                    }
                    columns.add(new ColumnBean(type, name, length, defaultValue));
                }
            }
        }
        return columns;
    }

    public static String createTable(Class<?> bean) {
        String tableName = getTableName(bean);
        List<ColumnBean> columns = getColumns(bean);
        if (tableName != null && !tableName.equals("") && !columns.isEmpty()) {
            StringBuilder createTableSql = new StringBuilder("create table");
            //拼接表名
            createTableSql.append(tableName).append("(");
            //拼接字段信息
            for (int i = 0; i < columns.size(); i++) {
                ColumnBean column = columns.get(i);
                createTableSql.append(column.name);
                createTableSql.append(" ");
                createTableSql.append(column.type);
                int length = column.length;
                if (length != 0) {
                    createTableSql.append("(");
                    createTableSql.append(column.length);
                    createTableSql.append(")");
                }
                String defaultValue = column.defaultValue;
                if (defaultValue != null && defaultValue.length() != 0) {
                    createTableSql.append(" default ");
                    createTableSql.append(defaultValue);
                }
                if (i != columns.size() - 1) {
                    createTableSql.append(",");
                }
            }
            createTableSql.append(")");
            return createTableSql.toString();
        } else {
            throw new RuntimeException("table's name is null");
        }
    }

    //用于描述column
    private static class ColumnBean {
        final String type;
        final String name;
        final int length;
        final String defaultValue;

        public ColumnBean(String type, String name, int length, String defaultValue) {
            this.type = type;
            this.name = name;
            this.length = length;
            this.defaultValue = defaultValue;
        }
    }
}
```

```java
package com.xujiajun.annotation;

import java.util.Date;

public class Test {
    public static void main(String[] args) {
        String sql = TestUtils.createTable(Bean.class);
        System.out.println(sql);
    }
}

@Table(name = "Student")
class Bean {
    @Column(name = "age", length = 3)
    int age;

    @Column(name = "userName", length = 10)
    String name;

    @Column(name = "birthday", defaultValue = "sysdate")
    Date birthday;
}

```

**结果**
![](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/TdeQbi.png)

#### 4.总结

上述的过程可归纳为以下几个步骤：

1. 判断AnnotatedElement是否被某注解所标记：`AnnotatedElement.isAnnotationPresent(SomeAnnotation.class)`；
2. 是的话，获取该注解对象：`Annotation annotation = bean.getAnnotation(SomeAnnotation.class);`；
3. 根据该注解对象获取某个成员参数（比如name）：`Method method = SomeAnnotation.class.getMethod("name");`；
4. 利用反射机制，获取该注解中的某成员的值：`String name = (String) method.invoke(annotation);`。