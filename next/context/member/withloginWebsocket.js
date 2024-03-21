import { useAuth } from '@/hooks/use-Auth';
import { WebSocketProvider } from '@/context/member/websocketLong';

const WithWebSocketProvider = ({ children }) => {
  const { memberId } = useAuth();
  return <WebSocketProvider memberId={memberId}>{children}</WebSocketProvider>;
};

export default WithWebSocketProvider;
