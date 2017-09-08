import React from 'react';

import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';

import './index.scss';
import homeBg from './assets/Oxm5epd.jpg';

class Home extends React.PureComponent {
  render() {
    return (
      <Section className="home">
        <Hero
          background={<Image
            src={homeBg}
            fit="cover"
            full
          />}
          backgroundColorIndex="dark"
          size="large"
        >
          <Header
            size="medium"
            className="header-main"
          >
            <Headline
              strong
              size="large"
            >
              FEEL THE FORCE
            </Headline>
          </Header>
        </Hero>
      </Section>
    );
  }
}

export default Home;
