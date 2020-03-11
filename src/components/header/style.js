import styled from 'styled-components'

export const HeadTop = styled.div`
 line-height:40px;
 border-bottom:1px solid blue;
 height:40px;
 text-align:right;
 padding-right:30px;
 .welcome {
   margin-right:5px;
 }
 .logout {
   cursor: pointer;
 }
`
export const HeadBottom = styled.div`
  height:40px;
  line-height:40px;
  display:flex;
  .head-bottom-left {
    flex:3;
    font-size:20px;
    font-weight:600;
    text-align:center;
    position:relative;
    &::after {
      position: absolute;
      top:100%;
      right:50%;
      content:'';
      border-top:20px solid white;
      border-right:20px solid transparent;
      border-left:20px solid transparent;
      border-bottom:20px solid transparent;
      transform:translateX(50%);
    }
  }
  .head-bottom-right {
    flex:7;
    text-align:right;
    margin-right:30px;
    img {
      margin:0 15px;
      width:30px;
      height:20px;
    }
  }
`