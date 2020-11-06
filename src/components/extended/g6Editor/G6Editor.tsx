import React, {useEffect, useRef} from 'react';
import G6, {Graph} from '@antv/g6';
import ToolsBar from './components/ToolsBar';
import {ENode} from './components/components/Nodes';
import {beanNode} from '@/components/extended/g6Editor/bean';


const G6Editor: React.FC<{ width: number, height: number }> = (props) => {
  const ref = useRef<HTMLDivElement>(null);


  let addedCount = 0;
  // // Register a custom behavior: add a node when user click the blank part of canvas
  const onSelect = () => {
    //
  };
  const graph = useRef<Graph | null>(null);
  // G6.registerBehavior('click-add-node', {
  //   getEvents() {
  //     return {
  //       'canvas:click': 'onClick',
  //     };
  //   },
  //   onClick(ev: any) {
  //     graph.current?.addItem('node',
  //       // {
  //       // x: ev.canvasX,
  //       // y: ev.canvasY,
  //       // type: addType.current,
  //       // id: `node-${addedCount}`, // Generate the unique id
  //       //
  //       // }
  //       beanNode(ev.canvasX, ev.canvasY, addType.current, addedCount)
  //     );
  //     addedCount++;
  //   },
  // });

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
  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log(event.dataTransfer.getData('type'));
    const type: ENode = event.dataTransfer.getData('type') as ENode;
    console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    graph.current?.addItem('node',
      // {
      // x: ev.canvasX,
      // y: ev.canvasY,
      // type: addType.current,
      // id: `node-${addedCount}`, // Generate the unique id
      //
      // }
      beanNode(event.nativeEvent.offsetX, event.nativeEvent.offsetY, type, addedCount)
    );
    addedCount++;
  };
  return <div>
    <ToolsBar
      onSelect={onSelect}
    />
    {/* <Button onClick={()=>graph.current?.downloadImage()}>导出</Button>*/}
    <div ref={ref} onDrop={onDragEnd}/>
  </div>;
};
export default G6Editor;
