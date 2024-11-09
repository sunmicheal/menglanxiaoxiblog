document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to the modern UI with blue and gray color scheme!');

    let count = 0; // 计数器
    let adActive = false; // 标记广告是否正在展示
    const maxCount = 100000000; // 设置计数值的最大值
    const offsetPerCount = 0; // 每个计数单位对应的偏移量

    // 从 localStorage 加载计数
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
        count = parseInt(savedCount, 10);
        if (count > maxCount) {
            count = maxCount; // 确保不超过最大值
        }
    } else {
        localStorage.setItem('count', count); // 确保初始值也被保存
    }

    console.log('Total count:', count); // 将最终的总数值显示在控制台

    // 更新计时器显示的函数
    const updateCountDisplay = () => {
        const countElement = document.getElementById('count');
        if (countElement) {
            countElement.textContent = count.toString();
            // 根据计数值调整计时器元素的位置
            const offset = Math.min(count, maxCount) * offsetPerCount;
            countElement.style.left = `${offset}px`; // 向右移动offset像素
        }
    };

    // 创建显示次数的元素
    const countElement = document.createElement('div');
    countElement.id = 'count';
    countElement.style.position = 'absolute';
    countElement.style.top = '78px';
    countElement.style.left = '0px'; // 初始化时不移动
    countElement.style.width = '150px';
    countElement.style.height = '48px';
    countElement.style.padding = '20px';
    countElement.style.color = '#9B9B9B';
    countElement.style.borderRadius = '10px';
    countElement.style.textAlign = 'right';
    countElement.textContent = count;
    countElement.style.fontSize = '50px';

    document.body.appendChild(countElement);
    updateCountDisplay();

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
                if (count < maxCount) {
                    count += 8; // 广告结束后计数增加
                } else {
                    count = 0; // 重置计数器
                }
                updateCountDisplay(); // 更新计时器显示
                localStorage.setItem('count', count); // 更新localStorage中的值
                adActive = false; // 重置广告状态
            }).catch(error => {
                console.error('Error displaying the ad:', error);
                adActive = false; // 重置广告状态
            });
        } else if (!adActive) {
            console.log('广告函数未定义，等待脚本加载');
            loadAdScript(); // 加载广告脚本
        } else {
            console.log('广告正在展示，等待结束');
        }
    };

    // 创建按钮元素
    const button = document.createElement('button');
    button.className = 'ad-button';
    button.style.position = 'absolute';
    button.style.top = '50%';
    button.style.left = '80%';
    button.style.transform = 'translate(-50%, -50%)';
    button.textContent = '▶';
    button.onclick = () => {
        if (!adActive) {
            showAd(); // 展示广告
        }
    };
    document.body.appendChild(button);

    // 创建导航栏的容器
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    navbar.style.position = 'fixed';
    navbar.style.bottom = '0';
    navbar.style.right = '30px';
    navbar.style.width = '300px';
    navbar.style.display = 'flex';
    navbar.style.justifyContent = 'space-around';
    navbar.style.padding = '10px 0';
    navbar.style.borderTopLeftRadius = '10px'; // 左侧圆角
    navbar.style.borderTopRightRadius = '10px'; // 右侧圆角
    navbar.style.backgroundColor = '#007bff'; // 主色调蓝色
    navbar.style.boxShadow = '0 -2px 5px rgba(0, 0, 0, 0.2)'; // 底部阴影效果

    // 创建main按钮
    const mainButton = createNavButton('Main', () => {});
    mainButton.style.backgroundColor = 'white'; // 默认激活状态
    mainButton.style.color = '#20A2FF'; // 默认激活状态
    mainButton.style.borderRadius = '25px';

    // 创建payouts按钮
    const payoutsButton = createNavButton('Payouts', () => {
        window.location.href = 'Payouts.html'; // 跳转到另一个界面
    });
    payoutsButton.style.borderRadius = '25px';
    payoutsButton.style.backgroundColor = 'white';
    payoutsButton.style.color = '#20A2FF';

    // 创建history按钮
    const historyButton = createNavButton('History', () => {window.location.href  = 'History.html'});
    historyButton.style.borderRadius = '25px';
    historyButton.style.backgroundColor = '#FFFFFF';
    historyButton.style.color = '#20A2FF';

    // 将按钮添加到导航栏
    navbar.appendChild(mainButton);
    navbar.appendChild(payoutsButton);
    navbar.appendChild(historyButton);

    // 将导航栏添加到页面
    document.body.appendChild(navbar);

    // 创建导航按钮的函数
    function createNavButton(text, onClick) {
        const button = document.createElement('button');
        button.style.padding = '10px 20px';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.textContent = text;
        button.addEventListener('click', () => {
            // 重置所有按钮样式
            mainButton.style.backgroundColor = '';
            mainButton.style.color = '';
            payoutsButton.style.backgroundColor = '';
            payoutsButton.style.color = '';
            historyButton.style.backgroundColor = '';
            historyButton.style.color = '';

            // 设置被点击按钮的样式
            button.style.backgroundColor = 'white';
            button.style.color = 'blue';

            onClick();
        });
        return button;
    }
});