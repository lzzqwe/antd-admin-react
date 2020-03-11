import styled from 'styled-components'

export const LeftNavWrapper = styled.div`
  overflow:hidden;
  .left-nav-header {
    display:flex;
    align-items:center;
    height:80px;
    background-color: #002140;
    padding: 0 10px;
    img {
      height:40px;
      width:40px;
      margin:0 15px;
    }
    h1 {
      color: white;
      font-size: 20px;
      margin-bottom: 0;
      font-weight:600;
    }
  }
`