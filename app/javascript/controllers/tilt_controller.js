import { Controller } from "@hotwired/stimulus"

// Lightweight parallax tilt on mouse move
export default class extends Controller {
  static values = { max: { type: Number, default: 12 }, speed: { type: Number, default: 0.12 } }

  connect() {
    this._raf = null
    this._targetRot = { x: 0, y: 0 }
    this._current = { x: 0, y: 0 }
    this.element.style.transformStyle = "preserve-3d"
    this.element.addEventListener("mousemove", this.onMove)
    this.element.addEventListener("mouseleave", this.onLeave)
  }

  disconnect() {
    this.element.removeEventListener("mousemove", this.onMove)
    this.element.removeEventListener("mouseleave", this.onLeave)
    cancelAnimationFrame(this._raf)
  }

  onMove = (e) => {
    const rect = this.element.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    this._targetRot.x = -(dy * this.maxValue)
    this._targetRot.y =  (dx * this.maxValue)
    this._animate()
  }

  onLeave = () => {
    this._targetRot = { x: 0, y: 0 }
    this._animate()
  }

  _animate = () => {
    cancelAnimationFrame(this._raf)
    const step = () => {
      this._current.x += (this._targetRot.x - this._current.x) * this.speedValue
      this._current.y += (this._targetRot.y - this._current.y) * this.speedValue
      this.element.style.transform = `perspective(900px) rotateX(${this._current.x}deg) rotateY(${this._current.y}deg)`
      if (Math.abs(this._current.x - this._targetRot.x) > 0.01 || Math.abs(this._current.y - this._targetRot.y) > 0.01) {
        this._raf = requestAnimationFrame(step)
      }
    }
    this._raf = requestAnimationFrame(step)
  }
}
