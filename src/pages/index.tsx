// import React from 'react';
import React, {
  useRef,
  RefObject,
  useEffect,
  useState,
} from 'react';
import {
  Carousel, Button, Typography,
} from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';
import ReactLogo from '@/asset/react.svg';
import styles from './index.less';
// import {
//   useScroll,
//   // useEffectOnce
// } from '@/hooks/common';
import {getColumnList, IColumn} from '@/service/note';
import {useEffectOnce} from '@/hooks/common';


const {Title, Paragraph} = Typography;

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

enum LR {
  left = 1,
  right = 2
}

const rol = (index: number) => {
  if (index % 4 / 2 >= 1) {
    return LR.right;
  } else {
    return LR.left;
  }
};

const Index: React.FC = () => {
  return (
    <>
      <ClassificationList/>
      <div className={`${styles.footer} animate__animated animate__fadeInRightSmall flex`}>
        <div className={`${styles.text} `}>
          footer
        </div>
      </div>
    </>
  );
};
export default Index;
const ClassificationList: React.FC = () => {
  const body: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const getColumns = async () => {
    const res = await getColumnList();
    setColumns(res?.text.data || []);
  };
  useEffectOnce(() => {
    getColumns().then();
  });
  // const {x, y} = useScroll(body);
  // useEffect(() => {
  //   console.log('scroll', x, y);
  // }, [x, y]);
  const [selected, setSelected] = useState<number>();
  const [detail, setDetail] = useState<number>();
  const onCardClick = (e: React.SyntheticEvent<HTMLElement>) => {
    console.log('触发了onCardClick');
    const index = Number.parseInt(e.currentTarget.attributes.getNamedItem('data-index')?.value || '');
    if (!isNaN(index)) {
      setSelected(index);
      setTimeout(() => {
        setDetail(index);
      }, 280);
      // animateCSSByElement(e.currentTarget, 'zoomIn');
      // animateCSSByQuery(body.current, `.itemAnimateCover${index}`, 'zoomInImg');
      // const pos = rol(index);
      // if (pos==LR.left) {
      //   animateCSSByQuery(body.current, `.detail${index}`, 'rightImg');
      // } else {
      //   animateCSSByQuery(body.current, `.detail${index}`, 'leftImg');
      // }
    }
  };
  const cancel = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setDetail(() => undefined);
    setTimeout(() => {
      setSelected(() => undefined);
    }, 280);
  };
  // const listLength = test.length;
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
    {/* <Typography>
      <Title>最新内容</Title>
      <Paragraph>
      In the process of internal desktop applications development
      </Paragraph>
    </Typography> */}
    <div
      className='animate__animated animate__fadeInUpSmall'
      style={{textAlign: 'center', padding: '24px 0', animationDelay: '840ms'}}>
      <h2>最新内容</h2>
      <h3> In the process of internal desktop applications development</h3>
    </div>
    <div className={styles.row}>
      {columns.map((item, index) => {
        let css: React.CSSProperties = {
          width: index == selected ? 552 : 252,
          height: index == selected ? 588 : 285,
          animationDelay: index == selected ? '0ms' : `${840 + index * 140}ms`,
          zIndex: index == selected ? 10000 : 100,
          top: Math.floor(index / 4) * 300,
        };
        switch (index % 4) {
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
        console.log('detailStyle', index == detail);
        const detailStyle: React.CSSProperties = {
          width: index == detail ? 600 : '100%',
        };
        switch (pos) {
          case LR.left:
            detailStyle.left = (index == detail ? 550 : 0);
            break;
          case LR.right:
            detailStyle.right = (index == detail ? 550 : 0);
            break;
          default:
            break;
        }
        return <div
          key={item.title}
          className={`animate__animated animate__fadeInUpSmall ${styles.col}`}
          style={css}
          onClick={onCardClick}
          data-index={index}
        >
          <div className={`flex ${styles.card}`}>
            <div
              className={`${styles.detail} itemAnimateDetail${index}`}
              style={detailStyle}
            >
              <Typography>
                <Title>{item.title}</Title>
                <Paragraph>
                  {item.detail}
                </Paragraph>
              </Typography>

              <Button shape="circle" size='small' className={styles.close} onClick={cancel}>
                <CloseOutlined/>
              </Button>
            </div>
            <div
              className={`${styles.cover} itemAnimateCover${index} flex`}
              style={{
                bottom: index == selected ? 0 : 100,
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


