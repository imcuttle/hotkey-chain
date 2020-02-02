const HotKey = require('../').HotKeyChainManager
const { parseHotkey } = require('is-hotkey')

const hotKey = new HotKey(document)

describe('HotKey', function() {
  beforeEach(() => {
    hotKey.emitter.removeAllListeners()
    hotKey.start()
  })
  it('should spec works well', function(done) {
    let i = 0
    let evt
    hotKey
      .on('cmd+enter', (event, next) => {
        evt = event
        i++
        next()
      })
      .on('cmd+enter', (event, next) => {
        expect(event).toBe(evt)
        expect(event.type).toBe('keydown')
        expect(i).toBe(1)
        done()
      })
    document.dispatchEvent(new KeyboardEvent('keydown', parseHotkey('cmd+enter')))
  })

  it('should spec passing return value', function() {
    const handler = hotKey
      .on('cmd+enter', (event, next) => {
        return next() + 'kkk'
      })
      .on('cmd+enter', (event, next) => {
        return 'hhh'
      }).handler
    expect(handler(new KeyboardEvent('keydown', parseHotkey('cmd+enter')))).toBe('hhhkkk')
    expect(handler(new KeyboardEvent('keydown', parseHotkey('enter')))).toBe(undefined)
  })

  it('should spec passing return async value', async function() {
    const handler = hotKey
      .on('cmd+enter', (event, next) => {
        return next()
      })
      .on('cmd+enter', (event, next) => {
        return new Promise(resolve => {
          setTimeout(resolve, 100, 'hhh')
        })
      }).handler
    expect(await handler(new KeyboardEvent('keydown', parseHotkey('cmd+enter')))).toBe('hhh')
  })

  it('should spec works `enter` and `cmd+enter` well', function() {
    let list = []
    hotKey
      .on('enter', (event, next) => {
        list.push('one-enter')
        next()
      })
      .on('enter', (event, next) => {
        list.push('two-enter')
        next()
      })
      .on('cmd+enter', (event, next) => {
        list.push('one-cmd+enter')
        next()
      })
      .on('cmd+enter', (event, next) => {
        list.push('two-cmd+enter')
      })
    document.dispatchEvent(new KeyboardEvent('keydown', parseHotkey('cmd+enter')))
    expect(list).toMatchInlineSnapshot(`
                    Array [
                      "one-cmd+enter",
                      "two-cmd+enter",
                    ]
                `)
  })

  it('should spec works `stop`', function() {
    let list = []
    hotKey
      .on('enter', (event, next) => {
        list.push('one-enter')
        next()
      })
      .on('enter', (event, next) => {
        list.push('two-enter')
        next()
      })
      .on('cmd+enter', (event, next) => {
        list.push('one-cmd+enter')
        next(event)
      })
      .on('cmd+enter', (event, next) => {
        list.push('two-cmd+enter')
      })
    hotKey.stop()
    document.dispatchEvent(new KeyboardEvent('keydown', parseHotkey('cmd+enter')))
    expect(list).toMatchInlineSnapshot(`Array []`)
  })
})
