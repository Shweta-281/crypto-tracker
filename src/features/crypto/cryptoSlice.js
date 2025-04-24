import { createSlice } from '@reduxjs/toolkit';

const createVolatileHistory = (basePrice) => {
  return Array.from({ length: 7 }, (_, i) => 
    basePrice * (1 + (Math.random() * 0.08 - 0.04))
  );
};

const initialState = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 93759.48,
    change1h: -0.43,
    change24h: -0.93,
    change7d: -11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: '19.85M BTC',
    history: createVolatileHistory(93759.48),
    isFavorite: false
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 1802.46,
    change1h: 0.6,
    change24h: 3.21,
    change7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: '120.71M',
    history: createVolatileHistory(93759.48),
    isFavorite: false
  },
  {
    id: 3,
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change1h: 0.00,
    change24h: 0.00,
    change7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: '145.27B',
    history: createVolatileHistory(93759.48),
    isFavorite: false
  },{
    id: 4,
    name: 'XRP',
    symbol: 'XRP',
    price: 2.22,
    change1h: 0.46,
    change24h: 0.54,
    change7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: '58.39B',
    history: createVolatileHistory(93759.48),
    isFavorite: false
  },{
    id: 5,
    name: 'BNB',
    symbol: 'BNB',
    price: 606.65,
    change1h: 0.09,
    change24h: 1.20,
    change7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: '140.89M',
    history: createVolatileHistory(93759.48),
    isFavorite: false
  },{
    id: 6,
    logo: 'sol.png',
    name: 'Solana',
    symbol: 'SOL',
    price: 151.51,
    change1h: 0.53,
    change24h: 1.26,
    change7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: '513.31M',
    history: createVolatileHistory(93759.48),
    isFavorite: false
  },
];

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state) => {
      return state.map(coin => {
        const fluctuation = (Math.random() * 0.05 - 0.025);
        const newPrice = coin.price * (1 + fluctuation);
        const newChange7d = ((newPrice - coin.history[0]) / coin.history[0]) * 100;
      return {
        ...coin,
        price: Number(newPrice.toFixed(2)),
        history: [...coin.history.slice(1), Number(newPrice.toFixed(2))],
        change7d: +newChange7d.toFixed(2),
        change1h: +(coin.change1h + (Math.random() * 0.4 - 0.2)).toFixed(2),
        change24h: +(coin.change24h + (Math.random() * 0.4 - 0.2)).toFixed(2),
        volume24h: coin.volume24h * (1 + (Math.random() * 0.1 - 0.05)),
        marketCap: coin.marketCap * (1 + (Math.random() * 0.01 - 0.005))
    };
  });
    },
    toggleFavorite: (state, action) => {
      const coin = state.find(c => c.id === action.payload);
      if (coin) coin.isFavorite = !coin.isFavorite;
    }
  }
});

export const { updatePrices, toggleFavorite} = cryptoSlice.actions;
export default cryptoSlice.reducer;