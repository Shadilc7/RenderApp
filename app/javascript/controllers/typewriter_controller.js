import { Controller } from "@hotwired/stimulus"

// Simple typewriter effect for headings or taglines
export default class extends Controller {
  static values = { text: String, speed: { type: Number, default: 55 }, loop: { type: Boolean, default: false } }

  connect() {
    this.idx = 0
    this.original = this.textValue || this.element.textContent.trim()
    this.element.textContent = ""
    this._type()
  }

  disconnect() { clearTimeout(this._to) }

  _type = () => {
    if (this.idx <= this.original.length) {
      this.element.textContent = this.original.slice(0, this.idx)
      this.idx++
      this._to = setTimeout(this._type, this.speedValue)
    } else if (this.loopValue) {
      setTimeout(() => { this.idx = 0; this.element.textContent = ""; this._type() }, 1200)
    }
  }
}
