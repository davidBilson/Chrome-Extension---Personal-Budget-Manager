async function main() {
    const budget = await chrome.storage.sync.get(['total', 'limit']);
    document.querySelector('#total').textContent = budget.total;
    document.querySelector('#limit').textContent = budget.limit;
  
    document.querySelector('#spendAmount').addEventListener('click', async () => {
      const budget = await chrome.storage.sync.get(['total', 'limit']);
      let newTotal = budget.total ? parseInt(budget.total) : 0;
      const amount = document.querySelector('#amount').value;
      if (amount) {
        newTotal += parseInt(amount);
      }
  
      await chrome.storage.sync.set({ total: newTotal });
      document.querySelector('#total').textContent = newTotal;
      document.querySelector('#amount').value = '';
  
      if (amount && newTotal >= budget.limit) {
        const notifOptions = {
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Limit reached!',
          message: "Uh oh, look's like you've reached your alloted limit.",
        };
        chrome.notifications.create('limitNotif', notifOptions);
      }
    });
  }
  
  main();
  