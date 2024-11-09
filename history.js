document.addEventListener('DOMContentLoaded', function() {
    const withdrawalHistory = document.getElementById('withdrawal-history');

    // 读取提现历史记录
    const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];
    histories.forEach(history => {
        const listItem = document.createElement('li');
        listItem.textContent = `Withdrawal amount: ${history.amount}, Date: ${history.date}`;
        withdrawalHistory.appendChild(listItem);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const withdrawalHistory = document.getElementById('withdrawal-history');
    const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];

    histories.forEach(history => {
        const listItem = document.createElement('li');
        listItem.textContent = `Withdrawal amount: ${history.amount}, Date: ${history.date}`;
        listItem.style.color = history.status === '已打款' ? 'green' : 'red';
        withdrawalHistory.appendChild(listItem);
    });

    // 监听localStorage变化
    window.addEventListener('storage', (event) => {
        if (event.key === 'withdrawalHistories') {
            withdrawalHistory.innerHTML = ''; // 清空历史记录
            const updatedHistories = JSON.parse(event.newValue);
            updatedHistories.forEach(history => {
                const listItem = document.createElement('li');
                listItem.textContent = `Withdrawal amount: ${history.amount}, Date: ${history.date}`;
                listItem.style.color = history.status === '已打款' ? 'green' : 'red';
                withdrawalHistory.appendChild(listItem);
            });
        }
    });
});