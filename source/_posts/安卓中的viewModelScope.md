---
title: 安卓中的viewModelScope
date: 2022-02-25 10:13:04
tags:
---

{% blockquote 原文 https://medium.com/androiddevelopers/easy-coroutines-in-android-viewmodelscope-25bffb605471 %}
Easy Coroutines in Android: viewModelScope
{% endblockquote %}


取消一个已经不再使用的协程，通常需要写一堆繁琐的代码。而 `viewModelScope` 通过为 `ViewModel` 类添加扩展属性来实现结构化并发，从而在 `ViewModel` 被销毁时，自动取消它内部的子协程.

<!-- more -->

