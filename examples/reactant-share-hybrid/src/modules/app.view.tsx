/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FunctionComponent } from 'react';
import { Switch, Route } from 'reactant-web';
import {
  spawn,
  ViewModule,
  injectable,
  PortDetector,
  useConnector,
  Router,
} from 'reactant-share';
import { TodoListView } from './todoList.view';
import { CounterView } from './counter.view';

const Link: FunctionComponent<{ active: boolean; onClick: () => any }> = ({
  active,
  children,
  onClick,
}) => {
  return (
    <div onClick={onClick} style={{ color: active ? 'red' : 'black' }}>
      {children}
    </div>
  );
};

@injectable({
  name: 'appView',
})
export class AppView extends ViewModule {
  type = '';

  setType?: React.Dispatch<React.SetStateAction<string>>;

  constructor(
    private todoListView: TodoListView,
    private counterView: CounterView,
    private portDetector: PortDetector,
    private router: Router
  ) {
    super();
    this.portDetector.onServer(() => {
      this.type = 'Server';
      this.setType?.('Server');
    });
    this.portDetector.onClient(() => {
      this.type = 'Client';
    });
  }

  async routerChange(path: string) {
    await spawn(this.router, 'push', [path]);
  }

  component() {
    const [type, setType] = useState(this.type);
    const currentPath = useConnector(() => this.router.currentPath);
    this.setType = setType;
    return (
      <>
        <ul>
          <li>
            <Link
              active={currentPath === '/'}
              onClick={() => this.routerChange('/')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              active={currentPath === this.counterView.path}
              onClick={() => this.routerChange(this.counterView.path)}
            >
              {this.counterView.name}
            </Link>
          </li>
          <li>
            <Link
              active={currentPath === this.todoListView.path}
              onClick={() => this.routerChange(this.todoListView.path)}
            >
              {this.todoListView.name}
            </Link>
          </li>
          <li>
            <Link
              active={currentPath === '/iframe'}
              onClick={() => this.routerChange('/iframe')}
            >
              iFrame mode
            </Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <h2 style={{ color: type === 'Server' ? 'red' : 'green' }}>
              {`This app is a ${type}`}
            </h2>
          </Route>
          <Route
            path={this.counterView.path}
            component={this.counterView.component}
          />
          <Route
            path={this.todoListView.path}
            component={this.todoListView.component}
          />
          <Route path="/iframe">
            <iframe title="iFrame mode" src="./iframe.html" />
          </Route>
        </Switch>
      </>
    );
  }
}

console.log('===')
