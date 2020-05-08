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

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="project Logo" />
      </div>
    );

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
          Modularization, Dependency Injection, State Management & CLI, etc.
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
      <Block id="try">
        {[
          {
            content:
              'Reactant supports React application development across multiple platforms, e.g. web, Native Mobile, to efficiently complete applications across platforms.',
            image: `${baseUrl}img/undraw_progressive_app.svg`,
            imageAlign: 'left',
            title: 'Develop Web & Native Mobile Platform',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content: 'todo',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'todo',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <CleanArchitecture />
          <DevelopPlatform />
          {/* <Description /> */}
          {/* <Showcase /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
