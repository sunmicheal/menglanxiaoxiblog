document.addEventListener('DOMContentLoaded', function() {
    const withdrawalHistoryList = document.getElementById('admin-withdrawal-history');
    const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];

// 显示提现历史记录
    histories.forEach(history => {
        const listItem = document.createElement('li');
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';

        const details = document.createElement('div');
        details.textContent = `Wallet Number: ${history.walletNumber}, Withdrawal Amount: ${history.amount}, Date: ${history.date}`;
        details.style.flexGrow = '1';
        details.style.color = history.status === '已打款' ? 'green' : 'red';

        const paidButton = document.createElement('button');
        paidButton.textContent = 'Paid';
        paidButton.className = 'status-button';
        paidButton.disabled = history.status === '已打款';
        paidButton.addEventListener('click', function() {
            history.status = '已打款';
            details.style.color = 'green';
            saveHistories(histories);
        });

        const unpaidButton = document.createElement('button');
        unpaidButton.textContent = 'Unpaid';
        unpaidButton.className = 'status-button';
        unpaidButton.disabled = history.status === '未打款';
        unpaidButton.addEventListener('click', function() {
            history.status = '未打款';
            details.style.color = 'red';
            saveHistories(histories);
        });

        listItem.appendChild(details);
        listItem.appendChild(paidButton);
        listItem.appendChild(unpaidButton);
        withdrawalHistoryList.appendChild(listItem);
    });

    // 清除历史记录按钮
    const clearHistoryButton = document.createElement('button');
    clearHistoryButton.textContent = 'Clear History';
    clearHistoryButton.addEventListener('click', function() {
        localStorage.removeItem('withdrawalHistories'); // 清除localStorage中的历史记录
        withdrawalHistoryList.innerHTML = ''; // 清除后台页面的历史记录显示
        alert('History cleared!');
    });
});

// 保存历史记录到 localStorage
function saveHistories(histories) {
    localStorage.setItem('withdrawalHistories', JSON.stringify(histories));
}
