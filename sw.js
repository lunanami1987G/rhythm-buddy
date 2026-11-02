/* 节奏伙伴 —— 离线缓存 Service Worker
 *
 * 为什么需要这个文件：
 *   GitHub Pages 是线上地址。iPhone / iPad「添加到主屏幕」之后，一旦没网
 *   就是一片空白。而这个工具的典型场景（练琴）经常在没有稳定网络的地方，
 *   所以必须把页面本身存一份在本地。
 *
 * 为什么是「网络优先」而不是「缓存优先」：
 *   缓存优先会让用户永远停在第一次访问的那个版本，改了也看不到，这是
 *   PWA 最经典的事故。这里在线时永远先取网络，取到就顺手更新缓存；只有
 *   网络失败（或 3 秒没响应）才回落到缓存。版本号因此也不用维护。
 *
 * 这个文件是可选的：index.html 单独拷到桌面双击打开时，浏览器不给
 * file:// 注册 Service Worker，注册代码会静默失败，主程序照常运行。
 */

var CACHE = "rhythm-buddy-v1";
var PAGE = "./index.html";
var CORE = [PAGE, "./assets/icon-180.png"];
var NET_TIMEOUT = 3000; // 弱网别干等，3 秒没动静就用缓存

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* 页面导航：先试网络，超时或失败就用缓存 */
function networkFirst(req) {
  return new Promise(function (resolve) {
    var settled = false;

    function useCache() {
      if (settled) return;
      settled = true;
      caches.match(PAGE).then(function (hit) {
        resolve(hit || new Response("离线，且本地还没有缓存过这个页面。请先联网打开一次。", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=UTF-8" }
        }));
      });
    }

    var timer = setTimeout(useCache, NET_TIMEOUT);

    fetch(req).then(function (res) {
      clearTimeout(timer);
      if (settled) return;
      // 只有正常响应才更新缓存，避免把 404 页面存进去
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(PAGE, copy); });
      }
      settled = true;
      resolve(res);
    }).catch(function () {
      clearTimeout(timer);
      useCache();
    });
  });
}

/* 静态资源：先给缓存（快），同时后台悄悄拉新的 */
function staleWhileRevalidate(req) {
  return caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;

  // 非 GET（比如 API 调用）直接放行，缓存不该插手
  if (req.method !== "GET") return;

  // 只处理本站资源，跨域请求（导出的 blob、data URI）一律放行
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  // 页面本身
  if (req.mode === "navigate") {
    e.respondWith(networkFirst(req));
    return;
  }

  // sw.js 自身不要缓存，否则新版本永远装不上
  if (url.pathname.endsWith("/sw.js")) return;

  e.respondWith(staleWhileRevalidate(req));
});
