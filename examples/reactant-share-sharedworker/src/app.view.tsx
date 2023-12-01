/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FunctionComponent } from 'react';
import { Switch, Route } from 'reactant-web';
import {
  ViewModule,
  injectable,
  useConnector,
  Router,
  PortDetector,
  ClientTransport,
  ServerTransport,
  Transport,
  watch,
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

type ClientToServer = {
  test(n: number): Promise<string>;
};

@injectable({
  name: 'appView',
})
export class AppView extends ViewModule {
  type = '';

  push?: (path: string) => void;

  setType?: React.Dispatch<React.SetStateAction<string>>;

  constructor(
    private todoListView: TodoListView,
    private counterView: CounterView,
    private portDetector: PortDetector,
    private router: Router
  ) {
    super();

    this.portDetector.onServer(
      (
        transport: ClientTransport<{
          listen: ClientToServer;
        }>
      ) => {
        transport.listen(
          'test',
          async (n) => `response '${n}' from server port`
        );
      }
    );
    watch(
      this,
      () => this.router.currentPath,
      () => console.log('current', this.router.currentPath)
    );
    this.portDetector.onClient(
      (
        transport: ClientTransport<{
          emit: ClientToServer;
        }>
      ) => {
        this.type = 'Client';
        transport.emit('test', 42).then((response) => {
          console.log(response);
        });
      }
    );
  }

  component() {
    const [type, setType] = useState(this.type);
    const currentPath = useConnector(() => this.router?.currentPath);
    this.setType = setType;
    return (
      <>
        <ul>
          <li>
            <Link
              active={currentPath === '/'}
              onClick={() => this.router.push('/')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              active={currentPath === this.counterView.path}
              onClick={() => this.router.push(this.counterView.path)}
            >
              {this.counterView.name}
            </Link>
          </li>
          <li>
            <Link
              active={currentPath === this.todoListView.path}
              onClick={() => this.router.push(this.todoListView.path)}
            >
              {this.todoListView.name}
            </Link>
          </li>
          <li>
            <Link
              active={currentPath === '/iframe'}
              onClick={() => this.router.push('/iframe')}
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
