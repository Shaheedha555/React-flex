
// interface Props {
//     name: string,

import ReactFlow, { Background, ReactFlowProvider } from "reactflow"


// }

export default function Flow(props: any) {
    const { addNode, reactFlowWrapper, nodes, edges, handleDragEnd, onNodesChange, onEdgesChange, nodeTypes, rfStyle } = props
    return (
        <div style={{ height: '100vh' }} >
            <ReactFlowProvider >
                <div onDoubleClick={() => addNode()}
                    style={{ height: '100%', paddingBottom: '15px' }} >
                    <div style={{ height: "100%" }} ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodeDragStop={handleDragEnd}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            zoomOnDoubleClick={false}
                            nodeTypes={nodeTypes}
                            fitView
                            style={rfStyle}
                            attributionPosition="top-right"
                        >
                            <Background />
                        </ReactFlow>
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
    )
}