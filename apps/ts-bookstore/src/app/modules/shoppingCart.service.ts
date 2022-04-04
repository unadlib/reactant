import { injectable, action, state } from 'reactant';
// import { Storage } from 'reactant-storage';

interface IListItem {
  id: string;
  count: number;
}

type IList = IListItem[];

@injectable({
  name: 'shoppingCart',
})
class ShoppingCart {
  // constructor(public storage: Storage) {
  //   this.storage.setStorage(this, {
  //     whitelist: ['list'],
  //   });
  // }

  @state
  list: IList = [];

  @action
  addBook(item: IListItem) {
    const book = this.list.find(({ id }) => id === item.id);
    if (!book) {
      this.list.push(item);
      console.log('!!!book.count', this.list);
    } else {
      book.count += item.count;
      console.log('!!!book.count', book.count, this.list);
    }
  }
}

export { ShoppingCart };
