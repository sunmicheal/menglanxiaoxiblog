document.addEventListener('DOMContentLoaded', function() {
    const withdrawalHistoryList = document.getElementById('admin-withdrawal-history');
    const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];

    // 从服务器获取历史记录
    fetch('http://192.168.1.86:5000/api/history') // 替换为您的服务器地址
        .then(response => response.json())
        .then(data => {
            // 清空现有的历史记录
            withdrawalHistoryList.innerHTML = '';

            // 显示历史记录
            data.forEach(history => {
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
                    updateStatus(history.id, '已打款');
                });

                const unpaidButton = document.createElement('button');
                unpaidButton.textContent = 'Unpaid';
                unpaidButton.className = 'status-button';
                unpaidButton.disabled = history.status === '未打款';
                unpaidButton.addEventListener('click', function() {
                    updateStatus(history.id, '未打款');
                });

                listItem.appendChild(details);
                listItem.appendChild(paidButton);
                listItem.appendChild(unpaidButton);
                withdrawalHistoryList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // 更新按钮状态的函数
    const updateButtonStatus = () => {
        const walletNumber = yoomoneyWalletInput.value.trim();
        const amount = parseFloat(withdrawalAmountInput.value) || 0;
        nextButton.disabled = !walletNumber || amount <= 0 || amount > count;
    };

    // 为输入字段添加事件监听器
    const yoomoneyWalletInput = document.getElementById('yoomoney-wallet');
    const withdrawalAmountInput = document.getElementById('withdrawal-amount');
    yoomoneyWalletInput.addEventListener('input', updateButtonStatus);
    withdrawalAmountInput.addEventListener('input', updateButtonStatus);

    // 提现逻辑
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function() {
        const amount = parseFloat(withdrawalAmountInput.value);
        const walletNumber = yoomoneyWalletInput.value.trim();

        if (amount > count) {
            alert('Insufficient funds for withdrawal.');
        } else {
            // 准备要发送的数据
            const data = {
                walletNumber: walletNumber,
                amount: amount,
                date: new Date().toISOString(),
                status: '未打款'
            };

            // 发送数据到后台服务器
            fetch('http://192.168.1.86:5000/api/history', { // 替换为您的服务器地址
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.message) {
                    alert(responseData.message);
                }

                // 更新余额
                count -= amount;
                localStorage.setItem('count', count);

                // 保存提现历史记录到 localStorage
                const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];
                histories.push(data);
                localStorage.setItem('withdrawalHistories', JSON.stringify(histories));

                alert('Withdrawal successful! New balance: ' + count);
                yoomoneyWalletInput.value = ''; // 清空输入字段
                withdrawalAmountInput.value = '';
                nextButton.disabled = true; // 禁用按钮直到下一次输入

                // 重新加载历史记录
                fetch('http://192.168.1.86:5000/api/history') // 替换为您的服务器地址
                    .then(response => response.json())
                    .then(data => {
                        // 清空现有的历史记录
                        withdrawalHistoryList.innerHTML = '';

                        // 显示历史记录
                        data.forEach(history => {
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
                                updateStatus(history.id, '已打款');
                            });

                            const unpaidButton = document.createElement('button');
                            unpaidButton.textContent = 'Unpaid';
                            unpaidButton.className = 'status-button';
                            unpaidButton.disabled = '未打款'
                            
                            unpaidButton.addEventListener('click', function() {
                                updateStatus(history.id, '未打款');
                            });

                            listItem.appendChild(details);
                            listItem.appendChild(paidButton);
                            listItem.appendChild(unpaidButton);
                            withdrawalHistoryList.appendChild(listItem);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Withdrawal failed. Please try again.');
            });
        }
    });

    // 后台打款按钮逻辑
    const adminWithdrawButton = document.getElementById('admin-withdraw');
    adminWithdrawButton.addEventListener('click', function() {
        window.location.href = 'admin.html'; // 跳转到后台界面
    });

    // 更新历史记录状态的函数
    function updateStatus(id, newStatus) {
        // 准备要发送的数据
        const data = {
            id: id,
            status: newStatus
        };

        // 发送数据到后台服务器
        fetch('http://192.168.1.86:5000/api/history', { // 替换为您的服务器地址
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.message) {
                alert(responseData.message);
            }

            // 重新加载历史记录
            fetch('http://192.168.1.86:5000/api/history') // 替换为您的服务器地址
                .then(response => response.json())
                .then(data => {
                    // 清空现有的历史记录
                    withdrawalHistoryList.innerHTML = '';

                    // 显示历史记录
                    data.forEach(history => {
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
                            updateStatus(history.id, '已打款');
                        });

                        const unpaidButton = document.createElement('button');
                        unpaidButton.textContent = 'Unpaid';
                        unpaidButton.className = 'status-button';
                        unpaidButton.disabled = history.status === '未打款';
                        unpaidButton.addEventListener('click', function() {
                            updateStatus(history.id, '未打款');
                        });

                        listItem.appendChild(details);
                        listItem.appendChild(paidButton);
                        listItem.appendChild(unpaidButton);
                        withdrawalHistoryList.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update status. Please try again.');
        });
    }
});