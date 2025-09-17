import { Controller } from "@hotwired/stimulus"

// Smooth in-page scrolling and progress bar
export default class extends Controller {
  static targets = ["progress"]

  connect() {
    this._onScroll = this._updateProgress.bind(this)
    window.addEventListener("scroll", this._onScroll)
    this._updateProgress()
  }

  disconnect() { window.removeEventListener("scroll", this._onScroll) }

  scroll(event) {
    const href = event.currentTarget.getAttribute("href")
    if (href?.startsWith("#")) {
      event.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }
  }

  _updateProgress() {
    const h = document.documentElement
    const scrolled = (h.scrollTop || document.body.scrollTop)
    const height = h.scrollHeight - h.clientHeight
    const percent = height ? Math.min(100, Math.max(0, (scrolled / height) * 100)) : 0
    if (this.hasProgressTarget) this.progressTarget.style.width = `${percent}%`
  }
}
