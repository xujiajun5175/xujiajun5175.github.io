### Java8 - 使用Optional取代null <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

在Java中对一个空对象进行操作时，便会抛出最常见的异常`NullPointerException`。

为了改善这个问题，Java 8中提供了一个`java.util.Optional<T>`类型。

Optional类的Javadoc描述如下：这是一个可以为null的容器对象。如果值存在则`isPresent()`方法会返回true，调用`get()`方法会返回该对象。

下面介绍Optional类的使用方法。

假如有一个像下面这样的类层次结构：

```java
class Department {
    private Employee employee;
    public Department(Employee employee) {
        this.employee = employee;
    }
    Employee getEmployee() {
        return employee;
    }
}

class Employee {
    private Girl girlFriend;
    public Employee(Girl girlFriend) {
        this.girlFriend = girlFriend;
    }
    Girl getGirlFriend() {
        return girlFriend;
    }
}

class Girl {
    private String name;
    public Girl(String name) {
        this.name = name;
    }
    String getName() {
        return name;
    }
}
```

部门`Department`类包含一个员工`employee`属性，类型为`Employee`，员工`Employee`类包含`girlFriend`属性，类型为`Girl`。

假如现在要获取部门某个员工的女朋友，我们通常是这样获取的：

```java
static String getGirlFriendName(Department department){
        if(department!=null){
        Employee employee=department.getEmployee();
        if(employee!=null){
        Girl girl=employee.getGirlFriend();
        if(girl!=null){
        return girl.getName();
        }
        return"单身汪";
        }
        return"没有员工";
        }
        return"部门为空";
        }
```

可以看到，在每次引用变量的属性时，都要先判断变量是否为空，如果不做该检查将可能导致`NullPointerException`。

下面我们将使用Optional来改善这种层层嵌套，啰嗦的代码。

#### 1.创建Optional

创建一个Optional对象有好几种方式：

##### 1.1.创建一个空的Optional

我们可以使用静态工厂方法`Optional.empty`，创建一个空的Optional对象：

```java
Optional<Department> department=Optional.empty();
```

##### 1.2.根据非空值创建Optional

我们也可以使用静态工厂方法`Optional.of`来创建一个非空对象的Optional对象：

```java
Optional<Employee> optEmployee=Optional.of(employee);
```

!> 如果employee为空，这段代码会立即抛出一个`NullPointerException`。

##### 1.3.创建可以为null的Optional

使用静态工厂方法`Optional.ofNullable`，我们可以创建一个允许null值的Optional对象：

```java
Optional<Employee> optEmployee=Optional.ofNullable(employee);
```

!> 如果employee为空，对其调用`get`方法将抛出`NoSuchElementException`。

#### 2.Optional方法

Optional类包含了许多方法，下面介绍这些方法的使用。

##### 2.1.isPresent

顾名思义，如果值存在返回true，否则返回false。如：

```java
 Optional<Department> opt=Optional.ofNullable(department);
        if(opt.isPresent()){
        System.out.println(opt.get().getEmployee());
        }
```

##### 2.2.get

如果Optional有值则将其返回，否则抛出`NoSuchElementException`。下面举个抛出`NoSuchElementException`的例子：

```java
try{
        Optional.empty().get();
        }catch(Exception e){
        e.printStackTrace();
        }
```

代码将捕获到 java.util.NoSuchElementException: No value present 异常。

##### 2.3.ifPresent

如果Optional实例有值则为其调用`Consumer`（函数描述符为`T -> void`），否则不做处理。如：

```java
girl.ifPresent(g->System.out.println("我有女朋友，名字是："+g.getName()));
```

##### 2.4.orElse

如果Optional实例有值则将其返回，否则返回`orElse`方法传入的参数。如：

```java
System.out.println(Optional.empty().orElse("There is no value present!"));
```

程序将输出`There is no value present!`。

##### 2.5.orElseGet

`orElseGet`与`orElse`方法类似，`orElse`方法将传入的字符串作为默认值，而`orElseGet`方法可以接受`Supplier`（函数描述符为`() -> T`）来生成默认值。如：

```java
System.out.println(Optional.empty().orElseGet(()->"There is no value present!"));
```

程序同样输出`There is no value present!`。

##### 2.6.orElseThrow

如果有值则将其返回，否则抛出`Supplier`接口创建的异常。如：

```java
try{
        Optional.empty().orElseThrow(NoSuchElementException::new);
        }catch(Exception e){
        e.printStackTrace();
        }
```

!> 代码将捕获到 java.util.NoSuchElementException: No value present 异常。

##### 2.7.map

如果Optional有值，则对其执行调用`Function`函数描述符为（`T -> R`）得到返回值。如果返回值不为null，则创建包含`Function`回值的Optional作为map方法返回值，否则返回空Optional。

```java
Optional<String> upperName=name.map(String::toUpperCase);
        System.out.println(upperName.orElse("No value found"));
```

##### 2.8.flatMap

如果有值，为其执行`Function`函数返回Optional类型返回值，否则返回空Optional。`flatMap`与`map`方法类似，区别在于`flatMap`中的`Function`
函数返回值必须是Optional。调用结束时，`flatMap`不会对结果用Optional封装。如：

```java
upperName=name.flatMap((value)->Optional.of(value.toUpperCase()));
        System.out.println(upperName.orElse("No value found"));
```

##### 2.9.filter

filter方法通过传入`Predicate`（函数描述符为`T -> Boolean`）对Optional实例的值进行过滤。如：

```java
Optional<String> name=Optional.of("Jane");
        Optional<String> LongName=name.filter((value)->value.length()>=3);
        System.out.println(LongName.orElse("名字长度小于3个字符"));
```

方法输出`Jane`。

#### 3.实战

介绍完Optional类的方法后，我们使用Optional改善一开始的代码：

```java
static String getGirlFriendName(Department department){
        Optional<Department> opt=Optional.ofNullable(department);
        return opt.map(Department::getEmployee)
        .map(Employee::getGirlFriend)
        .map(Girl::getName)
        .orElseThrow(NoSuchElementException::new);
        }
```




