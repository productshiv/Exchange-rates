import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CryptoCard } from './components/CryptoCard';
import { CRYPTO_LIST, CryptoRate } from './types';

const API_KEY = import.meta.env.VITE_TATUM_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_TATUM_API_KEY is not defined in environment variables');
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const RefreshButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const GlobalStyle = styled.div`
  background: #f5f6fa;
  min-height: 100vh;
  padding: 2rem 0;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
  background: #fdeaea;
  border-radius: 5px;
`;

function App() {
  const [rates, setRates] = useState<Record<string, CryptoRate>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching rates for cryptocurrencies...');
      
      const responses = await Promise.all(
        CRYPTO_LIST.map(async crypto => {
          try {
            console.log(`Fetching rate for ${crypto.id}...`);
            const response = await axios.get(
              `https://api.tatum.io/v3/tatum/rate/${crypto.id}?basePair=USD`,
              {
                headers: {
                  'x-api-key': API_KEY
                }
              }
            );
            console.log(`Response for ${crypto.id}:`, response.data);
            return response;
          } catch (err) {
            console.error(`Error fetching ${crypto.id}:`, err);
            throw err;
          }
        })
      );

      const newRates: Record<string, CryptoRate> = {};
      responses.forEach((response, index) => {
        newRates[CRYPTO_LIST[index].id] = response.data;
      });

      console.log('All rates fetched successfully:', newRates);
      setRates(newRates);
    } catch (error) {
      console.error('Error fetching rates:', error);
      if (axios.isAxiosError(error)) {
        setError(
          `Error: ${error.response?.status === 403 ? 
            'API Key authentication failed. Please check your API key.' : 
            error.response?.data?.message || error.message}`
        );
      } else {
        setError('An unexpected error occurred while fetching rates.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <GlobalStyle>
      <Container>
        <Header>
          <Title>Crypto Exchange Rates</Title>
          <RefreshButton onClick={fetchRates}>
            Refresh Rates
          </RefreshButton>
        </Header>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Grid>
          {CRYPTO_LIST.map(crypto => (
            <CryptoCard
              key={crypto.id}
              info={crypto}
              rate={rates[crypto.id]}
              isLoading={loading}
            />
          ))}
        </Grid>
      </Container>
    </GlobalStyle>
  );
}

export default App;
