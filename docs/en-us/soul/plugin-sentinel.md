---
title: plugin-sentinel
keywords: soul
description: sentinel plugin
---

## Explanation

* Sentinel is one of the options that fuses and limit traffic.

* Sentinel supports fuse and current-limit functions for soul gateway.


## Plugin Setting

* In `soul-admin` -->  plugin management --> `sentinel` set to enable.

* If you don't want to use it, please close the plugin in `soul-admin`.


## Plugin Usage

* Introducing the follow supports to the pom.xml file of soul project.
```xml
  <!-- soul sentinel plugin start-->
  <dependency>
      <groupId>org.dromara</groupId>
      <artifactId>soul-spring-boot-starter-plugin-sentinel</artifactId>
       <version>${last.version}</version>
  </dependency>
  <!-- soul sentinel plugin end-->
``` 

* Selectors and rules, please refer to: [selector](selector.md)

* Sentinel Handle Details:
    
    * Whether open traffic control(1 or 0): whether enable sentinel traffic control function.
    
    * Traffic control effect: effect(reject/ wait in line/ slow start mode), it do not support current-limit by call relationship. 
    
    * Type of current limit threshold: type of current limit threshold(QPS or thread quantity mode)。
        
    * Whether open fuse function(1 or 0): whether enable fuse function of `sentinel`.
        
    * Type of fuse: fuse strategy, support RT of seconds level/ exception proportion of seconds level/ exception quantity of minutes level strategy.
        
    * Fuse threshold: threshold.
      
    * Size of fuse window: time of demoting(unit: second).
        
    * URI of fuse: demoted uri after fuse.

