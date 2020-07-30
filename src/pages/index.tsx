import React from 'react';
import { Carousel, Card, Col } from 'antd';
import styled from 'styled-components';
import { Flex } from '@/css';
import Logo from '@/asset/logo.svg';
import styles from './index.less';
const Header = styled(Flex)`
  justify-content: space-between;
  background: #364768;
  height:60px;
  padding:12px;
  border-radius: 6px 6px 0 0;
`;
const LogoDom = styled.img`
  height:36px;
  width:36px;
`;
const TextDom = styled(Flex)`
  color:#ffffff;
  line-height:36px;
  margin:0 0 0 12px;
`;
const CarouselDom = styled.div`
animation-delay: 280ms;
width:100%;
`;
const Footer = styled(Flex)`
  justify-content: center;
  background: #364768;
  height:60px;
  padding:12px;
  border-radius: 0 0 6px 6px;
  animation-delay: 560ms;
  width:100%;
`;
const ConText = styled.div`
flex:1;
overflow: auto;
`;
const RowDom = styled.div`
 padding:96px;
 width:1296px;
 margin:0 auto;
`;
const name = ['一', '谷', '科', '技'];
const test = ['板块1', '板块2', '板块3', '板块4', '板块5', '板块6', '板块7', '板块8', '板块9'];
const Index:React.FC = ()=>{
  return (
    <>
      <Header className='animate__animated animate__fadeInRightSmall'>
        <Flex>
          <LogoDom src={Logo}/>
          <TextDom>{name.map((item, index)=><div key={index}>{item}</div>)}</TextDom>
        </Flex>
        <div>
          user
        </div>
      </Header>
      <ConText>
        <CarouselDom className='animate__animated animate__fadeInRightSmall'>
          <Carousel
            className={`${styles.carousel} `}
            effect="fade"
          >
            <div>
              <h3>广告位招租</h3>
            </div>
            <div>
              <h3>广告位2招租</h3>
            </div>
          </Carousel>
        </CarouselDom>

        <div>最新内容</div>
        <div>{`{消息标题}`}</div>
        <RowDom>
          {test.map((item, index)=>{
            return <Col
              span={6}
              key={item}
              className='animate__animated animate__fadeInUpSmall'
              style={{
                animationDelay: `${840+index*140}ms`,
              }}
            >
              <Card
                hoverable={true}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Card.Meta title={item} description="www.instagram.com" />
              </Card>
            </Col>;
          })}
        </RowDom>

      </ConText>
      <Footer className='animate__animated animate__fadeInRightSmall'>
        <TextDom>
          123
        </TextDom>
      </Footer>
    </>
  );
};
export default Index;
