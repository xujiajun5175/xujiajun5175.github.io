function testable(target) {
  target.isTestable = true
}

class MyTestableClass {}
MyTestableClass = testable(MyTestableClass) || MyTestableClass
console.log(MyTestableClass.isTestable)
