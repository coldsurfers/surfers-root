import { Toast } from '@coldsurfers/ocean-road/native'
import React, { createContext, PropsWithChildren, useCallback, useRef, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

export const ToastVisibleContext = createContext<{
  toastVisible: boolean
  message: string
  show: (
    params: {
      autoHide?: boolean
      duration?: number
      message: string
      type?: 'info' | 'warning' | 'error'
    } | void,
  ) => void
  hide: () => void
}>({
  toastVisible: false,
  message: '',
  show: () => {},
  hide: () => {},
})

export const ToastVisibleContextProvider = ({ children }: PropsWithChildren) => {
  const timeoutId: { current: ReturnType<typeof setTimeout> | null } = useRef(null)
  const [toastType, setToastType] = useState<'info' | 'warning' | 'error'>('info')
  const [message, setMessage] = useState<string>('')
  const [toastVisible, setToastVisible] = useState<boolean>(false)

  const hide = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    setToastVisible(false)
  }, [])
  const show = useCallback(
    (
      params: {
        autoHide?: boolean
        duration?: number
        message: string
        type?: 'info' | 'warning' | 'error'
      } | void,
    ) => {
      if (params) {
        setMessage(params.message)
        if (params.type) {
          setToastType(params.type ?? 'info')
        }
      }
      setToastVisible(true)
      if (params && params.autoHide) {
        timeoutId.current = setTimeout(
          () => {
            hide()
          },
          params.duration ? params.duration : 1500,
        )
      }
    },
    [hide],
  )

  return (
    <ToastVisibleContext.Provider
      value={{
        toastVisible,
        show,
        hide,
        message,
      }}
    >
      {children}
      <KeyboardAvoidingView behavior="position">
        {toastVisible && <Toast type={toastType} message={message} />}
      </KeyboardAvoidingView>
    </ToastVisibleContext.Provider>
  )
}
