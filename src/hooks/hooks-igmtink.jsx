import { useState, useCallback, useReducer } from 'react'

// -------------------- CUSTOM HTTP HOOK -------------------- //

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (config, dataConfig) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(config.url, {
        method: config.method ? config.method : 'GET',
        body: config.body ? JSON.stringify(config.body) : null,
        headers: config.headers ? config.headers : {}
      })

      if (!response.ok) {
        throw new Error('Request Failed!')
      }

      const data = await response.json()

      dataConfig(data)
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    sendRequest
  }
}

// -------------------- CUSTOM INPUT HOOK -------------------- //

const initialInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched }
  }

  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value }
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false }
  }

  return initialInputState
}

const useInput = validateValue => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  )

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = event => {
    dispatchInput({ type: 'INPUT', value: event.target.value })
  }

  const inputBlurHandler = () => {
    dispatchInput({ type: 'BLUR' })
  }

  const reset = () => {
    dispatchInput({ type: 'RESET' })
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}

export { useHttp, useInput }
