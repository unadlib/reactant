/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, FunctionComponent } from 'react';
import { Switch, Route } from 'reactant-web';
import {
  proxify,
  ViewModule,
  injectable,
  useConnector,
  Router,
  PortDetector,
  ClientTransport as IClientTransport,
  ServerTransport as IServerTransport,
  Transport,
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

interface ClientTransport extends IClientTransport {
  test(n: number): Promise<string>;
}

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
    { onServer, onClient }: PortDetector,
    private router: Router
  ) {
    super();

    onServer((transport: Transport<IServerTransport, ClientTransport>) => {
      transport.listen('test', async (n) => `response '${n}' from server port`);
    });
    onClient((transport: Transport<ClientTransport, IServerTransport>) => {
      this.type = 'Client';
      transport.emit('test', 42).then((response) => {
        console.log(response);
      });
    });
  }

  @proxify
  async routerChange(path: string) {
    this.router.push(path);
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
            <iframe
              title="iFrame mode"
              src="http://localhost:7000/iframe.html"
            />
          </Route>
        </Switch>
      </>
    );
  }
}
