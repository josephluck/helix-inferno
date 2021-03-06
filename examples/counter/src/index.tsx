import helix, {h} from '../../../src/index'

function counterView (state, prev, actions) {
  return (
    <section class='section hero'>
      <div class='card'>
        <div class='card-content'>
          <div class='title is-2'>
            <span>The count is: </span>
            <span>{state.count}</span>
          </div>

          <div class='block control is-grouped'>
            <a class='control button' onclick={() => actions.increment(state.amount)}>
              Increment
            </a>
            <a class='control button' onclick={() => actions.decrement(state.amount)}>
              Decrement
            </a>
          </div>
          <div class='block control is-grouped'>
            <a class='control button' onclick={() => actions.incrementAsync(state.amount, state.timeout)}>
              Increment in {state.timeout} second{state.timeout > 1 ? 's' : ''}
            </a>
            <a class='control button' onclick={() => actions.decrementAsync(state.amount, state.timeout)}>
              Decrement in {state.timeout} second{state.timeout > 1 ? 's' : ''}
            </a>
          </div>
          
          <div class='block'>
            <div class='control'>
              <label class='label'>Adjust increment / decrement amount ({state.amount})</label>
              <input
                type='range'
                value={state.amount}
                min='1'
                max='50'
                oninput={e => actions.setAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div class='block'>
            <div class='control'>
              <label class='label'>Adjust async timeout ({state.timeout}s)</label>
              <input
                type='range'
                value={state.timeout}
                min='1'
                max='10'
                oninput={e => actions.setAsyncTimeout(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

let mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: {
    state: {
      count: 10,
      amount: 1,
      timeout: 1,
    },
    reducers: {
      increment (state, amount) {
        return { count: state.count + amount }
      },
      decrement (state, amount) {
        return { count: state.count - amount }
      },
      setAsyncTimeout (state, timeout) {
        return { timeout }
      },
      setAmount (state, amount) {
        return { amount }
      }
    },
    effects: {
      incrementAsync (state, actions, amount, secs) {
        setTimeout(() => {
          actions.increment(amount)
        }, secs * 1000)
      },
      decrementAsync (state, actions, amount, secs) {
        setTimeout(() => {
          actions.decrement(amount)
        }, secs * 1000)
      },
    },
  },
  component: counterView,
  mount,
})
