import React from 'react';
import Toast from 'react-bootstrap/Toast';

function MessageToast({show=true, setShow}) {
  
  return (
    
    <div className='message-toast position-absolute end-0 top-0 m-3' style={{
      zIndex:100
    }}>
        <Toast onClose={() => setShow(false)} show={show}  
        delay={3000} autohide
        >
          <Toast.Body 
              style={{backgroundColor:"red", color:'white', borderRadius:'4px'}}
              > <strong>Error!!! </strong>Title is required.</Toast.Body>
        </Toast>
        </div>
  );
}

export default MessageToast;