import React from 'react';
import {ButtonWrapper} from './style'
function LinkButton(props) {
   return (
     <ButtonWrapper {...props} className='link-button'></ButtonWrapper>
   )
}

export default LinkButton