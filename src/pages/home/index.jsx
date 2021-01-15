import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { getScrollTop, getLink } from '../../../utils';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import homeConfig from '../../../site_config/home';
import './index.scss';

import Particles from '../../../utils/particles.min.js';

class Home extends Language {

  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
      current: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',
        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });

    Particles.init({
      selector: '.particles_bg',
      maxParticles: 80,
      connectParticles: true,
      sizeVariations: 1,
      color: '#dadada',
      responsive: [
        {
          breakpoint: 768,
          options: {
            maxParticles: 200,
            color: '#48F2E3',
            connectParticles: false
          }
        }, {
          breakpoint: 425,
          options: {
            maxParticles: 100,
            connectParticles: true
          }
        }, {
          breakpoint: 320,
          options: {
            maxParticles: 0
          }
        }
      ]

    });
  }

  itemClick= (index) => {
    this.setState({ current: index });
  }

  render() {
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType, current } = this.state;
    const currentPlugin = dataSource.plugins[current];
    const allPlugins = dataSource.plugins.map((item) => {
      const { name, brand } = item;
      return { name, brand };
    });
    const headerLogo = headerType === 'primary' ? '/website/img/dromara.png' : '/website/img/dromara.png';
    const imagePath = ['/website/img/soul.png', '/website/img/hmily.png', '/website/img/raincat.png', '/website/img/myth.png'];
    return (
      <div className="home-page">
        <div className="particles-wrap">
          <canvas height="720" className="particles_bg" />
        </div>
        <section className="top-section">
          <Header
            currentKey="dromara"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />
          <div className="home-carousel">
            <div className="home-carousel-wrap">
              {allPlugins && allPlugins.map((item, index) => {
                const { brand } = item;
                return (
                  <div onClick={() => { this.itemClick(index); }} key={index} className={classnames({ 'vertical-middle': true, 'vertical-selected': index === current })}>
                    <div className="product-name">
                      <img src={imagePath[index]} alt="" />
                    </div>
                    <p className="product-desc">
                      {brand.briefIntroduction}
                    </p>
                    <div className="button-area">
                      {brand.buttons.map((b, bIndex) => (
                        <Button
                          type={b.type}
                          key={bIndex}
                          link={b.link}
                          target={b.target}
                        >
                          {b.text}
                        </Button>
                      ))}
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="animation animation1" />
          <div className="animation animation2" />
          <div className="animation animation3" />
          <div className="animation animation4" />
          <div className="animation animation5" />
        </section>
        <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{currentPlugin.introduction.title}</h3>
              <p>{currentPlugin.introduction.desc}</p>
            </div>
            <img src={getLink(currentPlugin.introduction.img)} />
          </div>
        </section>
        <section className="feature-section">
          <h3>{currentPlugin.features.title}</h3>
          <ul>
          {
            currentPlugin.features.list.map((feature, i) => (
              <Item feature={feature} key={i} />
            ))
          }
          </ul>
        </section>
        <section className="users-section">
          <h3>{currentPlugin.users.title}</h3>
          <p>{currentPlugin.users.desc}</p>
          <div className="users">
          {
            currentPlugin.users.list.map((user, i) => (
              <img src={getLink(user)} key={i} />
            ))
          }
          </div>
        </section>
        <Footer logo="/website/img/dromara.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
