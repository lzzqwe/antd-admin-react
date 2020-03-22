import styled from 'styled-components'

import bgImg from '../../assset/img/bg.jpg'

export const LoginWrapper = styled.div`
  width:100%;
  height:100%;
  background-image:url(${bgImg});
  background-size:cover;
  background-repeat:no-repeat;
  overflow:hidden;
  position:relative;
`
export const LoginBox = styled.div`
  width:450px;
  height:250px;
  background-color:#ffff;
  margin:205px auto 0;
  padding:20px 40px;
  box-sizing:border-box;
  .userLogin{
    font-size:20px;
    text-align:center;
    font-weight:600;
  }
  .login-form-button{
    width:100%;
  }
`
export const InternetContent = styled.div`
  line-height:50px;
  font-size:20px;
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
`