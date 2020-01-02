# yskproxy firefox extension

To install it , visit [https://addons.mozilla.org/zh-CN/firefox/addon/yskproxy](https://addons.mozilla.org/zh-CN/firefox/addon/yskproxy)

You may also need pac hosting service:

[https://github.com/netroby/anypac](https://github.com/netroby/anypac)

You were using chrome? see:

[https://github.com/netroby/yskproxy-chrome-extension](https://github.com/netroby/yskproxy-chrome-extension)


## quick rules

```
by default, the proxy only for whitelist, but you can set reverse to true, that means by proxy default, the whitelist then became a bypass list.
{
  "type": "http",
  "host": "127.0.0.1", 
  "port": 8123,
  "reverse": false
  "whitelist":[
    'google.com',
    'youtube.com'
  ]
}
```

## Version

### 2020-01-02

1. Upgrade using new `browser.proxy.onRequest` api