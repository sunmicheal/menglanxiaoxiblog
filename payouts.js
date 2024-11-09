document.addEventListener('DOMContentLoaded', function() {
    // 初始化计数器值
    let count = parseInt(localStorage.getItem('count'), 10) || 0;

    // 获取页面元素
    const yoomoneyWalletInput = document.getElementById('yoomoney-wallet');
    const withdrawalAmountInput = document.getElementById('withdrawal-amount');
    const nextButton = document.getElementById('next');
    const adminWithdrawButton = document.getElementById('admin-withdraw');

    // 更新按钮状态的函数
    const updateButtonStatus = () => {
        const walletNumber = yoomoneyWalletInput.value.trim();
        const amount = parseFloat(withdrawalAmountInput.value) || 0;
        nextButton.disabled = !walletNumber || amount <= 0 || amount > count;
    };

    // 为输入字段添加事件监听器
    yoomoneyWalletInput.addEventListener('input', updateButtonStatus);
    withdrawalAmountInput.addEventListener('input', updateButtonStatus);

    // 提现逻辑
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

                // 保存提现历史记录
                const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];
                histories.push(data);
                localStorage.setItem('withdrawalHistories', JSON.stringify(histories));

                alert('Withdrawal successful! New balance: ' + count);
                yoomoneyWalletInput.value = ''; // 清空输入字段
                withdrawalAmountInput.value = '';
                nextButton.disabled = true; // 禁用按钮直到下一次输入
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Withdrawal failed. Please try again.');
            });
        }
    });

    // 后台打款按钮逻辑
    adminWithdrawButton.addEventListener('click', function() {
        window.location.href = 'admin.html'; // 跳转到后台界面
    });
});