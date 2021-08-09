import SimplePeer from 'simple-peer';
import { render } from 'reactant-web';
import { createApp, createTransport } from 'reactant-share';
import { AppView, Counter } from './app';

const peer = new SimplePeer({
  initiator: true,
  trickle: false,
});

peer.on('signal', (data) => {
  document.querySelector('#outgoing')!.textContent = JSON.stringify(data);
});

document.querySelector('form')!.addEventListener('submit', (ev) => {
  ev.preventDefault();
  peer.signal(JSON.parse((document.querySelector('#incoming')! as any).value));
});

peer.on('connect', () => {
  document.getElementById('tmp')!.remove();

  const serverTransport = createTransport('WebRTC', {
    peer,
  });
  createApp({
    modules: [{ provide: 'counter', useClass: Counter }],
    main: { provide: 'appView', useClass: AppView },
    render,
    share: {
      name: 'counter',
      type: 'Base',
      port: 'server',
      transports: {
        server: serverTransport,
      },
    },
  }).then((app) => {
    console.log(app, '====');
    (window as any).app = app;
    app.bootstrap(document.getElementById('app'));
  });
});
