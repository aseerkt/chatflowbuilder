import { RFState } from '.'

export const baseSelector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setReactFlowInstance: state.setReactFlowInstance,
  onDrop: state.onDrop,
  isSingleConnected: state.isSinglyConnected,
})

export const nodeSelector = (state: RFState) => ({
  nodeId: state.nodeId,
  nodeType: state.nodeType,
})
