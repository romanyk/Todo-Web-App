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
      this.createtodoItem('Drink Coffee'),
      this.createtodoItem('Make Awesome App'),
      this.createtodoItem('Have a lunch'),
      ],
      term: '',
      filter: 'all'  /* all, active, done */
  };

  createtodoItem (label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };


  deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id );
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
    
    
  const newItem = this.createtodoItem(text);
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

  toggleProperty(arr,id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
  
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    
    return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
        ];
  };

  onToggleDone = (id) => {
     this.setState(({
       todoData
     }) => {

       return {
         todoData: this.toggleProperty(todoData, id, 'done')
       };
     });
     // console.log('Toggle Done', id);
   };

  onToggleImportant = (id) => {
       this.setState(({todoData}) =>{
  
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
    });
     // console.log('Toggle Important', id);
  };

  onSearchChange = (term) => {
      this.setState({term});
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label
            .toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter(items, filter) {

    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done );
      case 'done':
        return items.filter((item) => item.done );
      default:
        return items;
    }
  }
 
   onFilterChange = (filter) => {
      this.setState({filter});
  };

  render() {

    // robimy zmienną dla todoData, żeby wszędzie wpisywać zamiast this.todoData po prostu todoData
    const {todoData, term, filter } = this.state;

    const visibleItems = this.filter(
       this.search(todoData, term), filter );

    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
              onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter}
              onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
        todoData = { visibleItems }
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
