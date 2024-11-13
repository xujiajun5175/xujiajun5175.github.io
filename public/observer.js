/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-11-13 16:21:35
 * @LastEditTime: 2024-11-13 16:26:14
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/public/observer.js
 */
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === 'attributes' &&
      mutation.attributeName === 'data-theme'
    ) {
      const currentTheme = document.documentElement.dataset.theme
      if (currentTheme === 'dark') {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }
  }
})
const targetElement = document.documentElement
const config = { attributes: true, attributeFilter: ['data-theme'] }
observer.observe(targetElement, config)
