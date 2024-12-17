self.addEventListener("install", (event) => {
  console.log("[sw] service worker is being installed", event);
});

self.addEventListener("push", (event) => {
  console.log("[sw] Push : メッセージを受信した", event, event.data.json());
  event.waitUntil(
    self.registration.showNotification("Message From Service Worker", {
      body: "Service Worker からのメッセージです",
      requireInteraction: true, // ユーザが操作するまで閉じなくなる
      actions: [
        // 選択肢を表示する。Mac Chrome の場合、「オプション」の中に格納されている
        { action: "Action 1", title: "Action Title 1" },
        { action: "Action 2", title: "Action Title 2" },
      ],
      data: event.data.json(),
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[sw] Notification Click : 通知がクリックされた", event);
  // `event.action` プロパティに `actions[].action` の値が設定されている。選択肢以外のバナー領域をクリックした場合は空文字で発火する
});

self.addEventListener("fetch", (event) => {
  console.log("[sw] Fetch", event);
});
