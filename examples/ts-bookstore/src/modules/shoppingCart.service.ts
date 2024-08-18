import { injectable, action, state, computed, watch } from 'reactant';
import { Storage } from 'reactant-storage';

interface IListItem {
  id: string;
  count: number;
}

type IList = IListItem[];

@injectable({
  name: 'shoppingCart',
})
class ShoppingCart {
  constructor(public storage: Storage) {
    this.storage.setStorage(this, {
      whitelist: ['list'],
    });

    watch(
      this,
      () => this.bookCount,
      () => {
        console.log('bookCount:', this.bookCount);
      }
    );
  }

  @state
  list: IList = [];

  @action
  addBook(item: IListItem) {
    const book = this.list.find(({ id }) => id === item.id);
    if (!book) {
      this.list.push(item);
    } else {
      book.count += item.count;
    }
  }

  @computed
  get bookCount() {
    return this.list.reduce((acc, item) => acc + item.count, 0);
  }
}

export { ShoppingCart };
