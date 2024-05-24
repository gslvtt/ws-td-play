import useWebSocket from "./useWebSocket";

const { ws }: { ws : WebSocket } = useWebSocket();

export type DataWS = {
  actionName : string;
  value: number | [number, number] | string;
}

function stringifyData (data: DataWS): string {
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  return jsonData;
}

function handleSend (data : DataWS) : void {
  ws.send(stringifyData(data));
  // wsSendJson(data); 
}

export default function useSocketTools () {

  return {handleSend}
}