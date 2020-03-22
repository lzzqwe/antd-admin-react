import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Result, Button } from 'antd';
class NotFound extends Component {
  state = {}
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
      />
     )
  }
}
export default NotFound