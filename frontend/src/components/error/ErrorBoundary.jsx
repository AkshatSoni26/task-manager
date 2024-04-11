import React from 'react'

function ErrorBoundary() {
  return (
    <div style={{
        width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'
    }}>
        something went wrong
    </div>
  )
}

export default ErrorBoundary