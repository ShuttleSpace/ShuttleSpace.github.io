---
title: 每个JS开发者都应该知道的 Unicode
tags:
  - 翻译
  - JS
  - Unicode
date: 2022-02-26T09:05:00
update: 2022-02-26
---

{% blockquote 原文 https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/ %}
What every JavaScript developer should know about Unicode
{% endblockquote %}
本文起源于一个忏悔：我对 Unicode 已经恐惧很久了。当实际工作中需要 Unicode 知识时，我一般仅针对问题搜索答案，而不会对其原理进行深入探究。

<!-- more -->

我一直在回避这件事，直到我遇到了一个需要深入理解 Unicode 原理的问题。此刻没有现成的解决方案可用了。

在付出大量努力（阅读一大堆文章）后，我才发现，其实 Unicode 也没那么难懂。好吧。。。有些文章确实需要至少3遍之后才能理解。

如果你在理解 Unicode 方面也有同样的困惑，那么此刻正是时候！真的不难！首先准备好可口的🍵或者咖啡。接下来，就一起进入抽象、字符、astrals和代理的世界吧。

本文将阐述 Unicode 的基本原理及其创建的必要性。然后介绍 JavaScript 如何使用 Unicode, 以及开发中可能遇到的问题。同时也会学习如何使用最新的 ECMAScript 2015 特性解决一部分难题。

准备好了吗？

[toc]

## 1、Unicode 缘起

我们先从一个简单的问题开始。你是如何阅读理解本文的？原因很简单，因为你知道每个字母的意思和由一组字母组成的单词的意思。

那么你为什么能理解这些字母呢？原因也很简单，因为你（读者）和我（作者）在英语字符（意思）和图形符号（显示在屏幕上的符号）之间的联系达成了共识。

计算机也是同样的道理。不同之处在于计算机是不理解字母的意思的。对于计算机而言，字母就是一列二进制位。

想象一下, 用户1通过网络向用户2发送了一条 `hello` 的消息。

用户1的计算机是不知道这些字母的含义。所以它把 `hello` 转换为数字序列`0x68 0x65 0x6C 0x6F`,此处每个字母都对应一个数字: `h` 对应 `0x68`，`e` 对应 `0x65`等。这些数字最终会被传送给用户2的电脑。

用户2的电脑收到这堆数字序列，然后它使用相同的数字字母对照将数字转换为字母信息。最终显示出正确的消息: `hello`。

两台电脑间关于数字与字符之间达成的对照协议就是 Unicode 标准化的内容。

从 Unicode 的角度来看，`h` 是名为 `H` 的小写拉丁抽象字符。此字符的对应数字为 `0x68`，也就是经常用 `U+0068` 来表示的码点。

Unicode 存在的意义就是提供一系列的抽象字符（字符集）且为每个字符分配一个独一无二的码点（编码字符集）。
## 2、Unicode 基本术语

`www.unicode.org` 网站提到:
> `Unicode` 为每个字符提供了一个独一无二的数字，无论是在哪个平台上，无论是何种程序，无论使用何种语言，这个数字都是独一无二的。

Unicode 是一个通用字符集，覆盖了市面上大部分可用的文字写作系统，为每一个字符都赋予了一个独一无二的数字（码点）。
[](https://dmitripavlutin.com/3e07eef08e75e952b9b3fee7fd3ac454/unicode-logo.svg)

Unicode 包含了包括今天常见的语言、标点符号、音标、数学符号、技术符号、箭头、表情等等在内的字符。

Unicode 1.0 发布于 1991 年十月，拥有 7161 个字符。发布于 2021 年九月的 14.0 版支持 144697 个字符。

Unicode 的普适性及开放性解决了之前因为大量不同字符集和编码集之间带来的问题。

之前创建一个支持所有字符集和编码集的应用是很复杂的。
> 如果你觉得 Unicode 很难，那么不使用 Unicode 编程则是难上加难

我现在都记得选择任意字符集和编码集读取文件问题就像买彩票一样，全凭运气。

### 2.1 字符集和码点

> **抽象字符**(或者字符)是用于组织、控制或表示文本数据的信息单元

Unicode 把字符作为一个抽象术语来处理的。每一个抽象字符都有对应的名称，如 `LATIN SMALL LETTER A`, 此字符的呈现形式(字形)是 `a`.

> **码点**是分配给单个字符的数字.

码点是介于 `U+0000` - `U+10FFFF` 之间的数字.

`U+<hex>` 是码点的格式，`U+` 作为前缀，意为**U**nicode；`<hex>`是十六进制表示的数字。例如 `U+0041` 和 `U+2603` 都是码点。

总之记住一点，码点就是一个简单的数字。也是一个数组里面元素的索引。

神奇之处在于 Unicode 把码点和字符关联了起来。比如 `U+0041` 对应名为 `LATIN CAPITAL LETTER A` 的字符(即 `A`), 而 `U+2603` 对应名为 `SNOWMAN` 的字符(即 `☃`)。

**不是所有的码点都有对应的字符.** `1,114,112`是合规的码点(在 `U+0000` - `U+10FFFF`之间), 但只有 `144,697`(即 2021 年九月)有对应的字符.

### 2.2 Unicode 位面(planes)

> **Plane**是从 `U+n0000` - `U+nFFFF`，范围 65536（或 1000016） 的连续 Unicode 码点，其中 `n` 取值范围为 0 - 16.

整个 Unicode 码点被分为 17 个位面.
- `Plane 0` 包括 `U+0000` - `U+FFFF` 之间的码点
- `Plane 1` 包括 `U+1000` - `U+1FFF` 之间的码点
- ......
- `Plane 16` 包括 `U+100000` - `U+10FFFF` 之间的码点

[](https://dmitripavlutin.com/static/a0793621ff979b9a80b9a6b0a600e663/bca77/unicode-planes.png)

#### 基础多语言位面

Plane 0 是最特殊的一个，被称为**基础多语言位面**或者简称**BMP**。它包含了当前大多数的现代语言（如基本拉丁语、斯拉夫语、希腊语等等）和大量的符号。

如上所述，BMP 的码点范围在 `U+0000` - `U+FFFF` 之间，最多可以有4位十六进制数字。

开发者经常需要和 BMP 中的字符打交道。

比如以下 BMP 中的字符:

- e 是码点为 U+0065 的 `LATIN SMALL LETTER E` 字符
- | 是码点为 U+007C 的 `VERTICAL BAR` 字符
- ■ 是码点为 U+25A0 的 `BLACK SQUARE` 字符
- ☂ 是码点为 U+2602 的 `UMBRELLA` 字符

#### 星型位面

BMP 之外的其他 16 个位面被称为**星型位面**或**增补位面**

星型位面里的码点也被称为**星型码点**，这些码点的范围在 `U+10000` - `U+10FFFF` 之间

一个星型码点可以有 5 位或 6 位16进制数字，如: `U+ddddd` 或 `U+dddddd`

以下是星型位面中的字符:
- 𝄞 是码点为 U+1D11E 的 `MUSICAL SYMBOL G CLEF` 字符
- 𝐁 是码点为 U+1D401 的 `MATHEMATICAL BOLD CAPITAL B` 字符
- 🀵 是码点为 U+1F035 的 `DOMINO TITLE HORIZONTAL-00-04` 字符
- 😀 是码点为 U+1F600 的 `GRINNING FACE` 字符

#### 码元

到现在为止，Unicode 字符，码点，位面都是抽象概念。

接下来看看在物理层面，硬件上是如何实现 Unicode 的。

计算机在内存中是不使用码点或抽象字符的。它需要一种物理方式来展示 Unicode 码点：码元。

> **码元**是一个位序列，用于在给定编码表单中对每个字符进行编码

字符编码就是如何将抽象的码点转为物理位的方式即码元。换言之，字符编码把码点转换为独一无为的代码单元序列。

比较流行的编码是 `UTF-8`,`UTF-16`和`UTF-32`

大多数 JS 引擎使用 `UTF-16` 编码，那么我们就来研究下 `UTF-16`.

UTF-16（全名：16 位 Unicode 转换格式）是一种变长编码：
- 来自 BMP 的码点使用一个16位的码元编码
- 来自星型位面的码点使用两个16位的码元分别编码

这就是全部的理论干货。以下是示例：

假设你需要把 ` LATIN SMALL LETTER A` 字符 `a` 保存到硬盘里。Unicode 会告诉你它对应的码点是 `U+0061`

接下来，我们需要询问 UTF-16， `U+0061` 怎么转换。编码规范明确指出来自 BMP 的码点只取它的 16 进制数字 `U+0061`, 然后保存到一个 16 位码元中: `0x0061`.

如上可见，BMP 中的码点刚好适合一个16位码元。

#### 代理对

现在我们来研究一个比较复杂的案例. 假设你需要编码 `GRINNING FACE` 字符 😀。从星型位面得到它的码点 `U+1F600`.

因为星型码点需要 21 位（因为最大的 0x10FFFF 转为2进制是 21 位）才能保存信息,那么 UTF-16 表示你需要两个 16 位的码元。码点 `U+1F600` 被分成了代理对：`0xD83D` (高代理码元)和 `0xDE00`（低代理码元）。

> **代理对**用两个16位码元组成的码元序列来表示一个抽象字符。代理对的第一个值被称为**高代理码元**，第二个值被称为**低代理码元**

一个星型码点需要2个码元-即代理对。比如把 `U+1F600`（`😀`）编码为 UTF-16，它的代理对即为 `0xD83D 0xDE00`

```javascript
console.log('\uD83D\uDE00'); // => '😀'
```

高代理码元取值范围为 `0xD800` - `0xDBFF`. 低代理码元取值范围为 `0xDC00` - `0xDFFF`

星型码点和代理对之间的转换算法如下:

```javascript
function getSurrogatePair(astralCodePoint) {
  let highSurrogate = 
     Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800;
  let lowSurrogate = (astralCodePoint - 0x10000) % 0x400 + 0xDC00;
  return [highSurrogate, lowSurrogate];
}
getSurrogatePair(0x1F600); // => [0xD83D, 0xDE00]
function getAstralCodePoint(highSurrogate, lowSurrogate) {
  return (highSurrogate - 0xD800) * 0x400 
      + lowSurrogate - 0xDC00 + 0x10000;
}
getAstralCodePoint(0xD83D, 0xDE00); // => 0x1F600
```

代理对使用起来不太方便。当在 JS 中使用字符串时，就需要特殊处理。

尽管如此，UTF-16的内存是很高效。常用的字符中，99% 都来自 BMP，也就是需要一个码元，所以比较节省内存空间。

#### 2.5 组合标记

> 字素或符号是在特定书写系统上下文中最小独特的书写单位。

字素是用户如何理解字符的方式。屏幕上实际展示的字符被称为字形。

大多数情况下，一个单独的 Unicode 字符即展示为一个字素。如 `U+0066` 即展示为英文 `f`.

当然也包含一个字素包括一系列字符的情况。

如 `å` 就是丹麦语书写系统中的一个单独字素。它是由 `LATIN SMALL LETTER A` `U+0061` (渲染为 `a`) 和 `COMBINING RING ABOVE` `U+030A`(渲染为 `◌̊`) 的特殊字符组合而成的。‘

`U+030A` 修改了前面字符的展示，所以被称为组合标记。

```javascript
console.log('\u0061\u030A'); // => 'å'
console.log('\u0061');       // => 'a'
```

> **组合标记**是一个应用到前置字符上，生成新字素的一个字符。

组合标记包括重音符号、变音符号、希伯来语点、阿拉伯语元音符号和印度语 matras 等字符。

组合标记通常不单独使用。应该避免单独使用他们。

和代理对一样，组合标记在 JS 中也是比较难用的。

组合标记字符序列（基本字符+组合标记）一般被用户识别为单独的符号（如 `\u0061\u031A` 就是 `å`）.但是开发者就得考虑把2个码点 `U+0061`和 `U+030A` 才能组合成 `å`

[](https://dmitripavlutin.com/static/16d7bd44cac07b727121315ae7db1ab6/03f31/unicode-terms.webp)

### JavaScript 中的 Unicode

ES2015 语言规范提到：源码是使用 Unicode(5.1 及之后的版本) 表示的。源码文本就是一系列范围在 `U+0000` - `U+10FFFF` 之间的码点。而源码文本存储或彼此交换的方式没有在 ECMAScript 规范中说明，通常是使用 UTF-8 来编码的（web 领域最通用的编码格式）

而我推荐把源码文本以 `Basic Latin Unicode block` (或 ASCII) 格式进行保存。ASCII 范围之外的字符应该被转义。这样就能避免一些编码方面出现的问题。

在语言层面，ECMAScript 中明确定义了 JavaScript 中的字符串。

> String 类型是所有有序序列的集合，这些序列包含零个或多个 16 位无符号整数值（"元素"），最大长度为 253-1 个元素。String 类型通常用于表示正在运行的 ECMAScript 程序中的文本数据，在这种情况下，String 中的每个元素都被视为 UTF-16 代码单元值。

string 的每个元素都被引擎解析为一个码元。字符串渲染时没有强制要求使用哪个码元来展示。比如：
```javascript
console.log('cafe\u0301'); // => 'café'
console.log('café');       // => 'café'
```

`cafe\u0301` 和 `café` 字面上看来码元是不同的，但是都被渲染为 `café` 符号.

> **字符串长度**就是其内元素（如16位值）的个数。ECMAScript 把字符串的每个元素都解析为单个的 UTF-16 码元

从上面的代理对和组合标记可知，某些符号需要2个或更多的码元来展示。所以当使用索引访问字符或者计算字符个数时就需要特别小心了。

```javascript
const smile = '\uD83D\uDE00';
console.log(smile);        // => '😀'
console.log(smile.length); // => 2
const letter = 'e\u0301';
console.log(letter);        // => 'é'
console.log(letter.length); // => 2
```

`smile` 字符串包含2个码元：`\uD83D`（高代理）和 `\uDE00`（低代理）。因为字符串是码元序列，所以 `smile.length` 就是2.即使 `smile`渲染出来只有一个符号 `😀`

`letter` 字符串也是同样的道理。组合标记 `U+0301` 会应用到前面的字符，然后只渲染一个符号 `é`. 因为 `letter` 包含2个码元，所以 `letter.length` 就是2.

我的建议：**总是把 JavaScript 中的字符串看作一系列码元**，这样屏幕上渲染出来的字符串就不能明确说出包含了哪些码元。

星型符号和组合标记需要2个或更多的码元来编码，但是一般是把他们作为一个单独的字素来处理的。如果一个字符串有代理对或者组合标记，如果不遵循这些规则，那么在计算字符串长度或通过索引访问字符时就会出现这样或那样的困惑。

大多数的 JavaScript 字符串方法都是非 Unicode 敏感的方法。如果你的字符串包含了 Unicode 字符，当使用 `myString.slice()` 或 `myString.substring()` 等方法时就需要谨慎了。

#### 3.1 转义序列

字符串中的转义序列是用来表示基于码点数字的码元的。JavaScript 中有 3 中转义类型，其中一个就是 ECMAScript 中提出的。

<b>16进制转义序列</b>

**16进制转义序列**简称为: `\x<hex>`, 前缀 `\x` 后面跟着2个固定长度的16进制数字。如 `\x30`(符号 `0`) 或者 `\x5B` (符号 `[`)

字符串中的16进制转义序列或者正则表达式看起来是这样的

```javascript
const str = '\x4A\x61vaScript';
console.log(str);                    // => 'JavaScript'
const reg = /\x4A\x61va.*/;
console.log(reg.test('JavaScript')); // => true
```
16进制转义序列可以转义有限范围内的码点：`U+00` - `U+FF` 因为它只允许有2个数字。但是16进制转义是很好用的，因为它表示起来比较短，节省空间。


<b>Unicode 转义序列</b>

如果你想转义整个 BMP 中的码点，那么就使用**Unicode 转义序列** 吧。转义格式为 `\u<hex>`, 前缀`\u` 后面跟着4个固定长度的16进制数字。如 `\u0051`（符号 `Q`） 或 `\u222B` (符号 `∫`)

下面是一些 unicode 转义序列示例:
```javascript
const str = 'I\u0020learn \u0055nicode';
console.log(str);                 // => 'I learn Unicode'
const reg = /\u0055ni.*/;
console.log(reg.test('Unicode')); // => true
```

Unicode 转义序列可以转义有限范围内的码点：`U+0000` - `U+FFFF` (包括所有的 BMP 码点，因为4位数字的局限)。这已经足够应付大多数情况了。

为了阐述 JavaScript 如何表示星型符号，你需要把 unicode 转义序列合并起显示（高代理和低代理）创建一个代理对

```javascript
const str = 'My face \uD83D\uDE00';
console.log(str); // => 'My face 😀'
```

`\uD83D\uDE00` 就是用2个转义序列创建的代理对。

**码点转义序列**

ECMAScript 2015 提供了整个 Unicode 空间的码点转义序列: `U+00000` - `U+10FFFF`， 如 BMP 和星型位面。

`\u<hex>` 被称为**码点转义序列**, `<hex>` 是长度在 1-6 之间的可变16进制数字。

例如 `\u{7A}` (符号 `z`) 或者 `\u{1F639}` （符号 `😹`）

```javascript
const str = 'Funny cat \u{1F639}';
console.log(str);                      // => 'Funny cat 😹'
const reg = /\u{1F639}/u;
console.log(reg.test('Funny cat 😹')); // => true
```

正则表达式 `\u{1F639}/u` 有一个特殊的标识 `u`，它可以开启 Unicode 特性(如下[正则表达式所述](https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/#35regularexpressionmatch))

我同意码点转义可以避免代理对展示星型符号的弊端。例如使用码点转义 名为 `SMILING FACE WITH HALO` 的码点 `U+1F607`。

```javascript
const niceEmoticon = '\u{1F607}';
console.log(niceEmoticon);   // => '😇'
const spNiceEmoticon = '\uD83D\uDE07'
console.log(spNiceEmoticon); // => '😇'
console.log(niceEmoticon === spNiceEmoticon); // => true
```

变量 `niceEmoticon` 代表的字面值的码点转义 `\u{1F607}` 表示的就是一个星型码点 `U+1F607`

实际上，码点转义在底层会创建一个代理对（2个码元）。`spNiceEmoticon` （使用 unicode 转义 `\uD83D\uDE07` 表示的代理对）等同于 `niceEmotion

[](https://dmitripavlutin.com/static/6b44fa7c2642601d0bf68ddf688e808d/fb018/unicode-escape-sequence.webp)

使用字符串创建 `RegExp` 正则表达式时，必须使用 `\\` 来代替 `\`  表示转义字符。

```javascript
const reg1 = /\x4A \u0020 \u{1F639}/;
const reg2 = new RegExp('\\x4A \\u0020 \\u{1F639}');
console.log(reg1.source === reg2.source); // => true
```

#### 3.2 字符串比较

JavaScript 中的字符串都是码元序列。在比较字符串时，应该预料到，彼此字符串之间的码元数先相等。

```javascript
const firstStr = 'hello';
const secondStr = '\u0068ell\u006F';
console.log(firstStr === secondStr); // => true
```

`firstStr` 和 `secondStr` 的码元是相等的，所以他们俩相等。

但是当你比较两个渲染结果看起来相等，但是码元不一致的字符串时，结果就可能不一样了。

```javascript
const str1 = 'ça va bien';
const str2 = 'c\u0327a va bien';
console.log(str1);          // => 'ça va bien'
console.log(str2);          // => 'ça va bien'
console.log(str1 === str2); // => false
```

`str1` 和 `str2` 的渲染结果看起来是一样的，但是拥有不同的码元。这是因为字素 `ç` 有两种构成方式：
- 使用 `U+00E7` `LATIN SMALL LETTER C WITH CEDILLA` 构成
- 使用 `U+0063` `LATIN SMALL LETTER C` 加上组合标记 `U+0327` `COMBINING CEDILLA` 构成.

如何处理这种情况下的字符串比较？答案是字符串标准化。

**标准化**

> **规范化**是字符串转换为规范表示形式，以确保规范等效（和/或兼容性等效）字符串具有唯一的表示形式。

换言之，如果一个字符串有复杂的构造结构：如组合字符串序列或其他混合结构，那么<i>标准化</i>成规范格式就可以。标准化字符串可以无缝的比较或者实现文本搜索等操作。

[Unicode Standard Annex #15](http://unicode.org/reports/tr15/) 有关于标准化处理的详细描述。

在 ECMAScript 2015 Javascipt 中字符串的标准化处理通过 `myString.normalize([normForm])` 来实现。`normForm` 是可选的参数(默认 `NFC`), 接受以下几个选项
- `NFC`: Normalization Form Canonical Composition
- `NFD`: Normalization Form Canonical Decomposition
- `NFKC`: Normalization Form Compatibility Composition
- `NFKD`: Normalization Form Compatibility Decomposition

下面让我们通过标准化字符串来实现字符串的比较

```javascript
const str1 = 'ça va bien';
const str2 = 'c\u0327a va bien';
console.log(str1.normalize() === str2.normalize()); // => true
console.log(str1 === str2);                         // => false
```

当 `str2.normalize()` 被调用时，返回的是 `str2` 的规范化版本(`c\u0327` 被替换为 `ç`), 所以 `str1.normalize() === str2.normalize()`就符合预期了。

`str1` 不受 `normalize` 的影响，因为它本身就是规范化的表现形式。


#### 3.3 字符串长度

通常使用 `myString.length` 来获取字符串的长度。此属性表明字符串所包含的码元的个数。

如果字符串是来自 BMP 中的码点，那么实际获取的字符串长度和预期是符合的。

```javascript
const color = 'Green';
console.log(color.length); // => 5
```
`color` 中的每个码元都对应一个单独的字素。所以预期字符串长度是5.

**长度和代理对**

如果字符串包含了代理对，那么当展示星型码点时问题就变得棘手起来了。因为每个代理对包含2个码元（高位代理和低位代理），所以字符串的长度就比预期长。

```js
const str = 'cat\u{1F639}';
console.log(str);        // => 'cat😹'
console.log(str.length); // => 5
```
当 `str` 字符串渲染时，它其实是包含了4个符号的 `cat😹`。然而 `smile.length` 等于5，因为 `U+1F639` 由2个码元编码的星型码元（一个代理对）。

遗憾的事，目前没有本地可用的高效修复方案。

不过至少 ECMAScript 2015 引入了能够识别星型符号的算法。星型符号即使被2个码元编码，也是算作一个字符。

Unicode 敏感的方法是字符串迭代器 `String.prototype[@@iterator]()`.可以通过组合扩散操作符`[...str]` 或 `Array.from(str)` 函数（都会消费字符串迭代器）来创建字符串。然后计算数组返回的符号数量。

实际按照上面的方案操作时则会有轻微的性能损失。

```js
const str = 'cat\u{1F639}';
console.log(str);             // => 'cat😹'
console.log([...str]);        // => ['c', 'a', 't', '😹']
console.log([...str].length); // => 4
```
`[...str]` 创建了包含4个符号的数组。代理对编码 `CAT FACE WITH TEARS OF JOY 😹` `U+1F639` 时会保证其完整，因为字符串迭代器是 Unicode 敏感的。

**长度和组合标记**

那组合字符串序列时会怎样呢？因为每个组合标记都是一个码元，此时也会遇到相同的问题。

标准化字符串就可以解决这个问题。如果幸运的话，组合字符序列就会以单字符对待。
```js
const drink = 'cafe\u0301';
console.log(drink);                    // => 'café'
console.log(drink.length);             // => 5
console.log(drink.normalize())         // => 'café'
console.log(drink.normalize().length); // => 4
```

`drink` 字符串包含了5个码元（所以 `drink.length` 就是5），即使它渲染出来是4个符号。

当标准化 `drink` 时，组合字符序列`e\u0301`只有一个规范化格式 `é`.所以 `drink.normalize().length` 就是包含4个符号。

不幸的是，标准化不是万能钥匙。长组合字符序列不总是只有一个规划化符号

```js
const drink = 'cafe\u0327\u0301';
console.log(drink);                    // => 'cafȩ́'
console.log(drink.length);             // => 6
console.log(drink.normalize());        // => 'cafȩ́'
console.log(drink.normalize().length); // => 5
```

`drink` 有6个码元，所以`drink.length` 等于6.然而 `drink` 有4个符号。

`drink.normalize()` 会把组合序列 `e\u0327\u0301` 转换为包含2个字符 `ȩ\u0301` 的规范化格式（只一处一个组合标记）。

然而 `drink.normalize().length` 等于5，依然和显示的符号数不相符。

#### 3.4 字符位置

因为字符串是一个码元序列，使用索引访问字符串同样会出现问题。

当字符串仅包含 BMP 字符时，通过索引访问字符串就是正确的。
```js
const str = 'hello';
console.log(str[0]); // => 'h'
console.log(str[4]); // => 'o'
```

每个符号都被编码为一个单独的码元，所以索引访问就是正确的。

**字符位置和代理对**

当字符串包含星型符号时情况就不一样了。

一个星型符号用2个码元编码（一个代理对）。所以通过索引访问字符串的字符时可能获取到的就是一个单独的高代理或者低代理，这就是无效的符号。

```js
onst omega = '\u{1D6C0} is omega';
console.log(omega);        // => '𝛀 is omega'
console.log(omega[0]);     // => '' (unprintable symbol)
console.log(omega[1]);     // => '' (unprintable symbol)
```

因为 `MATHEMATICAL BOLD CAPITAL OMEGA ` `U+1D6C0` 是一个星型字符，它是用2个码元的一个代理对编码的。

`omega[0]` 访问高位代理码元，`omega[1]` 访问低位代理码元，这就会打破代理对。

有两种方式可以正确的访问字符串的星型符号。
- 使用 Unicode 敏感的字符串迭代器，生成符号数组 `[...str][index]`
- 使用 `number = myString.codePointAt(index)` 获取码点数字，然后使用 `String.fromCodePoint(number)` 将数字转换为符号(推荐)

```js
const omega = '\u{1D6C0} is omega';
console.log(omega);                        // => '𝛀 is omega'
// 方法1
console.log([...omega][0]);                // => '𝛀'
// 方法2
const number = omega.codePointAt(0);
console.log(number.toString(16));          // => '1d6c0'
console.log(String.fromCodePoint(number)); // => '𝛀'
```

`[...omega]` 返回 `omega` 字符串包含的符号数组。代理对计算是正确的，所以访问的第一个字符 `[...smile][0]` 就是`𝛀`

`omega.codePointAt(0)` 方法调用是 Unicode 敏感的，所以它返回的 `omega` 字符串的第一个字符的星型码点数字 `0x1D6C0`。而 `String.fromCodePoint(number)` 则根据码点返回对应的符号 `𝛀`

**字符串位置和组合标记**

使用索引访问包含组合标记的字符串也会出现上述问题。

通过索引访问字符串返回的是码元。但是组合标记序列应该被作为整体读取，不能被拆分成单独的码元。

```js
const drink = 'cafe\u0301';  
console.log(drink);        // => 'café'
console.log(drink.length); // => 5
console.log(drink[3]);     // => 'e'
console.log(drink[4]);     // => ◌́
```

`drink[3]` 只能访问基础字符 `e`, 不包括 `COMBINING ACUTE ACCENT` `U+0301` 组合标记(`◌́`). 而 `drink[4]` 返回的则是单独的组合标记 `◌́`

这种情况下试试字符串标准化。组合字符序列 `U+0065` `LATIN SMALL LETTER E` + `U+0301` `COMBINING ACUTE ACCENT` 的规范化格式就是 `U+00E9` `LATIN SMALL LETTER E WITH ACUTE é`

```js
const drink = 'cafe\u0301';
console.log(drink.normalize());        // => 'café'  
console.log(drink.normalize().length); // => 4  
console.log(drink.normalize()[3]);     // => 'é'
```
不幸的是，不是所有的组合字符序列都只有一个单独符号的规范化格式。所以标准化方案不是通用的。

幸运的是，在大多数欧洲/北美语言中，这种方法是可行的。

#### 3.5 正则表达式匹配

正则表达式和字符串一样，也是按码元区分的。和上述场景类似，当使用正则表达式处理代理对和组合字符序列时也有同样的问题。

BMP 字符匹配是正常的，因为它只需要一个码元就能表示一个字符。

```js
const greetings = 'Hi!';
const regex = /^.{3}$/;
console.log(regex.test(greetings)); // => true
```
`greetings` 有3个符号，被编码成3个码元。正则表达式 `/.{3}/` 预期匹配3个码元，刚好能匹配上 `grettings`

当匹配星型符号（被2个码元组合的代理对编码）时，问题就出来了。

```js
const smile = '😀';
const regex = /^.$/;
console.log(regex.test(smile)); // => false
```
`smile` 包含了 `U+1F600 GRINNING FACE` 星型符号。`U+1F600` 用代理对 `0xD83D` + `0xDE00` 编码。而正则表达式 `/^.$/` 预期一个码元，所以匹配失败。

当使用星型符号定义正则表达式时，JS 甚至会抛出错误。

```js
const regex = /[😀-😎]/;
// => SyntaxError: Invalid regular expression: /[😀-😎]/: 
// Range out of order in character class
```
星型码点被编码为代理对。所以 js 使用码元 `/[\uD83D\uDE00-\uD83D\uDE0E]` 来表示正则表达式。每个码元都被认为是 pattern 中的一个单独元素，所以正则表达式会忽略代理对概念。

正则表达式 `\uDE00-\uD83D` 是无效的，因为 `uDE00` 大于 `\uD83D`, 所以会生成错误。

**正则表达式 u 标识**

幸运的是，ECMAScript 2015 引入了一个有用的 `u` 标识，表明正则表达式是 Unicode 敏感的。这个标识可以保证能正确的处理星型符号。

可以在正则表达式 `/u{1F600}/u` 中使用 unicode 转义序列。此转义方式比高低代理对 `/\uD83D\uDE00/` 占用空间要小。

接下来看看应用 `u` 标识时，`.` 操作符（包括大量的 `?+* 和 {3} {3,} {2,3}`）来匹配星型符号

```js
const smile = '😀';
const regex = /^.$/u;
console.log(regex.test(smile)); // => true
```
`/^.$/u` 因为添加了 `u` Unicode 敏感标识，所以可以匹配😊星型符号。

在正则表达式构造时，添加 `u` 标识就可以正确处理了。
```js
const smile = '😀';
const regex = /[😀-😎]/u;
const regexEscape = /[\u{1F600}-\u{1F60E}]/u;
const regexSpEscape = /[\uD83D\uDE00-\uD83D\uDE0E]/u;
console.log(regex.test(smile));         // => true
console.log(regexEscape.test(smile));   // => true
console.log(regexSpEscape.test(smile)); // => true
```

**正则表达式和组合标记**

不过无论有没有 `u` 标识，正则表达式都把组合标记看作一个单独的码元

如果需要匹配组合字符序列，那么必须得单独匹配基础字和和字符标记

```js
const drink = 'cafe\u0301';
const regex1 = /^.{4}$/;
const regex2 = /^.{5}$/;
console.log(drink);              // => 'café'  
console.log(regex1.test(drink)); // => false
console.log(regex2.test(drink)); // => true
```
字符串最终渲染出来4个符号`café`，而正则表达式只有 `/^.{5}$/` 才能正确匹配出 `cafe\u0301` 字符序列

### 4 总结

JS 中关于 Unicode 最重要的知识点应该是把字符串看作码元序列。

只有当开发者把字符串以字符或符号来看待时才会出现问题，忽略掉了码元序列这个概念。

当字符串包含代理对或组合字符序列时，以下场景就会出现困惑
- 获取字符串长度
- 字符串索引访问
- 正则表达式匹配

注意：大多数 js 字符串方法是非 Unicode 敏感的：比如 `myString.indexOf()`, `myString.slice()` 等

ECMAScript 2015 引入了一个和字符串、正则表达式中的码点转义序列`\u{1F600}`类似的非常好的特性，即正则表达式 `u` 标识，可以对字符串开启 Unicode 敏感模式。匹配星型符号时就比较容易了。

字符串迭代器`String.prototype[@@iterator]()` 就是 Unicode 敏感的。可以使用扩展操作符 `[...str]` 或 `Array.from(str)` 来创建符号数组，计算字符串长度，不需要打断代理对通过访问索引字符。注意，这些操作对性能有影响。

如果需要更好的 Unicode 字符处理方案，可以试试 [punycode](https://github.com/bestiejs/punycode.js/) 或者[生成](https://github.com/mathiasbynens/regenerate) 特殊正则表达式。

希望这篇文章能帮助你彻底掌握 Unicode.

