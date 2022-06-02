### String

#### 1.String为什么重写equals方法和hashcodeString如果不重写equals方法和hashcode方法,

* 重写前
    * equals方法等同于==,比较的是堆区内存地址是否相等,hashcode方法是native本地方法,内部会计算出唯一的随机整数值
* 重写后
    * equals比较的是每一个字符,hashcode重写是通过数字31与字符串中每一个字符的ASCII码计算得到hashcode值
    * 目的是比较内容是否相同,而不是比较对象内存地址,两个内容相同的字符串可能内存地址不一样.

#### 2.为什么选用31与字符的ASCII码计算

31是优选指数,能够降低哈希算法冲突率,且能够呗JVM优化为1右移5位, 31 * i == (i << 5) - i

#### 3.new String("asd")创建了几个对象

一个或者两个, 使用new实例话,首先肯定会在堆区创建一个新对象 如果new String中指定的字符串常量在字符串常量池中不存在,则会在此创建字符串常量池中的对象,一共两个
字符串常量池从JDK1.7从JVM方法区迁移到堆区,不是JDK1.8才迁移,JDK.8是永久代被取消,元空间取代方法区

#### 4.String s1 = null,String s2 = "",String s3 = new String (""),String s4 = new String(""")区别是什么

* hashcode值
    * s1是null对象,没有分配内存,内存hashcode默认是0,调用tostring()和hashcode()都会报空异常
    * s2,s3,s4都是String空对象,分配了内存空间,且hascode值都是0
* 创建对象
    * 空字符串也属于字符串常量,定义的引用会直接指向字符串常量池中的字符串,如果不存在,则会新建
    * new对象会创建1~2个对象

#### 5.String,StringBuffer,StringBuilder区别

* 可变形
    * String是final修饰字符数组(JDK1.9之后用byte数组),类不能继承和修改,所以不可变
    * StringBuffer和StringBuilder继承AbstractStringBulider,使用字符数组保存字符串,没有final修饰char数组,所以对象可变,存在新增和扩容方法
* 线程安全性
    * String对象不可变,字符串常量,线程安全
    * StringBuffer使用synchronized同步锁,线程安全
    * StringBuilder没有对方法使用同步锁,线程不安全
* 性能
    * String不可变,字符串发生改变,就会生成一个新的String对象，性能最低
    * StringBuffer和StringBuilder每次都会对对象本身进行操作,而不是创建新的对象并改变对象引用
    * 想同情况下StringBuilder相比使用StringBuffer获得10%~15%的性能提升,但要冒线程不安全的风险

#### 6.StringBuileder特性

继承AbstractStringBuilder类,基于char数组实现,可以修改操作对象,非线程安全 实例化new StringBuilder()默认字节数组初始化容量大小为16,每次扩容 * 2 + 2,并会复制老数组到新数组
扩容使用位运算左移1位再加2,调用System的native方法ArrayCopy()

#### 7.StringBuffer特性

使用Synchronized同步修饰方法,对当前对象加锁,线程阻塞,所以线程安全.

### 自动拆箱和自动装箱

#### 1.自动拆箱和自动装箱

* 自动装箱
    * 指基本数据类型转换为自己的包装类,例如int自动装箱Integer
    * 以int为例,在缓存区范围[-128,127]内,自动装箱为integer,实际是调用的Integer.valueOf(int)方法
    * 超出127的,按照new创建
* 自动拆箱
    * 指包装类型转换为基本数据类型
    * 以Integer为例,具体是现是integer.intValue()方法

#### 2.Integer类型和int类型比较

Integer自动拆箱为int类型,本质上比较的是两个int类型的值,只要值相等就是就是返回true

#### 3.Integer类型和Integer类型比较

* 两个均是new 对象不同,所以不同,false
* 一个new,一个不是new
    * 不是new存在常量池中,new创建的指向堆新建的对象,内存地址不同,false
* 两个都不是new
    * 如果值在[-128,127]缓存之间,结果就是true,否则false
    * 对于缓存区内数,java会进行缓存,下次在对一个integer变量赋值时,如果存在就直接在缓存中调用

### 方法重载和方法重写

#### 1.方法重载

* 可以写在同类或者父子类中
* 可以是构造方法也可以是普通方法
* 返回类型,修饰符可以不同
* 必须是同名方法,参数表不同
* 英文overload
* 目的是处理不同类型数据

#### 2.方法重写

* 又名方法覆盖
* 英文名 override
* 返回值,方法名,参数个数和类型相同
* 不能在同类中,只能在子类中
* 使用super关键字调用被覆盖的父类方法
* 子类中的权限大于等于父类权限
* 子类不能重写父类被声明为private权限的方法

### 基本数据类型

#### 1.byte多少字节,int多少字节,long多少字节,double多少字节

<table>
<tr><td>byte</td><td>1字节</td></tr>
<tr><td>short</td><td>2字节</td></tr>
<tr><td>char</td><td>2字节</td></tr>
<tr><td>int</td><td>4字节</td></tr>
<tr><td>long</td><td>8字节</td></tr>
<tr><td>float</td><td>4字节</td></tr>
<tr><td>double</td><td>8字节</td></tr>
</table>