import React from 'react';
import './index.css'


function Wrapper({children}) {
  return (
      <div>
          <div className="green-background" />
          <div className="wrap ">
              {children}
          </div>
      </div>
  );
}

export default Wrapper;