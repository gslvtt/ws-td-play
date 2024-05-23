import useWebSocket from "./useWebSocket";

const { ws }: { ws : WebSocket } = useWebSocket();

export type DataWS = {
  actionName : string;
  value: number | [number, number]
}

function wsSendJson (data: DataWS): void {
  ws.send(JSON.stringify(data));
}

function handleSend (data : DataWS) : void {
  wsSendJson(data); 
}

export default function useSocketTools () {

  return {handleSend}
}