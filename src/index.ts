import helix, {log as helixLog} from 'helix-js'
import inferno from 'inferno'
import * as createElement from 'inferno-create-element'

export const h = createElement
export const log = helixLog

function renderer (dom) {
  let _dom = dom
  return function (node, state, prev, actions) {
    if (node) {
      inferno.render(node(state, prev, actions), _dom)
    }
  }
}

export default function (opts) {
  const config = Object.assign({}, opts, {
    render: renderer(opts.mount),
  })
  return helix(config)
}
