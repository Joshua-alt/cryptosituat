import React from 'react';
import millify from 'millify';
import transakSDK from '@transak/transak-sdk';
import { Collapse, Row, Col, Typography, Button , Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
/* eslint-disable no-alert, no-console */
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
 
   const excha = () => {
    let transak = new transakSDK({
    apiKey: '4fcd6904-706b-4aff-bd9d-77422813bbb7',  // Your API Key
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'ETH',
    walletAddress: '', // Your customer's wallet address
    themeColor: '000000', // App theme color
    fiatCurrency: '', // INR/GBP
    email: '', // Your customer's email address
    redirectURL: '',
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: '450px'
});

transak.init();

// To get all the events
transak.on(transak.ALL_EVENTS, (data) => {
		console.log(data)
});

// This will trigger when the user marks payment is made.
transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
});

}

  if (isFetching) return <Loader />;
  /* eslint-enable no-alert */

  return (
    <>
      <Row>
        <Col span={6}>
        <Button  onClick={()=>excha()} type="dashed" >
          By crypto
        </Button>
        <br/> <br/> <br/>
        </Col>
      </Row>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
             header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
