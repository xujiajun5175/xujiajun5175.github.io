### Java8 - 新的日期和时间API <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---


Java 8之前的库对日期和时间的支持并不理想，为了解决这个问题，Java 8引入了一套全新的时间日期API，位于`java.time`路径下。

#### 1.LocalDate

`LocalDate`类型包含了年月日信息，下面举些`LocalDate`的使用示例：

```java
LocalDate date=LocalDate.of(2018,4,20); // 2018-04-20
        int year=date.getYear(); // 2018
        int month=date.getMonth().getValue(); // 4
        int day=date.getDayOfMonth(); // 20
// 查看该月有多少天
        int days=date.lengthOfMonth(); // 30
// 是否是闰年
        boolean isLeap=date.isLeapYear(); // false
```

可以使用`LocalDate.now()`获取当天的日期信息：

```java
// 查看当天 年月日
LocalDate today=LocalDate.now(); // 2018-04-20
```

除了调用`LocalDate`的`getYear`方法外，我们也可以使用`ChronoField`枚举类型来实现相同的功能：

```java
int year1=date.get(ChronoField.YEAR); // 2018
        int month1=date.get(ChronoField.MONTH_OF_YEAR); // 4
        int day1=date.get(ChronoField.DAY_OF_MONTH); // 20
// 当前日期属于该月第几周
        int weekOfMonth=date.get(ChronoField.ALIGNED_WEEK_OF_MONTH); // 3
```

`ChronoField`
枚举类型包含了诸多的属性可供选择：

![QQ截图20180702142403.png](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/lC8FGG000QQ%E6%88%AA%E5%9B%BE20180702142403.png)

我们也可以修改`LocalDate`对象：

```java
LocalDate date3=LocalDate.of(2018,4,20); // 2018-04-20
        LocalDate date4=date3.withDayOfMonth(22); // 2018-04-22
        LocalDate date5=date3.with(ChronoField.DAY_OF_MONTH,22); // 2018-04-22
        LocalDate date6=date3.withYear(2019); // 2019-04-20
        LocalDate date7=date3.plusDays(5); // 2018-04-25
        LocalDate date8=date3.plus(5,ChronoUnit.DAYS); // 2018-04-25
        LocalDate date9=date3.minusYears(10); // 2008-04-20
```

`TemporalAdjusters`类提供了许多静态方法来修改`LocalDate`对象。当我们需要获取下一个周天，下一个工作日，本月的最后一天等信息时，`TemporalAdjusters`类便可派上用场：

```java
import static java.time.temporal.TemporalAdjusters.*;

LocalDate date10=date3.with(nextOrSame(DayOfWeek.MONDAY)); // 2018-04-23
        LocalDate date11=date3.with(lastDayOfMonth()); // 2018-04-30
        LocalDate date12=date3.with(previous(DayOfWeek.SATURDAY)); // 2018-04-14
```

可参考4月的日历来理解上面的结果：

![QQ截图20180702144931.png](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/LmfvBM000QQ%E6%88%AA%E5%9B%BE20180702144931.png)

我们还可以对`LocalDate`进行格式化操作：

```java
String str1=date.format(DateTimeFormatter.BASIC_ISO_DATE); // 20180420
        String str2=date.format(DateTimeFormatter.ISO_LOCAL_DATE); // 2018-04-20
        DateTimeFormatter dtf=DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String str5=date.format(dtf); // 2018-04-20
        LocalDate date13=LocalDate.parse(str5,dtf); // 2018-04-20
```

LocalDate和下面要介绍的LocalTime，LocalDateTime之间共享了许多类似的方法，上面介绍的LocalDate修改、格式化等方法通用适用于LocalTime和LocalDateTime。

#### 2.LocalTime

`LocalTime`和`LocalDate`类似，区别在于`LocalTime`包含的是时分秒（毫秒）信息。举些`LocalTime`的例子：

```java
LocalTime time=LocalTime.of(20,13,54); // 20:13:54
        int hour=time.getHour(); // 20
        int minute=time.getMinute(); // 13
        int second=time.getSecond(); // 54
```

`LocalDate`和`LocalTime`都可以通过字符串来创建：

```java
LocalDate date=LocalDate.parse("2018-04-20");
        LocalTime time=LocalTime.parse("20:13:54");
```

#### 3.LocalDateTime

`LocalDateTime`是`LocalDate`和`LocalTime`的组合形式，包含了年月日时分秒信息。举些`LocalDateTime`的使用示例：

```java
LocalDateTime ldt1=LocalDateTime.of(2018,4,20,20,13,54); // 2018-04-20T20:13:54
        LocalDateTime ldt2=LocalDateTime.of(date,time); // 2018-04-20T20:13:54
```

`LocalDateTime`可以转换为`LocalDate`和`LocalTime`，转换后包含的信息减少了：

```java
LocalDate date1=ldt1.toLocalDate(); // 2018-04-20
        LocalTime time1=ldt1.toLocalTime(); // 20:13:54
```

同样的，`LocalDate`和`LocalTime`也可以转换为`LocalDateTime`，只需要补上日期或者时间：

```java
LocalDateTime ldt3=date.atTime(time); // 2018-04-20T20:13:54
        LocalDateTime ldt4=date.atTime(20,13,54); // 2018-04-20T20:13:54
        LocalDateTime ldt5=time.atDate(date); // 2018-04-20T20:13:54
```

#### 4.Duration

`Duration`用于计算两个`LocalTime`或者`LocalDateTime`的时间差，例如：

```java
LocalTime time2=LocalTime.of(23,59,59);
        Duration duration=Duration.between(time1,time2);
        long seconds=duration.getSeconds(); // 13565
```

time1和time2之间相差了13565秒。

手动创建`Duration`对象：

```java
Duration threeMinutes=Duration.ofMinutes(3);
        threeMinutes=Duration.of(3,ChronoUnit.MINUTES); // 创建了一个3分钟的Duration，两种创建方式等价
```

#### 5.Period

`Period`用于计算两个`LocalDate`之间的时长。举些例子：

```java
LocalDate date2=LocalDate.of(2018,5,21);
        Period period=Period.between(date1,date2);
        int monthsBetween=period.getMonths(); // 1
        int daysBetween=period.getDays(); // 1
```

2018-04-21和2018-04-20之间月份相差1，天数相差1。

同样的，我们也可以手动创建`Period`对象：

```java
Period tenDays=Period.ofDays(10);
        Period threeWeeks=Period.ofWeeks(3);
        Period twoYearsSixMonthsOneDay=Period.of(2,6,1);
```

#### 6.其他一些常用的方法

##### 6.1.比较两个时间的先后

```java
LocalDate date15=LocalDate.of(2018,4,21);
        date.isEqual(date15); // false
        date.isAfter(date15); // false
        date.isBefore(date15); // true
```

##### 6.2.MonthDay类的使用

`MonthDay`只包含月日信息，可以用于存放类似于生日，结婚纪念日等信息。举个使用`MonthDay`的例子：

```java
LocalDate birthday=LocalDate.of(1999,9,9);
        MonthDay monthDay=MonthDay.of(birthday.getMonth(),birthday.getDayOfMonth());
        MonthDay currentMonthDay=MonthDay.from(LocalDate.now());
        if(currentMonthDay.equals(monthDay)){
        System.out.println("happy birthday!");
        }
```

假如用户的生日是1999年9月9号，那么可以通过这种方法来判断今天是否是用户的生日，如果是的话便发送生日祝福。同样的也有`YearMonth`类。

?> Java 8 新的日期时间API还提供了不同时区和历法的获取方法，由于较少使用而且不易于理解，这里不再列出。😕

