# Automation Flow with Custom Node and Edge using ReactFlow 

This is an example project that demonstrates how to create an Automation flow diagram using ReactFlow library with custom nodes and edges, redux was used for managing the states of our nodes.

Feel free to explore, modify, and use this example project as a foundation for your own ReactFlow-based applications with custom nodes and edges. If you have any questions or suggestions, please open an issue in the repository or feel free to email me at:

### azizoukamo@gmail.com

https://github.com/aazizmegna/Automation-flow-diagram-using-ReactFlow/assets/77016461/9525d4a6-de92-463b-92f3-ac635402225c


### Installation

## 1- Clone the repository:

git clone https://github.com/your-username/reactflow-custom-nodes.git
Navigate to the project directory:

cd reactflow-custom-nodes

## 2- Install the dependencies using npm or yarn:

### `npm install`

or

### `yarn install`

## 3- Usage

To run the application, execute the following command in the project directory:

### `npm start`

This will start the development server and open the application in your default web browser.

## 4- Features:

Custom Nodes: We created custom node components to with diverse styles and behaviors.
Custom Edges: Establish connections between nodes.
Marker Types: Explore various marker types, such as ArrowClosed, for visualizing edge endings.
Node and Edge Management: The application allows users to seamlessly add, move, and delete nodes and edges.
Zoom and Pan: Effortlessly zoom in and out of the canvas and pan to navigate different sections of the diagram.

## 5- Flow Component:

The heart of this application is the Flow component, defined in the Flow.js file. Leveraging the ReactFlow library, it renders the flow diagram with custom nodes and edges. Key elements include:

nodeTypes: A dictionary of custom node components used in the flow diagram.
edgeTypes: A dictionary of custom edge components used in the flow diagram.
initialNodes: An array containing the initial set of nodes for the flow diagram.
initialEdges: An array containing the initial set of edges for the flow diagram.
The Flow component efficiently manages node and edge changes via the useState hook, offering functions like onNodesChange and onEdgesChange to update the application's state when modifications occur.




