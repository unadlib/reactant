/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  ClientTransport as IClientTransport,
  ServerTransport as IServerTransport,
  Transport,
} from 'reactant-share';
import { TodoListView } from './todoList.view';
import { CounterView } from './counter.view';
import style from './style.css';

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

type ClientTransport = IClientTransport & {
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
        transport: Transport<{
          emit: IServerTransport;
          listen: ClientTransport;
        }>
      ) => {
        transport.listen(
          'test',
          async (n) => `response '${n}' from server port`
        );
      }
    );
    this.portDetector.onClient(
      (
        transport: Transport<{
          emit: ClientTransport;
          listen: IServerTransport;
        }>
      ) => {
        this.type = 'Client';
        transport.emit('test', 42).then((response) => {
          console.log(response);
        });
      }
    );
  }

  load() {
    import(/* webpackChunkName: "lazyModule" */ './lazyModule').then(
      ({ fn }) => {
        fn();
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
            <h2
              style={{ color: type === 'Server' ? 'red' : 'green' }}
              className={style.use().locals.button}
            >
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
