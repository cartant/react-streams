import React from "react"
import { of } from "rxjs"
import {
  action,
  getTargetValue,
  handler,
  mapActions,
  streamProps
} from "react-streams"

const Text = streamProps(({ message }) => {
  const onChange = handler(getTargetValue)

  const message$ = mapActions(of(message), [
    action(onChange, text => () => text)
  ])
  /**
   * The above is the same as the "pure" Rx below. `mapActions` and `action` are
   * just helpers around this "concat(of, merge).scan" pattern
   * 
    const message$ = concat(
      of(message),
      merge(from(onChange).pipe(map(text => () => text)))
    ).pipe(scan((message, fn) => fn(message)))
   */

  return {
    message: message$,
    onChange
  }
})

export default () => (
  <Text message="Hello">
    {({ message, onChange }) => (
      <div>
        <div id="message">{message}</div>
        <input id="input" type="text" value={message} onChange={onChange} />
      </div>
    )}
  </Text>
)
