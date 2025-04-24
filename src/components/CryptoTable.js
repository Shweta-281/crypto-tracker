import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrices,toggleFavorite } from '../features/crypto/cryptoSlice';
import SparklineChart from './SparklineChart';

const CryptoTable = () => {
  const coins = useSelector(state => state.crypto);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 1500);
    return () => clearInterval(interval);
  }, [dispatch]);

  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

  const formatBillions = (value) => 
    `$${(value / 1e9).toLocaleString(undefined, { maximumFractionDigits: 2 })}B`;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th> 
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h%</th>
            <th>24h%</th>
            <th>7d%</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className="star-cell" onClick={() => dispatch(toggleFavorite(coin.id))} style={{ cursor: 'pointer' }}>
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={coin.isFavorite ? '#ffd700' : 'none'} 
    stroke={coin.isFavorite ? '#ffd700' : '#666'} 
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
</td>
              <td>{coin.id}</td>
              <td className="coin-name">
                <img 
                  src={`/${coin.symbol.toLowerCase()}.png`} 
                  alt={coin.symbol} 
                  className="coin-logo"
                />
                <span>{coin.name} {coin.symbol}</span>
              </td>
              <td>{formatCurrency(coin.price)}</td>
              <td style={{ color: coin.change1h >= 0 ? '#16c784' : '#ea3943' }}>
                {coin.change1h}%
              </td>
              <td style={{ color: coin.change24h >= 0 ? '#16c784' : '#ea3943' }}>
                {coin.change24h}%
              </td>
              <td style={{ color: coin.change7d >= 0 ? '#16c784' : '#ea3943' }}>
                {coin.change7d}%
              </td>
              <td>{formatBillions(coin.marketCap)}</td>
              <td>{formatBillions(coin.volume24h)}</td>
              <td>{coin.circulatingSupply}</td>
              <td>
  <div style={{ width: 120, height: 60 }}>
    <SparklineChart data={coin.history.map((price, index) => ({
      price,
      name: `Day ${index + 1}`
    }))} 
    positive={coin.change7d >= 0}/>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;