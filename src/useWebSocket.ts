import { ref } from "vue";

export default function () {
  const ws = new WebSocket(import.meta.env.VITE_MYWS);

  const dataHandlers : {
    handleData : Function
  } = {
    handleData: (data: any) => {
      console.log("got data", data);
    }
  };

  const handleData = ref(dataHandlers.handleData);

  function setDataHandler (fn : Function) : void {
    dataHandlers.handleData = fn;
  }
  
  ws.addEventListener('open', (event) => {
    console.log('Socket connection open');
    // alert('Successfully connected to socket server 🎉');
    ws.send('pong');
  });
  
  ws.addEventListener('message', (message) => {
    if (message && message.data) {
      if (message.data === "ping") {
        console.log("got ping");
        ws.send("pong");
        return;
      }
      let data = JSON.parse(message.data);
      if (data) {
        // if ("slider1" in data) {
        //   console.log(data.slider1)
        // }
        handleData.value(data);
      }
    }
    console.log("message", message)
  });
  
  ws.addEventListener('error', (error) => {
    console.error('Error in the connection', error);
    alert('error connecting socket server');
  });
  
  ws.addEventListener('close', (event) => {
    console.log('Socket connection closed');
    alert('closing socket server');
  });

  return {
    ws,
    setDataHandler
  }
  
  // function handleClick() {
  //   // ws.send(JSON.stringify({ 'slider1': [Math.round(Math.random() * canvasSize.value[0]), Math.round(Math.random() * canvasSize.value[1])] }));
  //   ws.send(JSON.stringify('merda'));
  
  // }

}
