import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Postscard from './components/layout/Postscard';
import PostItems from './components/post/PostItems';
import Addingredient from './components/post/Addingredient';
import Addrecipe from './components/post/Addrecipe';
import './scss/App.scss';



class App extends Component {

  state = {
    items: [],
    currentEditItem: null,
    showIngredientModal: false,
    showRecipeModal: false,
    itemToAddIngredientTo: null,
    itemToAddRecipeTo: null,
    itemAddedTo: null
  }

  
  storeItems = () => {
    const items = [...this.state.items];
    localStorage.setItem('items', JSON.stringify(items));
  }

  postItem = itemToPost => {
    const items = [...this.state.items];
    items.push(itemToPost);
    this.setState({items}, () => {
      this.storeItems();
    });
  }

  deleteItem = itemToDelete => {
    const items = [...this.state.items];
    const allItemsWithoutDeletedItem = items.filter(item => item !== itemToDelete);
    this.setState({items: allItemsWithoutDeletedItem}, () => {
      this.storeItems();
    });
  }

  // Get current item popup to edit
  editItem = itemToEdit => this.setState({currentEditItem: itemToEdit}); 

  // Update new item
  updateItem = updatedItem => {
    const items = [...this.state.items];
    this.setState({
      items: items.map(item => {
        if (item === this.state.currentEditItem) {
          return updatedItem;
        }
        return item;
      }),
      currentEditItem: null
    }, () => {
      this.storeItems();
    });
  }

  openIngredientModal = item => {
    this.setState({showIngredientModal: true, itemToAddIngredientTo: item})
  }

  openRecipeModal = item => {
    this.setState({showRecipeModal: true, itemToAddRecipeTo: item})
  }

  closeIngredientModal = () => {
    this.setState({showIngredientModal: false})
  }

  closeRecipeModal = () => {
    this.setState({showRecipeModal: false})
  }

  postIngredient = ingredientToPost => {
    const items = [...this.state.items];
    this.setState({
      items: items.map(item => {
        if (item === this.state.itemToAddIngredientTo) {
          item.ingredients.push(ingredientToPost);
        }
        return item;
      }),
      itemAddedTo: this.state.itemToAddIngredientTo
    }, () => {
      this.storeItems();
    });
  }

  removeIngredient = (itemToRemoveFrom, indexToRemove) => {
    const items = [...this.state.items].map(item => {
      if (item === itemToRemoveFrom) {
        item.ingredients.splice(indexToRemove, 1);
      }
      return item;
    });
    this.setState({items}, () => {
      this.storeItems();
    });
  }

  postRecipe = recipeToPost => {
    const items = [...this.state.items];
    this.setState({
      items: items.map(item => {
        if (item === this.state.itemToAddRecipeTo) {
          item.recipe = recipeToPost;
        }
        return item;
      })
    });
    this.setState({showRecipeModal: false, itemAddedTo: this.state.itemToAddRecipeTo}, () => {
      this.storeItems();
    })
  }

  clearRecipe = () => {
    const items = [...this.state.items];
    this.setState({
      items: items.map(item => {
        if (item === this.state.itemToAddRecipeTo) {
          item.recipe = '';
        }
        return item;
      })
    })
    this.setState({showRecipeModal: false}, () => {
      this.storeItems();
    })
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem("items"));
    this.setState({items})
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Postscard postItem={this.postItem} updateItem={this.updateItem} currentEditItem={this.state.currentEditItem} />
        <PostItems items={this.state.items} itemAddedTo={this.state.itemAddedTo} removeIngredient={this.removeIngredient} deleteItem={this.deleteItem} editItem={this.editItem} openIngredientModal={this.openIngredientModal} openRecipeModal={this.openRecipeModal} />
        {this.state.showIngredientModal ? <Addingredient closeIngredientModal={this.closeIngredientModal} postIngredient={this.postIngredient} item={this.state.itemToAddIngredientTo} /> : null}
        {this.state.showRecipeModal ? <Addrecipe closeRecipeModal={this.closeRecipeModal} postRecipe={this.postRecipe} item={this.state.itemToAddRecipeTo} clearRecipe={this.clearRecipe} /> : null}
      </div>
    );
  }
}

export default App;
;