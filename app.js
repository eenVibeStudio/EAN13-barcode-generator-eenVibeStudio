// EAN-13校验位计算函数
function calculateCheckDigit(ean12) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        let digit = parseInt(ean12[i]);
        // 奇数位（从1开始计数，即索引0,2,4...）乘以1
        // 偶数位（索引1,3,5...）乘以3
        if (i % 2 === 0) {
            sum += digit;
        } else {
            sum += digit * 3;
        }
    }
    // 计算校验位：10减去（总和模10），如果结果是10则校验位为0
    let checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit;
}

// 生成指定位数的产品代码（随机生成）
function generateProductCode(length) {
    let productCode = '';
    for (let i = 0; i < length; i++) {
        productCode += Math.floor(Math.random() * 10);
    }
    return productCode;
}

// 生成完整的EAN-13码
function generateEAN13(prefix) {
    // 计算需要生成的产品代码位数
    // EAN-13总共13位，其中1位是校验位，所以前12位 = 前缀 + 产品代码
    const prefixLength = prefix.length;
    const productCodeLength = 12 - prefixLength;
    
    // 生成产品代码
    const productCode = generateProductCode(productCodeLength);
    
    // 组合前12位
    const ean12 = prefix + productCode;
    
    // 计算校验位
    const checkDigit = calculateCheckDigit(ean12);
    
    // 返回完整的13位EAN码
    return {
        fullCode: ean12 + checkDigit,
        prefix: prefix,
        prefixLength: prefixLength,
        productCode: productCode,
        productCodeLength: productCodeLength,
        checkDigit: checkDigit.toString()
    };
}

// 验证输入
function validateInput(input, count) {
    // 检查前缀是否为0-8位数字
    if (!/^\d{0,8}$/.test(input)) {
        return {
            valid: false,
            message: '请输入0-8位数字（0-9）'
        };
    }
    
    // 检查前缀长度是否在有效范围内
    const prefixLength = input.length;
    if (prefixLength < 0 || prefixLength > 8) {
        return {
            valid: false,
            message: '前缀长度必须在0-8位之间'
        };
    }
    
    // 检查数量
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount < 1) {
        return {
            valid: false,
            message: '请输入有效的生成数量（至少为1）'
        };
    }
    
    if (numCount > 50) {
        return {
            valid: false,
            message: '生成数量不能超过50个'
        };
    }
    
    return { valid: true };
}

// 生成条形码
function generateBarcode(selector, ean13) {
    try {
        JsBarcode(selector, ean13, {
            format: "EAN13",
            width: 2,
            height: 34,
            displayValue: true, // 显示EAN码数字
            fontSize: 14,
            margin: 8
        });
    } catch (error) {
        console.error('生成条形码时出错:', error);
        showError('生成条形码图片时出错，请重试');
    }
}

// 下载条形码图片（单个下载，复用批量下载的代码）
async function downloadBarcode(index, eanCode) {
    try {
        const productNameInput = document.getElementById(`product-name-${index}`);
        const productName = productNameInput ? productNameInput.value.trim() : '';
        
        const blob = await generateBarcodeImage(index, eanCode, productName);
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fileName = productName 
            ? sanitizeFileName(productName) + '_' + eanCode + '.png'
            : 'barcode_' + eanCode + '.png';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('下载条形码时出错:', error);
        showError('下载条形码时出错，请重试');
    }
}

// 文本换行辅助函数
function wrapText(ctx, text, maxWidth) {
    if (!text) return [];
    
    const chars = text.split('');
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < chars.length; i++) {
        const testLine = currentLine + chars[i];
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = chars[i];
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine !== '') {
        lines.push(currentLine);
    }
    
    return lines.length > 0 ? lines : [text];
}

// 清理文件名，移除不安全的字符
function sanitizeFileName(fileName) {
    // 移除或替换文件名中的不安全字符
    return fileName
        .replace(/[<>:"/\\|?*]/g, '_')  // 替换Windows不允许的字符
        .replace(/\s+/g, '_')            // 空格替换为下划线
        .substring(0, 50);                // 限制长度
}

// 显示错误信息
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // 3秒后自动隐藏错误信息
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// 生成单个条形码的HTML
function createBarcodeItem(result, index, total) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'barcode-item';
    itemDiv.innerHTML = `
        <div class="barcode-item-checkbox">
            <label class="checkbox-label">
                <input type="checkbox" class="barcode-checkbox" data-index="${index}" data-ean="${result.fullCode}">
                <span class="checkbox-custom"></span>
            </label>
        </div>
        <div class="barcode-item-content">
            <div class="barcode-item-header">
                <div class="barcode-item-number">条形码 ${index + 1} / ${total}</div>
                <div class="ean-code">${result.fullCode}</div>
            </div>
            <div class="product-name-section">
                <label for="product-name-${index}">产品名称（可选）：</label>
                <input 
                    type="text" 
                    id="product-name-${index}" 
                    class="product-name-input"
                    placeholder="例如: 商品A"
                    maxlength="50"
                >
            </div>
            <div class="barcode-display" id="barcode-wrapper-${index}">
                <div class="product-name-display" id="product-name-display-${index}" style="display: none;"></div>
                <svg id="barcode-${index}"></svg>
            </div>
            <div class="code-breakdown">
                <div class="breakdown-item">
                    <span class="label">前缀（${result.prefixLength}位）：</span>
                    <span class="value">${result.prefix || '(无)'}</span>
                </div>
                <div class="breakdown-item">
                    <span class="label">产品代码（${result.productCodeLength}位）：</span>
                    <span class="value">${result.productCode}</span>
                </div>
                <div class="breakdown-item">
                    <span class="label">校验位（1位）：</span>
                    <span class="value">${result.checkDigit}</span>
                </div>
            </div>
        </div>
    `;
    return itemDiv;
}

// 显示结果
function displayResults(results) {
    const resultSection = document.getElementById('result-section');
    const errorMessage = document.getElementById('error-message');
    const container = document.getElementById('barcodes-container');
    const summary = document.getElementById('result-summary');
    const batchControls = document.getElementById('batch-download-controls');
    
    // 隐藏错误信息
    errorMessage.style.display = 'none';
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 显示批量下载控制
    batchControls.style.display = 'block';
    
    // 清空容器
    container.innerHTML = '';
    
    // 更新摘要信息
    const count = results.length;
    const prefix = results[0].prefix;
    const prefixLength = results[0].prefixLength;
    const prefixDisplay = prefix || '(无前缀)';
    summary.textContent = `已生成 ${count} 个条形码（前缀${prefixLength}位：${prefixDisplay}）`;
    
    // 为每个结果创建条形码项
    results.forEach((result, index) => {
        const itemDiv = createBarcodeItem(result, index, count);
        container.appendChild(itemDiv);
        
        // 生成条形码图片（需要延迟以确保DOM已更新）
        setTimeout(() => {
            generateBarcode(`#barcode-${index}`, result.fullCode);
        }, 10);
        
        // 添加产品名称输入框的事件监听
        const nameInput = document.getElementById(`product-name-${index}`);
        nameInput.addEventListener('input', function() {
            updateProductNameDisplay(index, this.value);
        });
        
        // 添加复选框事件监听
        const checkbox = itemDiv.querySelector('.barcode-checkbox');
        checkbox.addEventListener('change', updateBatchDownloadButton);
    });
    
    // 设置全选复选框事件
    setupSelectAllCheckbox();
    
    // 更新批量下载按钮
    updateBatchDownloadButton();
}

// 更新产品名称显示
function updateProductNameDisplay(index, productName) {
    const displayDiv = document.getElementById(`product-name-display-${index}`);
    if (productName && productName.trim()) {
        displayDiv.textContent = productName.trim();
        displayDiv.style.display = 'block';
    } else {
        displayDiv.style.display = 'none';
    }
}

// 设置全选复选框
function setupSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (!selectAllCheckbox) return;
    
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.barcode-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateBatchDownloadButton();
    });
}

// 更新批量下载按钮
function updateBatchDownloadButton() {
    const batchBtn = document.getElementById('batch-download-btn');
    if (!batchBtn) return;
    
    const checkedBoxes = document.querySelectorAll('.barcode-checkbox:checked');
    const count = checkedBoxes.length;
    
    batchBtn.textContent = `📦 下载选中的条形码 (${count})`;
    batchBtn.disabled = count === 0;
    
    // 更新全选复选框状态
    const allCheckboxes = document.querySelectorAll('.barcode-checkbox');
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    if (selectAllCheckbox && allCheckboxes.length > 0) {
        selectAllCheckbox.checked = checkedBoxes.length === allCheckboxes.length;
        selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < allCheckboxes.length;
    }
}

// 批量下载选中的条形码
async function downloadSelectedBarcodes() {
    const checkedBoxes = document.querySelectorAll('.barcode-checkbox:checked');
    
    if (checkedBoxes.length === 0) {
        showError('请至少选择一个条形码');
        return;
    }
    
    if (checkedBoxes.length === 1) {
        // 如果只选中一个，直接下载
        const index = parseInt(checkedBoxes[0].dataset.index);
        const eanCode = checkedBoxes[0].dataset.ean;
        await downloadBarcode(index, eanCode);
        return;
    }
    
    // 多个条形码，打包成ZIP下载
    try {
        const zip = new JSZip();
        const downloadPromises = [];
        
        checkedBoxes.forEach((checkbox, idx) => {
            const index = parseInt(checkbox.dataset.index);
            const eanCode = checkbox.dataset.ean;
            const productNameInput = document.getElementById(`product-name-${index}`);
            const productName = productNameInput ? productNameInput.value.trim() : '';
            
            downloadPromises.push(
                generateBarcodeImage(index, eanCode, productName).then(blob => {
                    const fileName = productName 
                        ? sanitizeFileName(productName) + '_' + eanCode + '.png'
                        : 'barcode_' + eanCode + '.png';
                    zip.file(fileName, blob);
                })
            );
        });
        
        // 显示加载提示
        const batchBtn = document.getElementById('batch-download-btn');
        const originalText = batchBtn.textContent;
        batchBtn.textContent = '⏳ 正在生成...';
        batchBtn.disabled = true;
        
        await Promise.all(downloadPromises);
        
        // 生成ZIP文件
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'barcodes.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // 恢复按钮
        batchBtn.textContent = originalText;
        batchBtn.disabled = false;
        
    } catch (error) {
        console.error('批量下载时出错:', error);
        showError('批量下载时出错，请重试');
        const batchBtn = document.getElementById('batch-download-btn');
        if (batchBtn) {
            batchBtn.textContent = '📦 下载选中的条形码';
            batchBtn.disabled = false;
        }
    }
}

// 生成条形码图片（返回Promise<Blob>）
function generateBarcodeImage(index, eanCode, productName) {
    return new Promise((resolve, reject) => {
        try {
            const wrapper = document.getElementById(`barcode-wrapper-${index}`);
            const svg = wrapper.querySelector('svg');
            
            if (!svg) {
                reject(new Error('条形码未找到'));
                return;
            }
            
            const svgRect = svg.getBoundingClientRect();
            const svgWidth = svgRect.width || svg.viewBox.baseVal.width || 300;
            const svgHeight = svgRect.height || svg.viewBox.baseVal.height || 34;
            
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            let nameHeight = 0;
            if (productName) {
                ctx.font = 'bold 18px Arial, sans-serif';
                const maxWidth = svgWidth;
                const lines = wrapText(ctx, productName, maxWidth);
                nameHeight = lines.length * 22;
            }
            
            const padding = 20;
            const scale = 2;
            
            canvas.width = (svgWidth + padding * 2) * scale;
            canvas.height = (svgHeight + nameHeight + padding * 2) * scale;
            
            ctx.scale(scale, scale);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
            
            if (productName) {
                ctx.fillStyle = '#333333';
                ctx.font = 'bold 18px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                const maxWidth = svgWidth;
                const lines = wrapText(ctx, productName, maxWidth);
                let y = padding;
                lines.forEach(line => {
                    ctx.fillText(line, (canvas.width / scale) / 2, y);
                    y += 22;
                });
            }
            
            img.onload = function() {
                // 产品名称和条形码之间的间距为3px
                const spacing = 3;
                ctx.drawImage(img, padding, padding + nameHeight + spacing, svgWidth, svgHeight);
                canvas.toBlob(function(blob) {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('生成图片失败'));
                    }
                    URL.revokeObjectURL(img.src);
                }, 'image/png');
            };
            
            img.onerror = function() {
                reject(new Error('加载SVG失败'));
                URL.revokeObjectURL(img.src);
            };
            
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            img.src = url;
            
        } catch (error) {
            reject(error);
        }
    });
}

// 主函数：处理生成按钮点击
function handleGenerate() {
    const input = document.getElementById('prefix-input').value.trim();
    const countInput = document.getElementById('count-input').value.trim();
    const count = parseInt(countInput) || 1;
    
    // 验证输入
    const validation = validateInput(input, count);
    if (!validation.valid) {
        showError(validation.message);
        return;
    }
    
    // 如果输入为空，使用空字符串作为前缀（0位）
    const prefix = input || '';
    
    // 生成多个EAN-13码，确保不重复
    const results = [];
    const generatedCodes = new Set(); // 用于跟踪已生成的完整代码
    let attempts = 0;
    const maxAttempts = count * 100; // 防止无限循环
    
    while (results.length < count && attempts < maxAttempts) {
        const result = generateEAN13(prefix);
        if (!generatedCodes.has(result.fullCode)) {
            generatedCodes.add(result.fullCode);
            results.push(result);
        }
        attempts++;
    }
    
    if (results.length < count) {
        showError(`警告：只生成了 ${results.length} 个不重复的条形码（共尝试 ${attempts} 次）`);
    }
    
    // 显示结果
    displayResults(results);
}

// 事件监听
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const prefixInput = document.getElementById('prefix-input');
    const countInput = document.getElementById('count-input');
    
    // 生成按钮点击事件
    generateBtn.addEventListener('click', handleGenerate);
    
    // 输入框回车事件
    prefixInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGenerate();
        }
    });
    
    countInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGenerate();
        }
    });
    
    // 输入框输入限制：只允许数字
    prefixInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    
    countInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value && parseInt(value) > 50) {
            value = '50';
        }
        e.target.value = value;
    });
    
    // 批量下载按钮事件
    const batchDownloadBtn = document.getElementById('batch-download-btn');
    if (batchDownloadBtn) {
        batchDownloadBtn.addEventListener('click', downloadSelectedBarcodes);
    }
});
