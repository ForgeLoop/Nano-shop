import React, { Component } from 'react'
import { Alert } from 'antd'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Microfrontend Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Alert
          message="Microfrontend Error"
          description="There was an error loading this module. Please try refreshing the page."
          type="error"
          showIcon
          action={
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{ 
                background: 'transparent', 
                border: '1px solid #ff4d4f', 
                color: '#ff4d4f',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          }
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary