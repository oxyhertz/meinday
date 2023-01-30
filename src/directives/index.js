export const focusDirective = {
  mounted: (el) => {
    el.focus()
  },
}
export const clickOutsideDirective = {
  mounted(el, { value: cb }) {
    el.clickOutside = ({ clientX, clientY }) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      if (
        !(
          clientX > left &&
          clientX < left + width &&
          clientY > top &&
          clientY < top + height
        )
      ) {
        cb()
      } else {
      }
    }
    setTimeout(() => {
      document.addEventListener('click', el.clickOutside)
    }, 0)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutside)
  },
}
