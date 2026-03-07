export class Subscriptor<T> {
  private callbacks: ((value: T | undefined) => void)[] = []
  private storeUnsubscribe: (() => void) | null = null
  private _value: T | undefined
  constructor(
    private readonly readValue: () => T | undefined,
    private readonly wireSubscription: (callback: (value: T | undefined) => void) => () => void,
    private readonly isEqual: (a: T | undefined, b: T | undefined) => boolean
  ) {
    this._value = readValue()
  }

  /** Current cached value. */
  public get value(): T | undefined {
    console.log(this.callbacks)
    return this._value
  }
  public subscribe(callback: (value: T | undefined) => void): void {
    this.callbacks.push(callback)
    if (!this.storeUnsubscribe) {
      this._value = this.readValue()
      this.storeUnsubscribe = this.wireSubscription((newValue) => {
        if (this.isEqual(this._value, newValue)) return
        this._value = newValue
        this.callbacks.forEach((cb) => cb(newValue))
      })
    }
    callback(this._value)
  }
  public destroy(): void {
    this.storeUnsubscribe?.()
    this.storeUnsubscribe = null
    this.callbacks = []
  }
}
