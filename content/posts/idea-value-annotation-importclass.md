---
title: "IDEA中@Value注解使用importClass提示没展示Spring的class"
date: 2024-01-09
slug: idea-value-annotation-importclass
summary: "IDEA 里使用 @Value 注解时，Alt+Enter 提示列表不显示 Spring 类的问题排查。"
categories:
  - 工具
tags:
  - IDEA
  - Spring
---

通俗点就是，使用了@Value注解，使用Alt+Enter获取import类时，列表没有显示Spring的@Value类。
看图吧


![修改前提示列表没有Spring@Value的类情况](/assets/springValue-1.png)
![需要修改IDEA配置](/assets/springValue-2.png)
![修改后](/assets/springValue-3.png)
