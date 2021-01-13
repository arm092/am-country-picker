# **Country Picker plugin for Jquery and Vanilla Js**

Usage for jQuery:
```
$('.custom-picker').amcPicker();
```

Usage for Vanilla:
```
import AmcPicker from 'am-country-picker';

const picker = new AmcPicker(document.querySlelector('.custom-picker'));
```
You can put options as second parameter.
Default options are:
```
{
    //Countries codes that will be excluded from list
    exclude: [],
}
```






### Changelog

**1.0.3:**
* fixed small bugs
* updated all dependencies
* added 'amc-loaded' class on select after init

**1.0.2:**
* fixed jQuery method for returning jQuery object

**1.0.1:**
* added multi language support

**1.0.0:**
** created plugin
