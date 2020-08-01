// import React from 'react';
import React, {
  useRef,
  RefObject,
  useEffect,
  useState,
  // useState,
} from 'react';
import { Carousel } from 'antd';
// import styled from 'styled-components';
import {
  Flex,
  animateCSSByQuery,
  animateCSSByElement,
} from '@/css';
import Logo from '@/asset/logo.svg';
import ReactLogo from '@/asset/react.svg';
import styles from './index.less';
import { useScroll, useEffectOnce } from '@/hooks';

const name = ['一', '谷', '科', '技'];
const test = [{
  title: '板块1',
  description: '板块1备注',
  img: ReactLogo,
  detail: '板块1的内容详情',
}, {
  title: '板块2',
  description: '板块2备注',
  img: ReactLogo,
  detail: '板块2的内容详情',
}, {
  title: '板块3',
  description: '板块3备注',
  img: ReactLogo,
  detail: '板块3的内容详情',
}, {
  title: '板块4',
  description: '板块4备注',
  img: ReactLogo,
  detail: '板块4的内容详情',
}, {
  title: '板块5',
  description: '板块5备注',
  img: ReactLogo,
  detail: '板块5的内容详情',
}, {
  title: '板块6',
  description: '板块6备注',
  img: ReactLogo,
  detail: '板块6的内容详情',
}, {
  title: '板块7',
  description: '板块7备注',
  img: ReactLogo,
  detail: '板块7的内容详情',
}, {
  title: '板块8',
  description: '板块8备注',
  img: ReactLogo,
  detail: '板块8的内容详情',
}, {
  title: '板块9',
  description: '板块9备注',
  img: ReactLogo,
  detail: '板块9的内容详情',
}];
enum LR{
  left=1,
  right=2
}
const rol = (index:number)=>{
  if (index%4/2>=1) {
    return LR.right;
  } else {
    return LR.left;
  }
};
const Index:React.FC = ()=>{
  return (
    <>
      <div className={`${styles.header} flex animate__animated animate__fadeInRightSmall`}>
        <Flex>
          <img className={styles.logo} src={Logo}/>
          <div className={`${styles.text} flex`}>
            {name.map((item, index)=><div key={index}>{item}</div>)}
          </div>
        </Flex>
        <div>
          user
        </div>
      </div>
      <ClassificationList/>
      <div className={`${styles.footer} animate__animated animate__fadeInRightSmall`}>
        <div className={`${styles.text} flex`}>
          123
        </div>
      </div>
    </>
  );
};
export default Index;
const ClassificationList:React.FC = ()=>{
  const body: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { x, y } = useScroll(body);
  const preSelected = useRef<number>();
  useEffect(()=>{
    console.log('scroll', x, y);
  }, [x, y]);
  const [selected, setSelected] = useState<number>();
  const onCardClick = (e:React.SyntheticEvent<HTMLElement>)=>{
    const index = Number.parseInt(e.currentTarget.attributes.getNamedItem('data-index')?.value||'');
    if (!isNaN(index)&&index!=preSelected.current) {
      preSelected.current = index;
      setSelected(index);
      animateCSSByElement(e.currentTarget, 'zoomIn');
      animateCSSByQuery(body.current, `.itemAnimateCover${index}`, 'zoomInImg');
      const pos = rol(index);
      if (pos==LR.left) {
        animateCSSByQuery(body.current, `.detail${index}`, 'rightImg');
      } else {
        animateCSSByQuery(body.current, `.detail${index}`, 'leftImg');
      }
    }
  };
  // const listLength = test.length;
  useEffectOnce(()=>{
    for (const [index, _iterator] of test.entries()) {
      animateCSSByQuery(body.current, `.itemAnimate${index}`, 'fadeInUpSmall');
    }
  });
  return <div className={`${styles.content} flex`} ref={body}>
    <div className={`${styles.carouselParent} animate__animated animate__fadeInRightSmall`}>
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
    </div>

    <div>最新内容</div>
    <div>{`{消息标题}`}</div>
    <div className={styles.row}>
      {test.map((item, index)=>{
        let css:React.CSSProperties = {
          width: index==selected?552:252,
          height: index==selected?588:285,
          animationDelay: index==selected?'0ms':`${840+index*140}ms`,
          zIndex: index==selected?10000:100,
          top: Math.floor(index/4)*300,
        };
        switch (index%4) {
          case 0:
            css = {
              ...css,
              left: 24,
            };
            break;
          case 1:
            css = {
              ...css,
              right: 624,
            };
            break;
          case 2:
            css = {
              ...css,
              left: 624,
            };
            break;
          case 3:
            css = {
              ...css,
              right: 24,
            };
            break;
          default:
            break;
        }
        const pos = rol(index);
        const detailStyle:React.CSSProperties={
          width: index==selected?600:'100%',
        };
        switch (pos) {
          case LR.left:
            detailStyle.left=index==selected?550:0;
            break;
          case LR.right:
            detailStyle.right=index==selected?550:0;
            break;
          default:
            break;
        }
        return <div
          key={item.title}
          className={`itemAnimate${index} ${styles.col}`}
          style={css}
          onClick={onCardClick}
          data-index={index}
        >
          <div className={`flex ${styles.card}`} >
            <div
              className={`${styles.detail} detail${index}`}
              style={detailStyle}
            >
              {item.detail}
            </div>
            <div
              className={`${styles.cover} itemAnimateCover${index} flex`}
              style={{
                bottom: index==selected?0:100,
              }}
            >
              <img
                className={styles.img}
                alt="example"
                src={item.img}
              />

            </div>

            <div className={styles.meta}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        </div>;
      })}
    </div>
  </div>;
};


