import { memo } from 'react';
import { Handle, Position, NodeResizer, ControlButton } from 'reactflow';

interface PropsType {
    data: { label: string },
    selected: boolean
}
const ResizableNodeSelected = ({ data, selected }: PropsType) => {
    return (
        <>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />

            <Handle type="target" position={Position.Left} />

            <div style={{ padding: 5 }}>

                {data.label}</div>

            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(ResizableNodeSelected);
