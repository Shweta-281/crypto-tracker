export class MockWebSocket {
  constructor(store) {
    this.store = store;
  }

  connect() {
    this.interval = setInterval(() => {
      this.store.dispatch({ type: 'crypto/updatePrices' });
    }, 1500);
  }

  disconnect() {
    clearInterval(this.interval);
  }
}