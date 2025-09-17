import { Controller } from "@hotwired/stimulus"

// Adds .is-visible when element enters viewport
export default class extends Controller {
  static values = { threshold: { type: Number, default: 0.15 } }

  connect() {
    this._observer = new IntersectionObserver(this._onIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: this.thresholdValue
    })
    this._observer.observe(this.element)
  }

  disconnect() {
    this._observer?.unobserve(this.element)
    this._observer?.disconnect()
  }

  _onIntersect = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.element.classList.add("is-visible")
        this._observer?.unobserve(this.element)
      }
    }
  }
}
