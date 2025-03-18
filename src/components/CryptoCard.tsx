import styled from 'styled-components';
import { CryptoRate, CryptoInfo } from '../types';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s;
  min-width: 200px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const Symbol = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const LastUpdated = styled.div`
  font-size: 0.8rem;
  color: #95a5a6;
  margin-top: 5px;
`;

interface CryptoCardProps {
  info: CryptoInfo;
  rate?: CryptoRate;
  isLoading: boolean;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ info, rate, isLoading }) => {
  const formatPrice = (value: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(value));
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card>
      <Logo src={info.logoUrl} alt={`${info.name} logo`} />
      <Name>{info.name}</Name>
      <Symbol>{info.symbol}</Symbol>
      {isLoading ? (
        <Price>Loading...</Price>
      ) : rate ? (
        <>
          <Price>{formatPrice(rate.value)}</Price>
          <LastUpdated>Updated: {formatTimestamp(rate.timestamp)}</LastUpdated>
        </>
      ) : (
        <Price>No data</Price>
      )}
    </Card>
  );
}; 