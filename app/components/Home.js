// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ip from 'ip';
import styles from './Home.css';

const QRCode = require('qrcode');

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {
    const url = `http://${ip.address()}:8090`;
    console.log(url);
    QRCode.toCanvas(document.getElementById('test'), url, error => {
      if (error) console.error(error);
      console.log('success!');
    });
  }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <canvas id="test" />
        </div>
        <div className={styles.container} data-tid="container">
          <h2>Home1</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
