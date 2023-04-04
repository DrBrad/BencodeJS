Bencode
========

This is an implementation of Bencode for JavaScript. Bencode is used for DHTs, Torrents, and Google DataServers. Its a lightweight fast data serialization.
[Wikipedia](https://en.wikipedia.org/wiki/Bencode)

I have also made an implementation of Bencode with [Java](https://github.com/DrBrad/Bencode)

Usage
-----
Here are some examples of how to use the Bencode library.

**Bencode**
```JavaScript
//DATA MUST BE IN THE FORMAT: Uint8Array
var ben = new Bencode(data).decode();
console.log(ben);
```
