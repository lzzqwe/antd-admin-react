import React from 'react';

import { Statistic, Card, Icon, DatePicker, Timeline } from 'antd';

import Line from './line'

import Bar from './bar'

import { HomeWrapper } from './style'

const { RangePicker } = DatePicker;

const tabList = [
  {
    key: 'tab1',
    tab: '访问量',
  },
  {
    key: 'tab2',
    tab: '销售量',
  },
];
class Home extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };
  render() {
    return (
      <HomeWrapper>
        <Card title="Default size card" extra={<Icon type="apple" />} style={{ width: 300, float: 'left' }}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="arrow-down" />}
            suffix="%"
          />
          <Statistic
            value={10}
            valueStyle={{ fontSize: 15 }}
            prefix={'日同比'}
            suffix={<div>%<Icon style={{ color: '#3f8600', marginLeft: 10 }} type="arrow-up" /></div>}
          />
        </Card>
        <Line></Line>
        <div style={{ position: 'absolute', top: 300,left: 24, right: 24 }}>
          <Card
            style={{ width: '100%'}}
            tabList={tabList}
            tabBarExtraContent={<RangePicker renderExtraFooter={() => 'extra footer'} showTime />}
            activeTabKey={this.state.key}
            onTabChange={key => {
              this.onTabChange(key, 'key');
            }}
          >
            <Card title={this.state.key === 'tab1' ? '访问量' : '销售量'} extra={<a href="https://www.baidu.com/">More</a>} style={{ width: 700, float: 'left' }}>
              <Bar></Bar>
            </Card>
            <Card title='任务' style={{ width: 400, float: 'right' }}>
              <Timeline>
                <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item color="red">
                  <p>Solve initial network problems 1</p>
                  <p>Solve initial network problems 2</p>
                  <p>Solve initial network problems 3 2015-09-01</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </Timeline.Item>
                <Timeline.Item color="gray">
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Card>
        </div>
      </HomeWrapper>
    )
  }
}
export default Home