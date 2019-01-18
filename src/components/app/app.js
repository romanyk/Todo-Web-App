import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from  '../item-add-form';


import './app.css';

class App extends Component { 

  maxId = 100;


  state = {
    todoData: [
       { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Make Awesome App', important: true, id: 2 },
        { label: 'Have a lunch', important: false, id: 3 },
      ]
  };


  deleteItem = (index) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((line) => line.id === index );
        // todoData.splice(idx, 1); nie możemy zmieniać istniejący state, a splice właśnie to robi

        // const before = todoData.slice(0, idx);
        // const after = todoData.slice(idx + 1);

        // const newArray = [...before, ...after];

// sposób skrócony
        const newArray = [
           ...todoData.slice(0, idx),
           ...todoData.slice(idx + 1)
          ];

        return {
          todoData: newArray
        };
      });
  };

  addItem = (text) => {
    // generate id
    
    
  const newItem = {
    label: text,
    important: false,
    id: this.maxId++
  };
    // add element in array
  this.setState(({todoData}) => {
    const newArr = [
      ...todoData,
      newItem
    ];
      return {
        todoData: newArr
      };
  });
    // console.log('Added', text);
  };

  onToggleImportant = (id) => {
      console.log('Toggle Important', id);

  }

  onToggleDone = (id) => {
console.log('Toggle Done', id);
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
        todoData = {
          this.state.todoData
        }
        onDeleted = {this.deleteItem}
        onToggleImportant = {this.onToggleImportant}
        onToggleDone = {this.onToggleDone}
        />
        <ItemAddForm onItemAdded = {this.addItem} />
        </div>
      );
    };
   }



export default App;
