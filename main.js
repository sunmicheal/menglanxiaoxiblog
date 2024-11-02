document.addEventListener('DOMContentLoaded', () => {
    // 定义 React 组件
    const ShowAdButton = () => {
        let count = 0;

        // 加载广告脚本的函数
        const loadAdScript = () => {
            const script = document.createElement('script');
            script.src = '//niphaumeenses.net/vignette.min.js';
            script.dataset.zone = '8453362';
            script.dataset.sdk = 'show_8453362';
            document.body.appendChild(script);
        };

        // 显示广告的函数
        const showAd = () => {
            loadAdScript(); // 加载广告脚本
            if (typeof window.show_8453362 === 'function') {
                window.show_8453362().then(() => {
                    count += 3;
                    document.getElementById('count').textContent = count;
                    localStorage.setItem('count', count);
                }).catch(error => {
                    console.error('Error displaying the ad:', error);
                });
            } else {
                console.error('Function window.show_8453362 not found or is not a function');
            }
        };

        // 创建显示次数的元素
        const countElement = document.createElement('div');
        countElement.id = 'count';
        countElement.style.position = 'absolute';
        countElement.style.top = '50px';
        countElement.style.left = '5px';
        countElement.style.width = '150px';
        countElement.style.height = '48px';
        countElement.style.padding = '20px';
        countElement.style.background = '#04B0FF';
        countElement.style.color = 'white';
        countElement.style.borderRadius = '10px';
        countElement.style.textAlign = 'right';
        countElement.textContent = '0';

        // 创建按钮元素
        const button = document.createElement('button');
        button.className = 'ad-button';
        button.style.position = 'absolute';
        button.style.top = '50%';
        button.style.left = '50%';
        button.style.transform = 'translate(-50%, -50%)';
        button.textContent = 'ᐅ';
        button.onclick = showAd;

        // 创建清除按钮元素
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-button';
        clearButton.style.position = 'absolute';
        clearButton.style.top = '100px'; // 调整位置
        clearButton.style.left = '5px';
        clearButton.textContent = 'Clear';
        clearButton.onclick = () => {
            localStorage.removeItem('count');
            countElement.textContent = '0';
        };

        // 将计数器、广告按钮和清除按钮添加到页面
        document.body.appendChild(countElement);
        document.body.appendChild(button);
        document.body.appendChild(clearButton);

        return countElement;
    };

    // 使用 ReactDOM.render 挂载组件到页面
    const countDisplay = ShowAdButton();
    document.getElementById('root').appendChild(countDisplay);

    // 从 localStorage 加载计数
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
        document.getElementById('count').textContent = savedCount;
    }
});