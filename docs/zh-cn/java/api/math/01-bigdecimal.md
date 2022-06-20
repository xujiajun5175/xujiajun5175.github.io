### Java.math.BigDecimal 类常用方法 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

在编程中，当我们需要得到精确的运算结果的时候，+，-，\*，/ 已经不能满足我们的需求，比如：

```java
System.out.println(0.1+0.2); //0.30000000000000004
        System.out.println(0.3-0.2); //0.09999999999999998
        System.out.println(0.1*0.2); //0.020000000000000004
        System.out.println(1.2/3);   //0.39999999999999997
```

简单的运算结果却不符合我们的预期。

Java 提供了一个叫 BigDecimal 的类，该类支持任何精度的定点数，可以用它来精确计算货币值。

java.math.BigDecimal 类共有四个构造方法：

1. BigDecimal(int) —-int 类型转为 BigDecimal 类型

2. BigDecimal(double) —-double 类型转为 BigDecimal 类型

3. BigDecimal(long) —-long 类型转为 BigDecimal 类型

4. BigDecimal(string) —-string 类型转为 BigDecimal 类型

实际使用中，一般使用 BigDecimal(string)构造方法。因为将 string 类型转为 BigDecimal 的结果是可预知的。

相反，如通过构造方法 BigDecimal(0.1) 将 0.1 转为 BigDecimal 类型：

```java
System.out.println(new BigDecimal(0.1)); //0.1000000000000000055511151...
```

因为 0.1 并不能精确的表示为 double

而通过 BigDecimal(string)我们可以得到预期的转换结果：

```java
System.out.println(new BigDecimal("0.1")); //0.1
```

#### 常用方法：

##### 1.加法：

```java
BigDecimal add=new BigDecimal("0.1").add(new BigDecimal("0.2"));
        System.out.println(add);  //0.3
//保留两位有效数字
        BigDecimal add1=new BigDecimal("0.1")
        .add(new BigDecimal("0.22222222222"),new MathContext(2));
        System.out.println(add1); //0.32
```

##### 2.减法：

```java
BigDecimal sub=new BigDecimal("0.3").subtract(new BigDecimal("0.1"));
        System.out.println(sub);   //0.2
//保留两位有效数字
        BigDecimal sub=new BigDecimal("0.3")
        .subtract(new BigDecimal("0.111111111"),new MathContext(2));
        System.out.println(sub);   //0.19
```

##### 3.乘法：

```java
BigDecimal mul=new BigDecimal("0.1").multiply(new BigDecimal("0.2"));
        System.out.println(mul); //0.02
//保留两位有效数字
        BigDecimal mul1=new BigDecimal("0.1")
        .multiply(new BigDecimal("0.2222222222"),new MathContext(2));
        System.out.println(mul1); //0.022
```

##### 4.除法：

```java
BigDecimal div=new BigDecimal("1.2").divide(new BigDecimal("3"));
        System.out.println(div);﻿ //0.4
//保留两位有效数字
        BigDecimal div1=new BigDecimal("1")
        .divide(new BigDecimal("3"),new MathContext(2));
        System.out.println(div1);  //0.33
//四舍五入，保留两位小数
        BigDecimal div2=new BigDecimal("2")
        .divide(new BigDecimal("3"),2,RoundingMode.HALF_UP);
        System.out.println(div2);  //0.67
```

##### 5.比较大小：

```java
//小于，返回-1
int result=new BigDecimal("0.1").compareTo(new BigDecimal("0.2"));
        System.out.println(result);   //-1
//等于，返回 0
        int result=new BigDecimal("0.2").compareTo(new BigDecimal("0.2"));
        System.out.println(result); //0
//大于，返回 1
        int result=new BigDecimal("0.3").compareTo(new BigDecimal("0.2"));
        System.out.println(result);  //1
```
