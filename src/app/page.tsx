'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import ResizableNodeSelected from './ResizableNodeSelected'
import {
  FitViewOptions,
  Node,
  Edge,
  Position,
  useNodesState,
  useEdgesState,
  ReactFlowInstance
} from 'reactflow';

import 'reactflow/dist/style.css';
import Flow from './components/Flow';
import Navbar from './components/Navbar';


const rfStyle = {
  backgroundColor: 'black',
};
const nodeTypes = {
  ResizableNodeSelected,
};
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function Home() {


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<
    ReactFlowInstance | undefined
  >();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const lastNodePosition = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const fetchNodes = async () => {
      const nodes = await fetch('/api/nodes/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonNodes = await nodes.json()
      setNodes(jsonNodes)
    }
    fetchNodes()
  }, [])
  const onInit = useCallback(
    (flowInstance: ReactFlowInstance) => setReactFlowInstance(flowInstance),
    [reactFlowInstance]
  );

  const handleDragEnd = useCallback(
    (event: React.MouseEvent<Element>, node: Node) => {
      if (node.type === "group") return;

      nodes.forEach((nds: Node) => {
        if (
          nds.position.x <= node.position.x &&
          nds.position.x + parseInt(nds.style?.width?.toString() || "0") >=
          node.position.x &&
          nds.position.y <= node.position.y &&
          nds.position.y + parseInt(nds.style?.height?.toString() || "0") >=
          node.position.y && nds.id !== node.id
        ) {

          let groupNode = nds;
          groupNode.type = "group";
          groupNode.expandParent = true
          groupNode.data.label = nds.data.label

          setNodes((prevNodes) => {
            return prevNodes.map((n) => {
              if (n.id === node.id) {

                n.parentNode = groupNode?.id;
                n.position = {
                  x: node.positionAbsolute?.x! - groupNode.position.x,
                  y: node.positionAbsolute?.y! - groupNode.position.y
                };
              }

              return n;
            });
          });
        } else if (
          (nds.position.x >= node.position.x ||
            nds.position.x + parseInt(nds.style?.width?.toString() || "0") <=
            node.position.x ||
            nds.position.y >= node.position.y ||
            nds.position.y + parseInt(nds.style?.height?.toString() || "0") <=
            node.position.y) && nds.id !== node.id
        ) {
          let groupNode = nds;
          groupNode.type = "ResizableNodeSelected";


          setNodes((prevNodes) => {
            return prevNodes.map((n) => {
              if (n.id === node.id) {

                delete n.parentNode;
                n.position = {
                  x: node.positionAbsolute?.x!,
                  y: node.positionAbsolute?.y!
                };
              }

              return n;
            });
          });
        }
      });

    },
    [nodes, setNodes]
  );

  const addNode = useCallback(
    (type = 'ResizableNodeSelected') => {
      lastNodePosition.current.x += 50;
      lastNodePosition.current.y += 50;
      setNodes((els: any) => {
        let newNode = {
          type,
          id: Math.floor(Math.random() * 100).toString(),
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          position: {
            x: lastNodePosition.current.x,
            y: lastNodePosition.current.y
          },
          data: {
            label: "Node " + lastNodePosition.current.y / 50,

          },
          style: { background: '#fff', border: '1px solid black', borderRadius: 15, fontSize: 12 },
        };

        return [...els, newNode];
      });
    },
    [setNodes]
  );
  const handleCreateNode = async () => {
    try {
      const response = await fetch('/api/nodes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nodes),
      });

      if (response.ok) {
        console.log('Node created successfully');
      } else {
        console.error('Failed to create node');
      }
    } catch (error) {
      console.error('Error creating node:', error);
    }
  };
  const handleDelete = useCallback(
    (event: React.MouseEvent<Element>, node: Node) => {
      lastNodePosition.current.x += 50;
      lastNodePosition.current.y += 50;
      setNodes(nodes.filter((n) => {
        n.id !== node.id
      }));
    },
    [setNodes]
  )
  return (

    <>
      <Navbar name='' handleClick={handleCreateNode} />
      <button onClick={() => addNode()}>Add Node</button>
      <button onClick={() => addNode()}>Add Group</button>
      <Flow addNode={addNode}
        reactFlowWrapper={reactFlowWrapper}
        nodes={nodes} edges={edges}
        handleDragEnd={handleDragEnd}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        rfStyle={rfStyle}
        handleDelete={handleDelete}
      />
    </>
  )
}
