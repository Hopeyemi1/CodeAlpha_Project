
import React, { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState('')

  const handleCalculate = () => {
    try {
      if (!value.trim()) return

      const result = Function(
        '"use strict"; return (' + value + ')'
      )()

      if (!Number.isFinite(result)) {
        setValue('Error')
      } else {
        setValue(String(result))
      }
    } catch {
      setValue('Error')
    }
  }

  return (
    <div className="container">
      <div className="caculator">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="display">
            <input
              type="text"
              value={value}
              readOnly
            />
          </div>

          <div>
            <input type="button" value="AC" onClick={() => setValue('')} />
            <input type="button" value="DE" onClick={() => setValue(value.slice(0, -1))} />
            <input type="button" value="." onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="/" onClick={(e) => setValue(value + e.target.value)} />
          </div>

          <div>
            <input type="button" value="7" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="8" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="9" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="*" onClick={(e) => setValue(value + e.target.value)} />
          </div>

          <div>
            <input type="button" value="4" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="5" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="6" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="-" onClick={(e) => setValue(value + e.target.value)} />
          </div>

          <div>
            <input type="button" value="1" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="2" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="3" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="+" onClick={(e) => setValue(value + e.target.value)} />
          </div>

          <div>
            <input type="button" value="00" onClick={(e) => setValue(value + e.target.value)} />
            <input type="button" value="0" onClick={(e) => setValue(value + e.target.value)} />
            <input
              type="button"
              value="="
              className="equals"
              onClick={handleCalculate}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default App

