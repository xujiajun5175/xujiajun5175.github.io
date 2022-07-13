### Java8 - 使用流收集数据 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---
在上一节中，我们了解到终端操作`collect`方法用于收集流中的元素，并放到不同类型的结果中，比如`List`、`Set`或者`Map`。

其实`collect`方法可以接受各种Collectors接口的静态方法作为参数来实现更为强大的规约操作，比如查找最大值最小值，汇总，分区和分组等等。

#### 1.准备

```java
package com.xujiajun;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Arrays;
import java.util.List;

/**
 * @author xujiajun
 * @date 2022/6/17
 * @apiNote
 */
@Data
@AllArgsConstructor
public class Dish {
    public enum Type {MEAT, FISH, OTHER}

    /**
     * 食物名称
     */
    private final String name;
    /**
     * 是否是素食
     */
    private final boolean vegetarian;
    /**
     * 卡路里
     */
    private final int calories;
    /**
     * 类型：肉，海鲜，其他
     */
    private final Type type;
}

class CollectStreamApplication {
    public static void main(String[] args) {
        List<Dish> list = Arrays.asList(
                new Dish("pork", false, 800, Dish.Type.MEAT),
                new Dish("beef", false, 700, Dish.Type.MEAT),
                new Dish("chicken", false, 400, Dish.Type.MEAT),
                new Dish("french fries", true, 530, Dish.Type.OTHER),
                new Dish("rice", true, 350, Dish.Type.OTHER),
                new Dish("season fruit", true, 120, Dish.Type.OTHER),
                new Dish("pizza", true, 550, Dish.Type.OTHER),
                new Dish("prawns", false, 300, Dish.Type.FISH),
                new Dish("salmon", false, 450, Dish.Type.FISH)
        );
        
        ......
    }
}
```

#### 2.规约与汇总

##### 2.1.最大最小值

`Collectors.maxBy`和`Collectors.minBy`用来计算流中的最大或最小值，

比如按卡路里的大小来筛选出卡路里最高的食材：

```java
list.stream().collect(Collectors.maxBy(Comparator.comparingInt(Dish::getCalories))).ifPresent(System.out::println);
```

##### 2.2.汇总

`Collectors.summingInt`可以用于求和，参数类型为int类型。相应的基本类型对应的方法还有`Collectors.summingLong`和`Collectors.summingDouble`。比如求所有食材的卡路里：

```java
list.stream().collect(summingInt(Dish::getCalories)); // 4200
```

`Collectors.averagingInt`方法用于求平均值，参数类型为int类型。相应的基本类型对应的方法还有`Collectors.averagingLong`和`Collectors.averagingDouble`
。比如求所有食材的平均卡路里:

```java
list.stream().collect(averagingInt(Dish::getCalories)); // 466.6666666666667
```

`Collectors.summarizingInt`方法可以一次性返回元素个数，最大值，最小值，平均值和总和：

```java
IntSummaryStatistics iss=list.stream().collect(summarizingInt(Dish::getCalories));
        System.out.println(iss); // IntSummaryStatistics{count=9, sum=4200, min=120, average=466.666667, max=800}
```

同样，相应的`summarizingLong`和`summarizingDouble`方法有相关的`LongSummaryStatistics`和`DoubleSummaryStatistics`
类型，适用于收集的属性是原始类型long或double的情况。

##### 2.3.拼接

`Collectors.joining`方法会把流中每一个对象应用`toString`方法得到的所有字符串连接成一个字符串。如：

```java
list.stream().map(Dish::getName).collect(joining());
// porkbeefchickenfrench friesriceseason fruitpizzaprawnssalmon
```

内部拼接采用了`StringBuilder`。除此之外，也可以指定拼接符：

```java
list.stream().map(Dish::getName).collect(joining("，"));
// pork，beef，chicken，french fries，rice，season fruit，pizza，prawns，salmon
```

##### 2.4.reducing

`Collectors.reducing`方法可以实现求和，最大值最小值筛选，拼接等操作。上面介绍的方法在编程上更方便快捷，但`reducing`的可读性更高，实际使用哪种我觉得还是看个人喜好。举个使用`reducing`求最大值的例子：

```
list.stream().collect(reducing(0, Dish::getCalories, Integer::max)); // 800
```

或者：

```
list.stream().map(Dish::getCalories).collect(reducing(0, Integer::max)); // 800
```

#### 3.分组

分组功能类似于SQL里的`group by`，可以对流中的元素按照指定分组规则进行分组。

##### 3.1.普通分组

`Collectors.groupingBy`方法可以轻松的完成分组操作。比如现在对List中的食材按照类型进行分组：

```java
Map<Dish.Type,List<Dish>>dishesByType=list.stream().collect(groupingBy(Dish::getType));
        System.out.println(dishesByType);
```

输出结果`{OTHER=[french fries, rice, season fruit, pizza], FISH=[prawns, salmon], MEAT=[pork, beef, chicken]}`。

我们也可以自定义分组规则，比如按照卡路里的高低分为高热量，正常和低热量：

首先定义一个卡路里高低的枚举类型

```java
public enum CaloricLevel {DIET, NORMAL, FAT};
```

然后编写分组规则：

```java
Map<CaloricLevel, List<Dish>>dishesByCalories=list.stream().collect(
        groupingBy(d->{
        if(d.getCalories()<=400)return CaloricLevel.DIET;
        else if(d.getCalories()<=700)return CaloricLevel.NORMAL;
        else return CaloricLevel.FAT;
        })
        );
        System.out.println(dishesByCalories);
```

输出结果：`{DIET=[chicken, rice, season fruit, prawns], NORMAL=[beef, french fries, pizza, salmon], FAT=[pork]}`。

##### 3.2.多级分组

`Collectors.groupingBy`支持嵌套实现多级分组，比如将食材按照类型分类，然后再按照卡路里的高低分类：

```java
 Map<Dish.Type,Map<CaloricLevel, List<Dish>>>dishesGroup=list.stream().collect(
        groupingBy(Dish::getType,groupingBy(d->{
        if(d.getCalories()<=400)return CaloricLevel.DIET;
        else if(d.getCalories()<=700)return CaloricLevel.NORMAL;
        else return CaloricLevel.FAT;
        })
        ));
        System.out.println(dishesGroup);
```

返回结果是一个二级Map，输出结果`{FISH={DIET=[prawns], NORMAL=[salmon]}, OTHER={DIET=[rice, season fruit], NORMAL=[french fries, pizza]}, MEAT={DIET=[chicken], FAT=[pork], NORMAL=[beef]}}`
。

实际上，第二个参数除了`Collectors.groupingBy`外，也可以传递其他规约操作，规约的结果类型对应Map里的第二个泛型。举些例子，将食材按照类型分，然后统计各个类型对应的数量：

```java
Map<Dish.Type,Long>dishesCountByType=list.stream().collect(groupingBy(Dish::getType,counting()));
        System.out.println(dishesCountByType);
```

因为`Collectors.counting`方法返回Long类型，所以Map第二个泛型也必须指定为Long。输出结果：`{OTHER=4, FISH=2, MEAT=3}`。

或者对食材按照类型分，然后选出卡路里最高的食物：

```java
Map<Dish.Type,Optional<Dish>>map=list.stream().collect(groupingBy(
        Dish::getType,maxBy(Comparator.comparing(Dish::getCalories))
        ));
        System.out.println(map);
```

输出结果：`{OTHER=Optional[pizza], MEAT=Optional[pork], FISH=Optional[salmon]}`
。如果不希望输出结果包含Optional，可以使用`Collectors.collectingAndThen`方法：

```java
Map<Dish.Type,Dish>map=list.stream().collect(groupingBy(
        Dish::getType,collectingAndThen(maxBy(Comparator.comparing(Dish::getCalories)),Optional::get)
        ));
        System.out.println(map);
```

输出结果：`{OTHER=pizza, FISH=salmon, MEAT=pork}`。

常与`Collectors.groupingBy`组合使用的方法还有`Collectors.mapping`。`Collectors.mapping`
方法接受两个参数：一个函数对流中的元素做变换，另一个则将变换的结果对象收集起来，比如对食材按照类型分类，然后输出各种类型食材下卡路里等级情况：

```java
Map<Dish.Type,HashSet<CaloricLevel>>map=list.stream().collect(groupingBy(
        Dish::getType,mapping(
        d->{
        if(d.getCalories()<=400)return CaloricLevel.DIET;
        else if(d.getCalories()<=700)return CaloricLevel.NORMAL;
        else return CaloricLevel.FAT;
        },toCollection(HashSet::new)
        )
        ));
        System.out.println(map);
```

`Collectors.toCollection`方法可以方便的构造各种类型的集合。输出结果：`{FISH=[DIET, NORMAL], MEAT=[DIET, NORMAL, FAT], OTHER=[DIET, NORMAL]}`。

#### 4.分区

分区类似于分组，只不过分区最多两种结果。`Collectors.partitioningBy`方法用于分区操作，接收一个`Predicate<T>`类型的Lambda表达式作为参数。比如将食材按照素食与否分类：

```java
Map<Boolean, List<Dish>> map = list.stream().collect(partitioningBy(Dish::isVegetarian));
System.out.println(map);
```

输出结果：`{false=[pork, beef, chicken, prawns, salmon], true=[french fries, rice, season fruit, pizza]}`。

`Collectors.partitioningBy`方法还支持传入分组函数或者其他规约操作，比如将食材按照素食与否分类，然后按照食材类型进行分类：

```java
Map<Boolean, Map<Dish.Type, List<Dish>>> map = list.stream().collect(
        partitioningBy(Dish::isVegetarian, groupingBy(Dish::getType)));
System.out.println(map);
```

输出结果：`{false={MEAT=[pork, beef, chicken], FISH=[prawns, salmon]}, true={OTHER=[french fries, rice, season fruit, pizza]}}`
。

再如将食材按照素食与否分类，然后筛选出各自类型中卡路里含量最低的食材：

```java
Map<Boolean, Dish> map = list.stream().collect(
        partitioningBy(Dish::isVegetarian, collectingAndThen(
                minBy(Comparator.comparing(Dish::getCalories)), Optional::get
        )));
System.out.println(map);
```

输出结果：`{false=prawns, true=season fruit}`。

