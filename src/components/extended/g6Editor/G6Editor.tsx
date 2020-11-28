import React, {useEffect, useRef, useState} from 'react';
import G6, {Graph} from '@antv/g6';
import ToolsBar from './components/ToolsBar';
import {ENode} from './components/components/Nodes';
import {beanNode} from '@/components/extended/g6Editor/bean';
import {IG6GraphEvent} from '@antv/g6/lib/types';
import {Item} from '@antv/g6/lib/types';
import {Button} from 'antd';
import {base64Upload} from '@/service/file';


const G6Editor: React.FC<{ width: number, height: number }> = (props) => {
  console.log(props.width, props.height);
  const ref = useRef<HTMLDivElement>(null);
  let addedCount = 0;
  // // Register a custom behavior: add a node when user click the blank part of canvas
  const graph = useRef<Graph | null>(null);
  const [active, setActive] = useState<'drag' | 'line'>('drag');
  const onActiveChange = (ac: 'drag' | 'line') => {
    setActive(ac);
    if (ac != 'drag') {
      graph.current?.setMode('addEdge');
      // graph.current?.update({
      //
      // });
    } else {
      graph.current?.setMode('default');
    }
  };
  G6.registerBehavior('activate-any', {

    getEvents() {
      return {
        'edge:click': 'onNodeClick',
        'canvas:click': 'onCanvasClick',
      };
    },
    onNodeClick(e: any) {
      setSelected({
        type: 'edge',
        value: e.item.getModel().label,
        item: e.item,
      });
    },
    onCanvasClick() {
      setSelected(null);
    },
  });

  const [selected, setSelected] = useState<{ type: 'edge' | 'node', value: string, item: Item } | null>(null);
  const onLabelChange = (value: string) => {
    if (selected) {
      setSelected({
        ...selected,
        value,
      });
      graph.current?.updateItem(selected.item, {label: value}, true);
    }
  };
  const onEdgeChange = (value: string) => {
    let type = '';

    switch (value) {
      case 'horizontal':
        type = 'cubic-horizontal';
        break;
      case 'vertical':
        type = 'cubic-vertical';
        break;
    }
    console.log(value, type);

    if (selected && type) {
      graph.current?.updateItem(selected.item, {type: type}, true);
      console.log(graph.current?.getEdges());
    }
  };
  const onDelete = () => {
    if (selected?.item) {
      graph.current?.removeItem(selected?.item);
    }
  };
  useEffect(() => {
    if (ref.current && graph.current == null) {
      graph.current = new G6.Graph({
        container: ref.current,
        width: props.width - 26,
        height: props.height - 40,
        linkCenter: false,
        renderer: 'svg',
        enabledStack: true,
        defaultEdge: {
          type: 'cubic-horizontal',
          // configure the bending radius and min distance to the end nodes
          style:
            {
              radius: 10,
              offset: 30,
              endArrow: true,
              lineWidth: 3,
              stroke: '#F6BD16',
            },
        },
        modes: {
          default:
            [
              'drag-combo',
              'drag-canvas',
              'zoom-canvas',
              'drag-node',
              'click-select',
              'activate-relations',
              'activate-any',
            ],
          addEdge: [
            // 'drag-combo',
            // 'drag-canvas',
            'zoom-canvas',
            // 'drag-node',
            'click-select',
            'activate-relations',
            'create-edge',
          ],
        },
        // The node styles in different states
        nodeStateStyles: {
          // The node styles in selected state
          selected: {
            stroke: 'blue',
            lineWidth: 2,
            // fill: 'steelblue',
          },
        },
        edgeStateStyles: {
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
            label: 'dsa',
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
      graph.current.on('nodeselectchange', (e: IG6GraphEvent) => {
        // 当前操作的 item
        console.log(e.target?.getID());
        if (e.target) {
          setSelected({
            type: 'node',
            value: e.target.getModel().label as string,
            item: e.target as any,
          });
        }
      });
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
  const upload = async () => {
    const base64 = graph.current?.toDataURL();
    if (base64) {
      const res = await base64Upload(base64);
      if (res) {
        console.log(res);
      }
    }
  };
  const download = () => {
    graph.current?.downloadImage();
  };
  return <div>
    <ToolsBar
      active={active}
      onActiveChange={onActiveChange}
      selected={selected}
      onLabelChange={onLabelChange}
      onEdgeChange={onEdgeChange}
      onDelete={onDelete}
      onUpload={upload}
      onDownload={download}
    />

    <div ref={ref} onDrop={onDragEnd}/>
    <Button onClick={() => console.log(graph.current?.toDataURL())}>导出</Button>
  </div>;
};
export default G6Editor;
