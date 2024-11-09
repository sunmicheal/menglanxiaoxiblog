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
            count -= amount; // 扣除金额
            localStorage.setItem('count', count); // 更新余额

            // 保存提现历史记录
            const histories = JSON.parse(localStorage.getItem('withdrawalHistories')) || [];
            const history = {
                walletNumber: walletNumber,
                amount: amount,
                date: new Date().toLocaleString(),
                status: '未打款' // 初始状态为未打款
            };
            histories.push(history);
            localStorage.setItem('withdrawalHistories', JSON.stringify(histories));

            alert('Withdrawal successful! New balance: ' + count);
            yoomoneyWalletInput.value = ''; // 清空输入字段
            withdrawalAmountInput.value = '';
            nextButton.disabled = true; // 禁用按钮直到下一次输入
        }
    });

    // 后台打款按钮逻辑
    adminWithdrawButton.addEventListener('click', function() {
        window.location.href = 'admin.html'; // 跳转到后台界面
    });
});
