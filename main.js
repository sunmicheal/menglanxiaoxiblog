document.addEventListener('DOMContentLoaded', () => {
    let count = 0; // 计数器
    let adActive = false; // 标记广告是否正在展示

    // 加载广告脚本的函数
    const loadAdScript = () => {
        const script = document.createElement('script');
        script.src = '//niphaumeenses.net/vignette.min.js';
        script.dataset.zone = '8453362';
        script.dataset.sdk = 'show_8453362';
        script.onload = () => {
            console.log('广告脚本加载成功');
        };
        script.onerror = () => {
            console.error('广告脚本加载失败');
        };
        document.body.appendChild(script);
    };

    // 显示广告的函数
    const showAd = () => {
        if (typeof window.show_8453362 === 'function' && !adActive) {
            adActive = true; // 标记广告正在展示
            console.log('尝试展示广告');
            window.show_8453362().then(() => {
                console.log('广告已结束');
                count += 1; // 广告结束后计数增加
                document.getElementById('count').textContent = count;
                localStorage.setItem('count', count);
                adActive = false; // 重置广告状态
            }).catch(error => {
                console.error('Error displaying the ad:', error);
                adActive = false; // 重置广告状态
            });
        } else {
            console.log('广告函数未定义或广告正在展示');
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
    button.onclick = () => {
        if (!adActive) {
            loadAdScript(); // 仅在广告脚本未加载时加载
            showAd(); // 展示广告
        }
    };

    // 创建清除按钮元素
    const clearButton = document.createElement('button');
    clearButton.className = 'clear-button';
    clearButton.style.position = 'absolute';
    clearButton.style.top = '100px';
    clearButton.style.left = '5px';
    clearButton.textContent = 'Clear';
    clearButton.onclick = () => {
        localStorage.removeItem('count');
        countElement.textContent = '0';
        count = 0;
        adActive = false;
    };

    // 将计数器、广告按钮和清除按钮添加到页面
    document.body.appendChild(countElement);
    document.body.appendChild(button);
    document.body.appendChild(clearButton);

    // 从 localStorage 加载计数
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
        count = parseInt(savedCount, 10);
        document.getElementById('count').textContent = savedCount;
    }
});