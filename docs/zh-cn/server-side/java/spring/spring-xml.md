```xml
<bean id="inventoryService" class="com.example.InventoryService" />
<bean id="productService" class="com.example.ProductService" >
    <constructor-arg ref="inventoryService" />
</bean>
```

