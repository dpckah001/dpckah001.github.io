document.addEventListener('DOMContentLoaded', () => {
    // 动态网络节点地图
    const width = 300;
    const height = 300;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('network-map').appendChild(renderer.domElement);

    // 创建节点
    const nodes = [];
    const numNodes = 10; // 节点数量
    const nodeRadius = 1;

    for (let i = 0; i < numNodes; i++) {
        const geometry = new THREE.SphereGeometry(nodeRadius, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0x00FFDD });
        const node = new THREE.Mesh(geometry, material);
        node.position.set(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        scene.add(node);
        nodes.push(node);
    }

    // 创建单向连接
    const lines = [];
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00FFDD });

    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
                nodes[i].position,
                nodes[j].position
            ]);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
            lines.push(line);
        }
    }

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);

        // 动态效果
        scene.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // 模拟获取在线人数并更新节点
    function updateOnlineUsers() {
        // 假设从后端获取在线人数数据
        const onlineUsers = Array.from({ length: numNodes }, () => Math.floor(Math.random() * 100));

        nodes.forEach((node, index) => {
            // 这里可以更新节点的显示，例如通过颜色或大小来表示在线人数
            node.scale.set(onlineUsers[index] / 100, onlineUsers[index] / 100, onlineUsers[index] / 100);
        });
    }

    setInterval(updateOnlineUsers, 5000); // 每5秒更新一次在线人数数据

    // 创建二进制尾焰效果
    document.addEventListener('mousemove', (event) => {
        // 创建二进制尾焰
        const trailElement = document.createElement('span');
        trailElement.textContent = Math.random() > 0.5 ? '0' : '1'; // 随机生成0或1
        trailElement.classList.add('trail');

        // 设置元素的初始位置为鼠标当前位置
        trailElement.style.left = `${event.pageX}px`;
        trailElement.style.top = `${event.pageY}px`;

        // 将尾焰元素添加到页面
        document.body.appendChild(trailElement);

        // 动画结束后移除元素
        setTimeout(() => {
            trailElement.remove();
        }, 2000); // 尾焰动画持续2秒
    });
});
