# Spring AOP

### 概念

1. Aspect ：切面，切入系统的一个切面。比如事务管理是一个切面，权限管理也是一个切面；

2. Join point ：连接点，也就是可以进行横向切入的位置；

3. Advice ：通知，切面在某个连接点执行的操作(分为: Before advice , After returning advice , After throwing advice , After (finally) advice , Around advice )；

4. Pointcut ：切点，符合切点表达式的连接点，也就是真正被切入的地方；