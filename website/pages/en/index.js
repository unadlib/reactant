const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
        <div className="waveContainer">
          <div className="wave" />
        </div>
      </div>
    );

    // const Logo = props => (
    //   <div className="projectLogo">
    //     <img src={props.img_src} alt="project Logo" />
    //   </div>
    // );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/* <Logo img_src={`${baseUrl}img/logo.svg`} /> */}
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
          <PromoSection>
            <Button href={docUrl('introduction.html')}>Get Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: `Lightweight framework, a quick read of the guide makes it easy to get started.`,
            image: `${baseUrl}img/undraw_researching.svg`,
            imageAlign: 'top',
            title: 'Easy',
          },
          {
            content: `Simple APIs and efficient CLI make developing applications so efficient.`,
            image: `${baseUrl}img/undraw_operating_system.svg`,
            imageAlign: 'top',
            title: 'High-Efficiency',
          },
          {
            content: `All of React's ecosystems can be plugged in and modularized to work together.`,
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'Flexible',
          },
        ]}
      </Block>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{ textAlign: 'center' }}
      >
        <h2>Features</h2>
        <MarkdownBlock>
          Modularization, Dependency Injection, State Management, Dynamic Module
          & CLI, etc.
        </MarkdownBlock>
      </div>
    );

    const CleanArchitecture = () => (
      <Block background="light">
        {[
          {
            content: `Reactant is a simple and clear architectural design with only a few new concepts. Reactant provides only a small number of core key APIs that you can use to build any testable, maintainable and complex application.`,
            image: `${baseUrl}img/undraw_dev_productivity.svg`,
            imageAlign: 'right',
            title: 'Clean Architecture',
          },
        ]}
      </Block>
    );

    const DevelopPlatform = () => (
      <Block>
        {[
          {
            content:
              'Reactant supports React application development across multiple platforms, e.g. Web, Native Mobile, to efficiently complete applications across platforms.',
            image: `${baseUrl}img/undraw_progressive_app.svg`,
            imageAlign: 'left',
            title: 'Develop Web & Native Mobile Platform',
          },
        ]}
      </Block>
    );

    const QuicklyGetStarted = () => (
      <div
        className="productShowcaseSection paddingBottom darkBackground"
        style={{ textAlign: 'center', padding: '10px 0' }}
      >
        <h2>Quickstart</h2>
        <MarkdownBlock>
          Quickly get started with service module, view module and bootstrap
          app.
        </MarkdownBlock>
      </div>
    );

    const ServiceModuleCodePen = () => (
      <div className="container lightBackground paddingBottom paddingTop">
        <div className="wrapper">
          <div className="gridBlock">
            <div className="blockElement alignCenter imageAlignSide imageAlignRight twoByGridBlock">
              <div className="blockContent">
                <h2>
                  <div>
                    <span>
                      <p>1. Create Service Module</p>
                    </span>
                  </div>
                </h2>
                <div>
                  <span>
                    <p>
                      The module definition is very simple and you don't need
                      anything other than decorators that dependency injection
                      and state management.
                    </p>
                  </span>
                </div>
              </div>
              <div className="blockImage">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<iframe width='319' height='364' src='https://carbon.now.sh/embed?bg=rgba(171%2C184%2C195%2C0)&t=seti&wt=none&l=application%2Ftypescript&ds=false&dsyoff=0px&dsblur=12px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=%2540injectable()%250Aclass%2520Counter%2520%257B%250A%2520%2520%2540state%250A%2520%2520count%2520%253D%25200%253B%250A%250A%2520%2520%2540action%250A%2520%2520increase()%2520%257B%250A%2520%2520%2520%2520this.count%2520%252B%253D%25201%253B%250A%2520%2520%257D%250A%257D'></iframe>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const ViewModuleCodePen = () => (
      <div className="container paddingBottom paddingTop">
        <div className="wrapper">
          <div className="gridBlock">
            <div className="blockElement alignCenter imageAlignSide imageAlignLeft twoByGridBlock">
              <div className="blockImage1">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<iframe width='631' height='491' src='https://carbon.now.sh/embed?bg=rgba(171%2C184%2C195%2C0)&t=seti&wt=none&l=application%2Ftypescript&ds=false&dsyoff=0px&dsblur=12px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=%2540injectable()%250Aclass%2520AppView%2520extends%2520ViewModule%2520%257B%250A%2520%2520constructor(public%2520counter%253A%2520Counter)%2520%257B%250A%2520%2520%2520%2520super()%253B%250A%2520%2520%257D%250A%250A%2520%2520component()%2520%257B%250A%2520%2520%2520%2520const%2520count%2520%253D%2520useConnector(()%2520%253D%253E%2520this.counter.count)%253B%250A%2520%2520%2520%2520return%2520(%250A%2520%2520%2520%2520%2520%2520%253Cbutton%250A%2520%2520%2520%2520%2520%2520%2509type%253D%2522button%2522%250A%2520%2520%2520%2520%2520%2520%2509onClick%253D%257B()%2520%253D%253E%2520this.counter.increase()%257D%253E%250A%2520%2520%2520%2520%2520%2520%2520%2520%257Bcount%257D%250A%2520%2520%2520%2520%2520%2520%253C%252Fbutton%253E%250A%2520%2520%2520%2520)%253B%250A%2520%2520%257D%250A%257D'></iframe>",
                  }}
                />
              </div>
              <div className="blockContent">
                <h2>
                  <div>
                    <span>
                      <p>2. Create View Module</p>
                    </span>
                  </div>
                </h2>
                <div>
                  <span>
                    <p>
                      You just need to extend the "ViewModule", and define the
                      methods and data to be injected into the view function
                      component.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const AppBootstrapCodePen = () => (
      <div className="container lightBackground paddingBottom paddingTop">
        <div className="wrapper">
          <div className="gridBlock">
            <div className="blockElement alignCenter imageAlignSide imageAlignRight twoByGridBlock">
              <div className="blockContent">
                <h2>
                  <div>
                    <span>
                      <p>3. Bootstrap app</p>
                    </span>
                  </div>
                </h2>
                <div>
                  <span>
                    <p>
                      Use "createApp" to pass in the view module and render
                      function, you're ready to bootstrap the app.
                    </p>
                  </span>
                </div>
              </div>
              <div className="blockImage">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<iframe width='538' height='310' src='https://carbon.now.sh/embed?bg=rgba(171%2C184%2C195%2C0)&t=seti&wt=none&l=application%2Ftypescript&ds=false&dsyoff=0px&dsblur=12px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=const%2520app%2520%253D%2520createApp(%257B%250A%2520%2520main%253A%2520AppView%252C%250A%2520%2520modules%253A%2520%255B%255D%252C%250A%2520%2520render%252C%250A%257D)%253B%250A%250Aapp.bootstrap(document.getElementById(%27app%27))%253B'></iframe>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // const Showcase = () => {
    //   if ((siteConfig.users || []).length === 0) {
    //     return null;
    //   }

    //   const showcase = siteConfig.users
    //     .filter(user => user.pinned)
    //     .map(user => (
    //       <a href={user.infoLink} key={user.infoLink}>
    //         <img src={user.image} alt={user.caption} title={user.caption} />
    //       </a>
    //     ));

    //   const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

    //   return (
    //     <div className="productShowcaseSection paddingBottom">
    //       <h2>Who is Using This?</h2>
    //       <p>This project is used by all these people</p>
    //       <div className="logos">{showcase}</div>
    //       <div className="more-users">
    //         <a className="button" href={pageUrl('users.html')}>
    //           More {siteConfig.title} Users
    //         </a>
    //       </div>
    //     </div>
    //   );
    // };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <CleanArchitecture />
          <DevelopPlatform />
          <QuicklyGetStarted />
          <ServiceModuleCodePen />
          <ViewModuleCodePen />
          <AppBootstrapCodePen />
          {/* <Showcase /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
