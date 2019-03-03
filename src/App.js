import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          id: '1',
          content: 'item 1',
          child: [
            {
              id: '1',
              content: 'child 1',
              child: [
                {
                  id: '1',
                  content: 'child 1',
                  child: []
                },
                {
                  id: '2',
                  content: 'child 2',
                  child: []
                },
                {
                  id: '3',
                  content: 'child 3',
                  child: []
                }
              ]
            },
            {
              id: '2',
              content: 'child 2',
              child: []
            },
            {
              id: '3',
              content: 'child 3',
              child: []
            }
          ]
        },
        {
          id: '2',
          content: 'item 2',
          child: []
        },
        {
          id: '3',
          content: 'item 3',
          child: []
        },
        {
          id: '4',
          content: 'item 4',
          child: [
            {
              id: '3',
              content: 'child 3',
              child: []
            }
          ]
        }
      ]
    }
  }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = index => {
    this.draggedOverItem = index
    // const draggedOverItem = this.state.items[index];

    // if (this.draggedItem === draggedOverItem) {
    //   return;
    // }

    // let items = this.state.items
    // let coba = items.filter(item => item !== this.draggedItem)
    // if(coba[index].child.indexOf(this.draggedItem) == -1)
    //   coba[index].child.push(this.draggedItem)

    // this.setState({ items: coba }, () => {
    //   // console.log(this.state.items)
    // });
  };

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  onDragEnd = (index) => {
    if(this.draggedOverItem === index){
      return
    }
    
    let items = this.state.items
    if(items[this.draggedOverItem].child.indexOf(this.draggedItem) == -1)
      items[this.draggedOverItem].child.push(this.draggedItem)

    let itemFilter = items.filter(item => item !== this.draggedItem)

    this.setState({ items: itemFilter }, () => {
      // console.log(this.state.items)
    });
    this.draggedIdx = null;
  };
  

  renderChild = (itemChild, indexChild) => {
    const treeMap = this.flatten(itemChild.child, 1)

    return treeMap.map((item, index) => {
      let styleObj = {marginLeft: ((item.depth - 1) * 45)};
      return (
          <li key={index} style={ styleObj }>
            <div>
              =
            </div>
            <span className="content" style={{ marginLeft: '10px' }}>{item.content}</span>
          </li>
      )
    })
  }

  flatten(array, depth) {
    return array.reduce((p, c, i, a) => {
      if (c.child) {
          const item = {id: c.id, content: c.content, child: c.child, depth: depth};
          const flatChildren = this.flatten(c.child, depth + 1);
          return p.concat([item]).concat(flatChildren);
      } else {
          const item = {id: c.id, content: c.content, child: c.child, depth: depth};
          return p.concat([item]);
      }
    }, [])
  }

  render() {
    return (
      <div className="App">
        <main style={{ backgroundColor: 'white', color: 'black', padding: '10px', width: '100%' }}>
          <h3>Contoh Tree Data Drag And Drop</h3>
          <ul>
            {this.state.items.map((item, index) => (
              <div key={index}>
                <li className="drag" key={index} onDragOver={() => this.onDragOver(index)} 
                    onDragStart={e => this.onDragStart(e, index)}
                    onDragEnd={() => this.onDragEnd(index)}
                    style={{ margin: '0px 0px 20px 0px' }}
                    draggable>
                  <div>
                    =
                  </div>
                  <span className="content" style={{ marginLeft: '10px' }}>{item.content}</span>
                </li>

                <ul style={{ marginLeft: '45px' }}>
                    {this.renderChild(item, index)}
                </ul>
              </div>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
