@[TOC](实习日记5)
# 一、vue3中如何使用router（获取this)
>最好不用this,打包部署到服务器上时会报错;参考链接: [vue3中没有this怎么办](http://t.csdnimg.cn/mLHhP)

用导入的方式：


# 二、ts中用object定义类型太宽泛导致Ts无法推断出正确类型


# 三、动态设置日记封面失败

## vite动态引入静态资源
vite官方文档: [传送门](https://cn.vitejs.dev/guide/assets#new-url-url-import-meta-url)

`注：new URL()里面一定要是相对路径 ，不能写@绝对路径 否则解析出来的url会自动进行当前文件路径的拼接`

在 Vue 3 中，直接在模板字符串中使用相对路径的方式来动态设置背景图片是不行的，这是因为相对路径在运行时解析时可能会有问题。new URL(...) 构造函数会解析提供的路径，并与 import.meta.url 基础 URL 结合，生成一个完整的 URL，这个 URL 可以被浏览器解析并加载图片资源。
## 1.方法一

上述代码虽然props传递的值是动态的，但这些值在子组件渲染时是已知的，所以可以正确使用
### vue3父子组件生命周期执行顺序
参考链接: [传送门](https://juejin.cn/post/7108206884867276831)



## 4.为什么loginType.value的值变化后，contentImg的值并没有自动更新？（ref和computed的区别）
当使用ref来创建响应式引用时，Vue会自动跟踪这些引用的变化，并在它们变化时触发视图的更新。然而，这里的contentImg的值并没有被设置为响应式的，因为它是在一个字符串模板中直接使用了loginType.value的值，而不是通过一个计算属性或侦听器来动态更新。


字符串模板内的表达式loginType.value只会在contentImg被初始化时求值一次。之后，即使loginType.value的值发生变化，contentImg.value的字符串也不会自动更新，因为字符串本身不是响应式的。



这时需要使用Vue的计算属性
# 四、打包问题总结
## 1.The 'import.meta' meta-property is not allowed in files which will build into CommonJS output.
在所有的tsconfig.json文件中配置：

原来是因为函数式组件需要在import 引入后，再使用，且要引入组件样式

Vant 中 `Toast，Dialog，Notify 和 ImagePreview 组件`是函数式组件

```js
// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
//Toast
import { showToast } from 'vant'
import 'vant/es/toast/style'
```

## 5.再次打包时Cannot write file 'xxx.vue.d.ts' because it would overwrite input file.
（1）方法一：递归删除上次打包自动生成的src目录下的d.ts所有类型文件，再打包
![==$ find . -type f -name "*.vue.d.ts" -exec rm {} \;==]



（2）方法二：在package.json中删除type-check


# 五、TinyMCE富文本插件
官方文档: [TinyMCE](https://www.tiny.cloud/docs/tinymce/latest/vue-cloud/)
参考博文： [vue3 中使用 TinyMCE 富文本编辑器](https://blog.csdn.net/qq_40893035/article/details/136476652?fromshare=blogdetail&sharetype=blogdetail&sharerId=136476652&sharerefer=PC&sharesource=m0_75134766&sharefrom=from_link)
 [【超详细】vue项目：Tinymce富文本使用教程以及踩坑总结+业务需要功能扩展](https://juejin.cn/post/7377335032354947126)
