const jwtToken = 'YOUR_JWT_TOKEN_HERE';
const channelId = 'YOUR_CHANNEL_ID_HERE';

let lastFollower = {
   name: null,
};

function animation() {
   const mainContainer = document.querySelector('.main-container');
   mainContainer.style.animation = 'none';
   mainContainer.offsetHeight;
   mainContainer.style.animation = null;

   mainContainer.style.animation = 'anim 10s 1';
   mainContainer.style.visibility = 'visible';

   setTimeout(() => {
      mainContainer.style.visibility = 'hidden';
   }, 10050);
}

function updateFollowerUI() {
   const followerParagraph = document.querySelector('.follower');

   if (followerParagraph && lastFollower.name) {
      followerParagraph.textContent = lastFollower.name;
   }
   animation();
}

document.addEventListener('DOMContentLoaded', () => {
   updateFollowerUI();
});

function createWebSocket() {
   const websocket = new WebSocket('wss://astro.streamelements.com');

   websocket.addEventListener('open', () => {
      const subscribeMessage = {
         type: 'subscribe',
         nonce: '86cscb2b3-eb8d-4b3c-902d-509c3f5ca88c',
         data: {
            topic: 'channel.session.update',
            room: channelId,
            token: jwtToken,
            token_type: 'jwt',
         },
      };

      websocket.send(JSON.stringify(subscribeMessage));
   });

   websocket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (
         message.topic === 'channel.session.update' &&
         message.type === 'message' &&
         message.data.key === 'follower-latest'
      ) {
         const follower = message?.data?.data?.name;

         if (follower && follower !== lastFollower.name) {
            lastFollower.name = follower;
            updateFollowerUI();
         }
      }
   });

   websocket.addEventListener('close', () => {
      console.log('WebSocket closed. Reconnecting...');
      setTimeout(createWebSocket, 2000);
   });

   websocket.addEventListener('error', (err) => {
      console.error('WebSocket error', err);
   });
}

createWebSocket();
