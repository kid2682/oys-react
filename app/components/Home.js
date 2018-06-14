// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import ip from 'ip'
const QRCode = require('qrcode')
type Props = {};

export default class Home extends Component<Props> {
  componentDidMount () {
    console.log('http://' + ip.address() + ':8090');
    QRCode.toCanvas(document.getElementById('test'), 'http://' + ip.address() + ':8088', function (error) {
      if (error) console.error(error)
      console.log('success!')
    })
  }
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home1</h2>
          <Link to="/counter">to Counter</Link>
          <canvas id="test"></canvas>
        </div>
      </div>
    );
  }
}
