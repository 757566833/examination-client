import React, {useEffect, useRef, useState} from 'react';
import G6, {Graph} from '@antv/g6';
import ToolsBar, {EToolTag} from './components/ToolsBar';
import {ENode} from './components/components/Nodes';
import {beanNode} from '@/components/extended/g6Editor/bean';
import {Button} from 'antd';

export enum ENodeShape {
  圆形 = 'circle',
  矩形 = 'rect',
  椭圆 = 'ellipse',
  菱形 = 'diamond',
  三角形 = 'triangle',
  星 = 'star',
  图片 = 'image',
  卡片 = 'ModelRect'
}

const G6Editor: React.FC<{ width: number, height: number }> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const addType = useRef(ENodeShape.圆形);

  const onSelect = (selected: ENode, type: EToolTag) => {
    if (graph.current) {
      switch (type) {
        case EToolTag.操作:
          graph.current.setMode('default');
          break;
        case EToolTag.节点:
          graph.current.setMode('addNode');
          break;
        case EToolTag.线:
          graph.current.setMode('addEdge');
          break;
      }

      switch (selected) {
        case ENode.圆形:
          addType.current = ENodeShape.圆形;
          break;
        case ENode.矩形:
          addType.current = ENodeShape.矩形;
          break;
        // case ENode.椭圆:
        //   addType.current = ENodeShape.椭圆;
        //   break;
        case ENode.菱形:
          addType.current = ENodeShape.菱形;
          break;
        case ENode.三角形:
          addType.current = ENodeShape.三角形;
          break;
        // case ENode.三角形:
        //   addType.current = ENodeShape.三角形;
        //   break;
        // case ENode.三角形:
        //   addType.current = ENodeShape.三角形;
        //   break;
        // case ENode.三角形:
        //   addType.current = ENodeShape.三角形;
        //   break;
      }
    }
  };
  let addedCount = 0;
  // // Register a custom behavior: add a node when user click the blank part of canvas

  const graph = useRef<Graph | null>(null);
  G6.registerBehavior('click-add-node', {
    getEvents() {
      return {
        'canvas:click': 'onClick',
      };
    },
    onClick(ev: any) {
      graph.current?.addItem('node',
        // {
        // x: ev.canvasX,
        // y: ev.canvasY,
        // type: addType.current,
        // id: `node-${addedCount}`, // Generate the unique id
        //
        // }
        beanNode(ev.canvasX, ev.canvasY, addType.current, addedCount)
      );
      addedCount++;
    },
  });

  useEffect(() => {
    if (ref.current && graph.current == null) {
      graph.current = new G6.Graph({
        container: ref.current,
        width: props.width,
        height: props.height,
        renderer: 'svg',
        // The sets of behavior modes
        defaultNode: {
          // ... 其他属性
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
            leftBottom: true,
            rightBottom: true,
            // fill: '#fff',
            size: 10,
            lineWidth: 1,
            fill: '#fff',
            stroke: '#1890FF',
          },
        },
        modes: {
          default: [
            'drag-combo',
            // 'collapse-expand-combo',
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            'click-select',
            'tooltip',
            'edge-tooltip',
            // 'activate-relations',
            // 'brush-select',
            // 'lasso-select',
            // 'collapse-expand',
            // 'collapse-expand-group',
            // 'drag-group',
            // 'drag-node-with-group',
            // 'create-edge',
          ],
          addNode: [
            'click-add-node',
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            'click-select',
            'tooltip',
            'edge-tooltip',
            'click-add-node',
          ],
          addEdge: [
            'click-add-edge',
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            'click-select',
            'tooltip',
            'edge-tooltip',
          ],
        },
        // The node styles in different states
        nodeStateStyles: {
          // The node styles in selected state
          selected: {
            stroke: '#666',
            lineWidth: 2,
            fill: 'steelblue',
          },
        },
      });
      graph.current.data({
        nodes: [
          {
            id: 'circle',
            x: 100,
            y: 150,
            type: 'circle',
            size: [80],
          },
          {
            id: 'ellipse',
            type: 'ellipse',
            x: 200,
            y: 150,
            size: [80, 50],
          },
          {
            id: 'rect',
            x: 300,
            y: 150,
            type: 'rect',
            size: [80, 50],
          },
          {
            id: 'circle2',
            //   label: 'Triangle',
            x: 400,
            y: 150,
            type: 'triangle',
            size: [50],
          },
          {
            id: 'star',
            // label: 'Star',
            x: 500,
            y: 150,
            type: 'star',
            size: [50],
          },
          {
            id: 'diamond',
            x: 600,
            y: 150,
            type: 'diamond',
            size: [60, 80],
          },
        ],
        // edges: [
        //   {
        //     id: 'edge1',
        //     target: 'node2',
        //     source: 'node1',
        //   },
        // ],
      });
      graph.current.render();
      graph.current.setMode('default');
    }
  }, [props.height, props.width]);
  return <div>
    <ToolsBar onSelect={onSelect}/>
    {/* <Button onClick={()=>graph.current?.downloadImage()}>导出</Button>*/}
    <div ref={ref}/>
  </div>;
};
export default G6Editor;
