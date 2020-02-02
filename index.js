/**
 * The easy way to create shortcut
 * @author imcuttle
 */

import isHotKey from 'is-hotkey'
// Node.js built-in module
import EventEmitter from 'events'

import { waterFall } from 'run-seq'

export default class HotKeyChain {
  constructor(opts = {}) {
    this.opts = Object.assign(
      {
        isHotKey
      },
      opts
    )

    this.emitter = new EventEmitter()
    this.handler = event => {
      const matchedHotKeys = []
      for (const hotKey of this.emitter.eventNames()) {
        if (this.opts.isHotKey(hotKey, event)) {
          matchedHotKeys.push(hotKey)
        }
      }

      const handlers = matchedHotKeys.reduce((list, key) => {
        list = list.concat(this.emitter.listeners(key))
        return list
      }, [])

      return waterFall(handlers, [event], null)
    }
  }

  on(hotKey, handle) {
    this.emitter.on(hotKey, handle)
    return this
  }

  off(hotKey, handle) {
    this.emitter.off(hotKey, handle)
    return this
  }

  removeAllListeners(hotKey) {
    this.emitter.removeAllListeners(hotKey)
    return this
  }
}

export class HotKeyChainManager extends HotKeyChain {
  constructor(el, opts) {
    super(
      Object.assign(
        {
          eventType: 'keydown'
        },
        opts
      )
    )

    this.el = el
  }

  start() {
    this.el.addEventListener(this.opts.eventType, this.handler)
    return this
  }

  stop() {
    this.el.removeEventListener(this.opts.eventType, this.handler)
    return this
  }
}
