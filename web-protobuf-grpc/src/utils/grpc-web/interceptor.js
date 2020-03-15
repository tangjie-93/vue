class Interceptor {
  constructor() {
    this.handlers = []
  }
  addInInterceptor(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected, rejected
    })
  }
}
