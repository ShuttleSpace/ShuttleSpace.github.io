---
title: rust 中的字符串
date: 2022-03-26 10:34:03
tags:
---

> [Exploring Strings in Rust](https://betterprogramming.pub/strings-in-rust-28c08a2d3130)

<!-- more -->

计算机如何存储解析字符序列的

- 计算机按字节（8位）顺序存储
- 字节可以代表任意对象。只不过我们可以把某些字节转化为人可理解的对象。这也就是 ASCII / Unicode 码表的功能.
- 字符串就是一系列可以通过码表进行解析的字节序列. 在 rust 中我们常用 `String`,`str`,`&str`,`&String`,`Box<str>`,`Box<&str>` 等实现。


C 语言中是这样处理字符串的.

```c
char string[] = "banana"; // c 在末尾添加 `\0`
char long_mostly_empty_string[42] = "banana"; // c 在末尾添加 `\0`
char just_a_different_initialization[] = {'b', 'a', 'n', 'a', 'n', 'a', '\0'}; // 必须明确添加 \0
```

rust 不使用 null-terminated 字符串主要还是性能优化考量。

### str

C 的字符串内部没有强制编码类型。内部只是以 null terminator 结尾的字节序列. JS 使用 UTF-16 编码字符串，而 Rust 使用 UTF-8 编码字符串。

rust 中最常见的就是字符串切片： `&str, &'static str, &'a str`.

rust 中的切片最终都会落脚到动态大小类型 (DST).也就是他们实现了 `!Sized` trait 或者没有实现 `Sized` trait

```rust
let string: Box<str> = Box::new(*"akaka");
```
此处是无法获取动态类型大小的，因为解引用需要获取当前所指向的数据的所有权。

引用就是一个指针的大小（usize） `std::mem::size_of::<&str>()`

