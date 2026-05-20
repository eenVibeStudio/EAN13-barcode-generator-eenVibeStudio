// 简单国际化字典（中文 zh / 英语 en / 荷兰语 nl）
const I18N = {
    zh: {
        title: 'EAN-13 条形码生成器',
        subtitle: '输入0-8位自定义数字作为前缀，自动生成完整的EAN-13条形码',
        label_prefix: '输入前缀数字（0-8位，例如：690 或 69012）：',
        placeholder_prefix: '例如: 690 或 69012',
        label_count: '生成数量：',
        generate_btn: '生成条形码',
        result_header: '生成的EAN-13条形码',
        select_all: '全选',
        label_ratio: '长宽比:',
        download_selected: '下载选中的条形码',
        download_generating: '⏳ 正在生成...',
        error_invalid_prefix: '请输入0-8位数字（0-9）',
        error_invalid_count: '请输入有效的生成数量（至少为1）',
        error_count_too_large: '生成数量不能超过50个',
        error_at_least_one: '请至少选择一个条形码',
        error_generate_image: '生成条形码图片时出错，请重试',
        error_batch_download: '批量下载时出错，请重试',
        summary_generated: '已生成 {count} 个条形码（前缀{prefixLength}位：{prefix}）',
        warning_partial_generated: '警告：只生成了 {generated} 个不重复的条形码（共尝试 {attempts} 次）',
        barcode_label: '条形码',
        product_name_label: '产品名称（可选）：',
        breakdown_prefix: '前缀',
        breakdown_product_code: '产品代码',
        breakdown_check_digit: '校验位',
        breakdown_prefix_with_len: '前缀（{len}位）：',
        breakdown_product_code_with_len: '产品代码（{len}位）：',
        breakdown_check_digit_with_len: '校验位（{len}位）：',
        ratio_5_1: '5:1 (宽)',
        ratio_4_1: '4:1 (推荐)',
        ratio_3_1: '3:1 (标准)',
        ratio_2_1: '2:1 (正方)'
    },
    en: {
        title: 'EAN-13 Barcode Generator',
        subtitle: 'Enter a 0–8 digit prefix to auto-generate complete EAN-13 barcodes',
        label_prefix: 'Prefix digits (0-8, e.g. 690 or 69012):',
        placeholder_prefix: 'e.g.: 690 or 69012',
        label_count: 'Quantity:',
        generate_btn: 'Generate barcodes',
        result_header: 'Generated EAN-13 barcodes',
        select_all: 'Select all',
        label_ratio: 'Aspect ratio:',
        download_selected: 'Download selected',
        download_generating: '⏳ Generating...',
        error_invalid_prefix: 'Please enter 0-8 digits (0-9)',
        error_invalid_count: 'Please enter a valid quantity (at least 1)',
        error_count_too_large: 'Quantity cannot exceed 50',
        error_at_least_one: 'Please select at least one barcode',
        error_generate_image: 'Error generating barcode image, please try again',
        error_batch_download: 'Error during batch download, please try again',
        summary_generated: 'Generated {count} barcode(s) (prefix {prefixLength} digits: {prefix})',
        warning_partial_generated: 'Warning: only generated {generated} unique barcodes (attempted {attempts} times)',
        barcode_label: 'Barcode',
        product_name_label: 'Product name (optional):',
        breakdown_prefix: 'Prefix',
        breakdown_product_code: 'Product code',
        breakdown_check_digit: 'Check digit',
        breakdown_prefix_with_len: 'Prefix ({len} digits):',
        breakdown_product_code_with_len: 'Product code ({len} digits):',
        breakdown_check_digit_with_len: 'Check digit ({len} digit):',
        ratio_5_1: '5:1 (wide)',
        ratio_4_1: '4:1 (recommended)',
        ratio_3_1: '3:1 (standard)',
        ratio_2_1: '2:1 (square)'
    },
    nl: {
        title: 'EAN-13 Streepjescode Generator',
        subtitle: 'Voer een 0–8 cijfer prefix in om EAN-13 streepjescodes te genereren',
        label_prefix: 'Prefix cijfers (0-8, bv. 690 of 69012):',
        placeholder_prefix: 'bv.: 690 of 69012',
        label_count: 'Aantal:',
        generate_btn: 'Genereer streepjescodes',
        result_header: 'Gegenereerde EAN-13 streepjescodes',
        select_all: 'Alles selecteren',
        label_ratio: 'Beeldverhouding:',
        download_selected: 'Download geselecteerd',
        download_generating: '⏳ Genereren...',
        error_invalid_prefix: 'Voer 0-8 cijfers in (0-9)',
        error_invalid_count: 'Voer een geldig aantal in (minimaal 1)',
        error_count_too_large: 'Aantal mag niet groter zijn dan 50',
        error_at_least_one: 'Selecteer ten minste één streepjescode',
        error_generate_image: 'Fout bij genereren van afbeelding, probeer opnieuw',
        error_batch_download: 'Fout tijdens batch-download, probeer opnieuw',
        summary_generated: '{count} streepjescode(s) gegenereerd (prefix {prefixLength} cijfers: {prefix})',
        warning_partial_generated: 'Waarschuwing: slechts {generated} unieke streepjescodes gegenereerd (pogingen: {attempts})',
        barcode_label: 'Streepjescode',
        product_name_label: 'Productnaam (optioneel):',
        breakdown_prefix: 'Prefix',
        breakdown_product_code: 'Productcode',
        breakdown_check_digit: 'Controlecijfer',
        breakdown_prefix_with_len: 'Prefix ({len} cijfers):',
        breakdown_product_code_with_len: 'Productcode ({len} cijfers):',
        breakdown_check_digit_with_len: 'Controlecijfer ({len} cijfer):',
        ratio_5_1: '5:1 (breed)',
        ratio_4_1: '4:1 (aanbevolen)',
        ratio_3_1: '3:1 (standaard)',
        ratio_2_1: '2:1 (vierkant)'
    }
};

function getLang() {
    const stored = localStorage.getItem('lang');
    if (stored) return stored;
    const nav = navigator.language || navigator.userLanguage || '';
    if (nav.startsWith('nl')) return 'nl';
    if (nav.startsWith('zh')) return 'zh';
    // default to English
    return 'en';
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations();
}

function t(key, vars) {
    const lang = getLang();
    const dict = I18N[lang] || I18N['zh'];
    let str = dict[key] || key;
    if (vars) {
        Object.keys(vars).forEach(k => {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k]);
        });
    }
    return str;
}

function applyTranslations() {
    // static text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    // placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

    // option texts
    document.querySelectorAll('[data-i18n-option]').forEach(opt => {
        const key = opt.getAttribute('data-i18n-option');
        opt.textContent = t(key);
    });

    // buttons and dynamic labels
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) generateBtn.textContent = t('generate_btn');

    const batchBtnLabel = document.querySelector('#batch-download-btn [data-i18n]');
    if (batchBtnLabel) batchBtnLabel.textContent = t('download_selected');

    // if results are visible, update summary and per-item labels
    const resultSummary = document.getElementById('result-summary');
    if (resultSummary && resultSummary.dataset.summaryData) {
        try {
            const info = JSON.parse(resultSummary.dataset.summaryData);
            resultSummary.textContent = t('summary_generated', { count: info.count, prefixLength: info.prefixLength, prefix: info.prefixDisplay });
        } catch (e) {}
    }

    // update existing barcode items
    document.querySelectorAll('.barcode-item').forEach(item => {
        const index = item.querySelector('.barcode-checkbox')?.dataset.index;
        if (index !== undefined) {
            const headerNum = item.querySelector('.barcode-item-number');
            const ean = item.querySelector('.ean-code')?.textContent || '';
            const total = item.dataset.total || '';
            if (headerNum) headerNum.textContent = `${t('barcode_label')} ${parseInt(index) + 1} / ${total}`;
            const pnameLabel = item.querySelector(`label[for='product-name-${index}']`);
            if (pnameLabel) pnameLabel.textContent = t('product_name_label');
            const breakdownLabels = item.querySelectorAll('.breakdown-item .label');
            if (breakdownLabels && breakdownLabels.length >= 3) {
                breakdownLabels[0].textContent = `${t('breakdown_prefix')}：`;
                breakdownLabels[1].textContent = `${t('breakdown_product_code')}：`;
                breakdownLabels[2].textContent = `${t('breakdown_check_digit')}：`;
            }
        }
    });
}

// 初始化语言选择器
document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = getLang();
        langSelect.addEventListener('change', function() {
            setLang(this.value);
        });
    }
    applyTranslations();
});

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
            message: t('error_invalid_prefix')
        };
    }
    
    // 检查前缀长度是否在有效范围内
    const prefixLength = input.length;
    if (prefixLength < 0 || prefixLength > 8) {
        return {
            valid: false,
            message: t('error_invalid_prefix')
        };
    }
    
    // 检查数量
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount < 1) {
        return {
            valid: false,
            message: t('error_invalid_count')
        };
    }

    if (numCount > 50) {
        return {
            valid: false,
            message: t('error_count_too_large')
        };
    }
    
    return { valid: true };
}

// 生成条形码（支持按 aspectRatio 渲染预览）
function generateBarcode(selector, ean13, aspectRatio = '4:1') {
    try {
        const svg = (typeof selector === 'string') ? document.querySelector(selector) : selector;
        if (!svg) return;

        // 解析长宽比（例如 "4:1" -> 4）
        const ratioNum = parseInt(String(aspectRatio).split(':')[0]) || 4;

        // 我们以可用宽度为主，计算 svg 宽度然后由宽度和比例计算高度
        const baseHeight = 72; // 参考高度，用于初始期望值

        // 确保下方 13 位数字可见：根据字号计算最小文本宽度
        const numberFontSize = 18; // px
        const approxCharWidth = numberFontSize * 0.62; // 经验值（等宽字体）
        const minTextWidth = Math.ceil(approxCharWidth * 13) + 24; // 13 chars + padding

        // 限制最大宽度不超过父容器宽度（带内边距）
        const wrapper = svg.closest('.barcode-display');
        let maxWidth = 1000;
        if (wrapper) {
            const wrapperStyle = window.getComputedStyle(wrapper);
            const paddingLeft = parseFloat(wrapperStyle.paddingLeft) || 0;
            const paddingRight = parseFloat(wrapperStyle.paddingRight) || 0;
            maxWidth = Math.max(100, wrapper.clientWidth - paddingLeft - paddingRight);
        }

        // 期望宽度（以 baseHeight 为基准）
        let desiredWidth = Math.round(baseHeight * ratioNum);
        let targetWidth = Math.max(minTextWidth, desiredWidth);
        if (targetWidth > maxWidth) targetWidth = maxWidth;

        // EAN-13 总模块数为95（包含安静区），JsBarcode 的 `width` 是单模块宽度
        const moduleCount = 95;
        const moduleWidth = Math.max(2, Math.floor(targetWidth / moduleCount));

        // 以模块宽度为准确定宽度（保证条码模块整齐）
        const svgWidthExact = moduleWidth * moduleCount;
        const svgHeight = Math.max(24, Math.round(svgWidthExact / ratioNum));

        // 设置 svg 显示尺寸（以像素为单位）
        svg.setAttribute('width', String(svgWidthExact));
        svg.setAttribute('height', String(svgHeight));

        // 使用 JsBarcode 自带的数字显示
        JsBarcode(svg, ean13, {
            format: 'EAN13',
            width: moduleWidth,
            height: svgHeight,
            displayValue: true,
            fontSize: 14,
            margin: 8
        });
    } catch (error) {
        console.error('生成条形码时出错:', error);
        showError(t('error_generate_image'));
    }
}

// 下载条形码图片（单个下载，复用批量下载的代码）
async function downloadBarcode(index, eanCode, aspectRatio = '4:1') {
    try {
        const productNameInput = document.getElementById(`product-name-${index}`);
        const productName = productNameInput ? productNameInput.value.trim() : '';
        
        const blob = await generateBarcodeImage(index, eanCode, productName, aspectRatio);
        
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
        showError(t('error_generate_image'));
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
    itemDiv.dataset.total = total;
    itemDiv.innerHTML = `
        <div class="barcode-item-checkbox">
            <label class="checkbox-label">
                <input type="checkbox" class="barcode-checkbox" data-index="${index}" data-ean="${result.fullCode}">
                <span class="checkbox-custom"></span>
            </label>
        </div>
        <div class="barcode-item-content">
            <div class="barcode-item-header">
                <div class="barcode-item-number">${t('barcode_label')} ${index + 1} / ${total}</div>
                <div class="ean-code">${result.fullCode}</div>
            </div>
            <div class="product-name-section">
                <label for="product-name-${index}">${t('product_name_label')}</label>
                <input 
                    type="text" 
                    id="product-name-${index}" 
                    class="product-name-input"
                    placeholder="${t('product_name_label')}"
                    maxlength="50"
                >
            </div>
            <div class="barcode-display" id="barcode-wrapper-${index}">
                <div class="product-name-display" id="product-name-display-${index}" style="display: none;"></div>
                <svg id="barcode-${index}"></svg>
            </div>
            <div class="code-breakdown">
                    <div class="breakdown-item">
                        <span class="label">${t('breakdown_prefix_with_len', { len: result.prefixLength })}</span>
                        <span class="value">${result.prefix || '(无)'}</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="label">${t('breakdown_product_code_with_len', { len: result.productCodeLength })}</span>
                        <span class="value">${result.productCode}</span>
                    </div>
                    <div class="breakdown-item">
                        <span class="label">${t('breakdown_check_digit_with_len', { len: 1 })}</span>
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
    summary.dataset.summaryData = JSON.stringify({ count, prefixLength, prefixDisplay });
    summary.textContent = t('summary_generated', { count: count, prefixLength: prefixLength, prefix: prefixDisplay });
    
    // 为每个结果创建条形码项
    results.forEach((result, index) => {
        const itemDiv = createBarcodeItem(result, index, count);
        container.appendChild(itemDiv);
        
        // 生成条形码图片（需要延迟以确保DOM已更新），使用当前选择的长宽比
        setTimeout(() => {
            const scaleSelect = document.getElementById('download-scale');
            const aspectRatio = scaleSelect ? scaleSelect.value : '4:1';
            generateBarcode(`#barcode-${index}`, result.fullCode, aspectRatio);
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
    const labelSpan = batchBtn.querySelector('[data-i18n]');
    if (labelSpan) labelSpan.textContent = t('download_selected');
    const countSpan = document.getElementById('download-count');
    if (countSpan) countSpan.textContent = count;
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
        showError(t('error_at_least_one'));
        return;
    }
    
    // 获取选定的长宽比
    const scaleSelect = document.getElementById('download-scale');
    const aspectRatio = scaleSelect.value || '4:1';
    
    if (checkedBoxes.length === 1) {
        // 如果只选中一个，直接下载
        const index = parseInt(checkedBoxes[0].dataset.index);
        const eanCode = checkedBoxes[0].dataset.ean;
        await downloadBarcode(index, eanCode, aspectRatio);
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
                generateBarcodeImage(index, eanCode, productName, aspectRatio).then(blob => {
                    const fileName = productName 
                        ? sanitizeFileName(productName) + '_' + eanCode + '.png'
                        : 'barcode_' + eanCode + '.png';
                    zip.file(fileName, blob);
                })
            );
        });
        
        // 显示加载提示
        const batchBtn = document.getElementById('batch-download-btn');
        const originalLabel = batchBtn.querySelector('[data-i18n]')?.textContent || t('download_selected');
        const countSpan = document.getElementById('download-count');
        const originalCount = countSpan ? countSpan.textContent : '';
        batchBtn.querySelector('[data-i18n]') && (batchBtn.querySelector('[data-i18n]').textContent = t('download_generating'));
        if (countSpan) countSpan.textContent = '';
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
        batchBtn.querySelector('[data-i18n]') && (batchBtn.querySelector('[data-i18n]').textContent = t('download_selected'));
        if (countSpan) countSpan.textContent = originalCount || '0';
        batchBtn.disabled = false;
        
    } catch (error) {
        console.error('批量下载时出错:', error);
        showError(t('error_batch_download'));
        const batchBtn = document.getElementById('batch-download-btn');
        if (batchBtn) {
            batchBtn.querySelector('[data-i18n]') && (batchBtn.querySelector('[data-i18n]').textContent = t('download_selected'));
            const countSpan = document.getElementById('download-count');
            if (countSpan) countSpan.textContent = '0';
            batchBtn.disabled = false;
        }
    }
}

// 生成条形码图片（返回Promise<Blob>）
function generateBarcodeImage(index, eanCode, productName, aspectRatio = '4:1') {
    return new Promise((resolve, reject) => {
        try {
            const wrapper = document.getElementById(`barcode-wrapper-${index}`);
            const svg = wrapper.querySelector('svg');
            
            if (!svg) {
                reject(new Error('条形码未找到'));
                return;
            }
            
            const svgRect = svg.getBoundingClientRect();
            const svgWidth = svgRect.width || (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width) || 300;
            const svgHeight = svgRect.height || (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.height) || 34;
            
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
            // 计算画布尺寸：以实际 SVG 尺寸为准
            const totalWidth = svgWidth + padding * 2;
            const totalHeight = svgHeight + nameHeight + eanTextHeight + padding * 2;
            
            canvas.width = totalWidth;
            canvas.height = totalHeight;
            
            // 计算缩放因子，使条形码填充到指定的宽度
            const scaleX = (totalWidth - padding * 2) / svgWidth;
            const scaleY = 1;
            
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, totalWidth, totalHeight);
            
            if (productName) {
                ctx.fillStyle = '#333333';
                ctx.font = 'bold 18px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                const maxWidth = totalWidth - padding * 2;
                const lines = wrapText(ctx, productName, maxWidth);
                let y = padding;
                lines.forEach(line => {
                    ctx.fillText(line, totalWidth / 2, y);
                    y += 22;
                });
            }
            
            img.onload = function() {
                // 产品名称和条形码之间的间距为3px
                const spacing = 3;
                const barcodeX = padding;
                const barcodeY = padding + nameHeight + spacing;
                
                // 使用缩放和平移来绘制SVG，使其填充指定的宽度
                ctx.drawImage(img, barcodeX, barcodeY, totalWidth - padding * 2, svgHeight);

                    // 使用 SVG 的内置文本（JsBarcode 已经在 SVG 中渲染数值），仅绘制 SVG 到 canvas
                    // 不在 canvas 上重复绘制 EAN 文本，保证与 SVG 一致
                
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
        showError(t('warning_partial_generated', { generated: results.length, attempts: attempts }));
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

    // 当用户切换长宽比时，重新渲染所有已显示的条形码预览
    const scaleSelect = document.getElementById('download-scale');
    if (scaleSelect) {
        scaleSelect.addEventListener('change', function() {
            const aspectRatio = this.value || '4:1';
            const checkboxes = document.querySelectorAll('.barcode-checkbox');
            checkboxes.forEach(cb => {
                const index = parseInt(cb.dataset.index);
                const ean = cb.dataset.ean;
                const svg = document.getElementById(`barcode-${index}`);
                if (svg && ean) {
                    generateBarcode(svg, ean, aspectRatio);
                }
            });
            // 更新批量按钮文本 in case labels use i18n
            updateBatchDownloadButton();
        });
    }
});
