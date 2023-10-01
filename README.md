# ReactFlow Automation Flow with Custom Node and Edge

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

Custom Components
This project showcases the usage of custom nodes and edges. The following custom components are defined and used:

Custom, Custom2, Custom3, and Custom4: These are custom node components that define the appearance and behavior of different types of nodes.

ButtonEdge: This is a custom edge component that represents a button-style edge connection between nodes.

Features
Custom Nodes: The project utilizes custom node components to create nodes with distinct styles and behaviors.

Custom Edges: Custom edges are implemented to establish connections between nodes with unique visual characteristics.

Marker Types: The example demonstrates the use of different marker types, like ArrowClosed, to visualize edge endings.

Node and Edge Management: The application provides functionality to add, move, and delete nodes and edges.

Zoom and Pan: Users can zoom in and out of the canvas and pan to view different areas of the diagram.

The main component of the application is the Flow component, defined in the Flow.js file. It uses the ReactFlow library to render the flow diagram with custom nodes and edges.

nodeTypes: A dictionary of custom node components used in the flow diagram.

edgeTypes: A dictionary of custom edge components used in the flow diagram.

initialNodes: An array containing the initial set of nodes for the flow diagram.

initialEdges: An array containing the initial set of edges for the flow diagram.

The Flow component handles node and edge changes using the useState hook. It also provides functions like onNodesChange and onEdgesChange to update the state when changes occur.
