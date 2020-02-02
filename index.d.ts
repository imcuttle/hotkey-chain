/**
 * The easy way to create shortcut
 * @author imcuttle
 */
// @ts-ignore
import { EventEmitter } from 'events'

export interface HotKeyChainOption {
  isHotKey?: (hotKey: string, event: Event) => boolean
}

export type ChainListener<E = Event, R = any> = (event: E, next: () => R) => R

export default class HotKeyChain<E = Event, R = any> {
  constructor(opts?: HotKeyChainOption)

  public opts: HotKeyChainOption
  public emitter: EventEmitter
  public handler: (event: E) => R

  on(hotKey: string, listener: ChainListener<E, R>): this
  off(hotKey: string, listener: ChainListener<E, R>): this
  removeAllListeners(hotKey?: string): this
}

export interface HotKeyChainManagerOption extends HotKeyChainOption {
  eventType?: string
}

export class HotKeyChainManager<E, R> extends HotKeyChain<E, R> {
  constructor(el: HTMLElement, opts?: HotKeyChainManagerOption)

  public opts: HotKeyChainManagerOption
  public el: HTMLElement

  start(): this
  stop(): this
}
