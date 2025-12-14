const getTipsLeaderboard = async () => {
   const jwtToken = 'YOUR_JWT_TOKEN_HERE';
   const channelId = 'YOUR_CHANNEL_ID_HERE';

   const headers = {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
   };

   const createLi = (amount, avatar, username) => {
      const li = document.createElement('li');
      li.innerHTML = `
            <img src="${avatar}" alt="${username}">
            <span class="username">${username}</span>
            <span class="amount">$${parseFloat(amount).toFixed(2)}</span>
        `;
      console.log(li);
      return li;
   };

   const url = `https://api.streamelements.com/kappa/v2/tips/${channelId}/leaderboard`;

   try {
      const response = await fetch(url, {
         method: 'GET',
         headers: headers,
      });

      if (response.ok) {
         const data = await response.json();
         const htmlCode = data.map(({ amount, avatar, username }) =>
            createLi(amount, avatar, username)
         );

         const logosSlide = document.querySelector('.tag-list');
         logosSlide.innerHTML = '';

         htmlCode.forEach((li) => logosSlide.appendChild(li));

         const clone = logosSlide.cloneNode(true);
         document.querySelector('.logos').appendChild(clone);
      }
   } catch (error) {
      console.log(error);
   }
};
const carousel = async () => {
   await getTipsLeaderboard();

   const scrollers = document.querySelectorAll('.scroller');

   if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
   }

   function addAnimation() {
      scrollers.forEach((scroller) => {
         scroller.setAttribute('data-animated', true);

         const scrollerInner = scroller.querySelector('.scroller__inner');
         const scrollerContent = Array.from(scrollerInner.children);

         scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
         });
      });
   }
};

carousel();

setInterval(carousel, 180000);
